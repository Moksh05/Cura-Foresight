import Review from '../models/ReviewSchema.js'
import Doctor from '../models/DoctorSchema.js'
export const getAllReviews = async(req,res)=>{
    try{
        const reviews = await Review.find({doctor : req.params.doctorId})
        res.status(200).json({success:true,message:"Successful",data:reviews})
    } catch(err){
        res.status(404).json({success:false,message:"Not found"})
    }
}

export const createReview = async(req,res)=>{
    //console.log(req.params.doctorId)
    //console.log(req.userId)
    if(!req.body.doctor) req.body.doctor = req.params.doctorId
    if(!req.body.user) req.body.user = req.userId
    const newReview = new Review(req.body)
    //console.log(req.body)
    try{
        const savedReview = await newReview.save()
        //console.log(savedReview)
        await Doctor.findByIdAndUpdate(req.body.doctor,{
            $push:{reviews: savedReview._id}
        })
        res.status(200).json({succcess:true, message:"ReviewSubmitted", data: savedReview})
    } catch(err){
        res.status(500).json({success:false, message: err.message})
    }
} 