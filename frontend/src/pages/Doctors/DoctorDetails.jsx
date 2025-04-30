import { useState , useEffect } from 'react'
import doctorImg from '../../assets/images/doctor-img02.png'
import starIcon from '../../assets/images/Star.png'
import DoctorAbout from './DoctorAbout'
import { useParams } from "react-router-dom"
import Feedback from './Feedback'
import SidePanel from './SidePanel'

const DoctorDetails = () => {
  const { id } = useParams();
  const [doctors, setDoctors] = useState({});
  const [tab, setTab] = useState('about');

  useEffect(() => {
    console.log(id)
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/doctors/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const resolvedData = await response.json();
        setDoctors(resolvedData.data);
        console.log(resolvedData.data); // Log the data to the console
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  
  console.log(doctors);

  if(Object.keys(doctors).length === 0){
    return <div>Loading...</div>
  }
  const {averageRating,bio,name,totalRating,specialization,_id,photo} = doctors;
    //const[tab,setTab]= useState('about')
  return <section>
    <div className='max-w-[1170px] px-5 mx-auto'>
      <div className='grid md:grid-cols-3 gap-[50px]'>
        <div className='md:col-span-2'>
          <div className='flex items-center gap-5'>
            <figure className='max-w-[200px] max-h-[200px]'>
              <img src={photo} alt="" className='w-full'/>
            </figure>
            <div>
              <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded'>{specialization}</span>
              <h3 className='text-headingColor text-[22px] leading-9 mt-3 font-bold'>{name}</h3>
              <div className='flex items-center gap-[6px]'>
                <span className='flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor'>
                  <img src={starIcon} alt="" /> {parseFloat(averageRating.toFixed(1))}
                </span>
                <span className='text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-textColor'>({totalRating})</span>
              </div>
              <p className='text_para text-[14px] leading-6 md:text-[15px] lg:max-w[390px]'>{bio}</p>
            </div>
          </div>
          <div className='mt-[50px] border-b border-solid border-[#0066ff24]'>
            <button  onClick={()=>{setTab('about')}} className={`${tab==='about' && 'border-b border-solid border-primaryColor'}'py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold'`}>About</button>
            <button onClick={()=>{setTab('feedback')}} className={`${tab==='feedback' && 'border-b border-solid border-primaryColor'}'py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold'`}>Feedback</button>
          </div>
          <div className='mt-[50px]'>
            
            
            
            
            {
              tab==='about' && <DoctorAbout doctors={doctors} key={doctors._id}/>
            }
            {
              tab==='feedback' && <Feedback doctors={doctors} key={doctors._id}/>
            }
          </div>
        </div>
        <div>
          <SidePanel doctors={doctors}/>
        </div>
      </div>
    </div>
  </section>
}

export default DoctorDetails