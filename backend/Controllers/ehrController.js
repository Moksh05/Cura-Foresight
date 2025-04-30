import EHR from '../models/ehrSchema.js'
import {Storage} from '@google-cloud/storage'

const projectId = 'medicare-424114'
const keyFilename = 'cloudkey.json'

const storage = new Storage({
    projectId,
    keyFilename
});

const bucket = storage.bucket('medicarebucket01') //add bucket name 

export const uploadFile = async (req,res,next) => {
    console.log('inside ehr controller')
    try{
        console.log('inside ehr controller')
        if(req.file){
            console.log('inside req.file')
            const blob = bucket.file(req.file.originalname)
            const blobStream = blob.createWriteStream();
           
            const downloadURL = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            console.log("Download URL:", downloadURL);

            // Create a new EHR document
            const ehr = new EHR({
                userid: req.userId, // Assuming the user ID is passed in the request body
                filename: req.file.originalname,
                downloadURL: downloadURL,
                description: req.body.description // Assuming description is passed in the request body
            });

            // Save the document to the database
            await ehr.save();



            blobStream.on('finish',()=>{

                console.log("uploaded succesfully")
                res.status(200).json({
                    success : true,
                    message : 'uploaded successfully',
                    data : ehr
                })
            })
            
            blobStream.end(req.file.buffer)
        }else{
            res.status(400).json({success : false , message : 'failed to uplaod', error : 'No file'})
        }

    }catch(e){
        res.status(400).json({success : false , message : 'failed to uplaod', error : e})
    }
} 


export const getAllehr = async (req,res,next)=>{
    const ehrs = await EHR.find()
    res.status(200).json({success : true , message : 'fetched succesfuly',data : ehrs})
}


export const getEHR = async (req,res,next) =>{
    try{
        const ehr = await EHR.find({userid : req.userId})
        res.status(200).json({success:true,message : "fetched succesfully", data : ehr})

    }catch(e){
        res.status(400).json({success:false , message : "Failed to fetch", error : e})
    }
}

export const deleteEHR = async (req, res, next) => {
    try {
        const fileId = req.body.fileid;

        // Find the document in the database
        const ehr = await EHR.findById(fileId);
        if (!ehr) {
            return res.status(404).json({
                success: false,
                message: 'File not found'
            });
        }

        // Extract the filename from the document
        const filename = ehr.filename;

        // Delete the file from the bucket
        const file = bucket.file(filename);
        await file.delete();

        console.log(`Successfully deleted file ${filename} from the bucket`);

        // Delete the document from the database
        await EHR.findByIdAndDelete(fileId);

        // Retrieve remaining documents
        const remainingEHRs = await EHR.find({});

        res.status(200).json({
            success: true,
            message: 'File and corresponding document deleted successfully',
            remainingEHRs: remainingEHRs
        });
    } catch (e) {
        console.error('Error in deleteEHR controller:', e);
        res.status(500).json({
            success: false,
            message: 'Failed to delete file',
            error: e.message
        });
    }
}
