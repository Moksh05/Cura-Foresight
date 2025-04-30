import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { VideoRoom } from '../user-account/VideoRoom';

const DoctorBookings = ({user}) => {
 function extractDayAndTime(inputString) {
         try {
             const index = inputString.indexOf(' ');
             const day = inputString.slice(0, index);
             const timeRange = inputString.slice(index + 1);
     
             return { day, timeRange };
         } catch (error) {
             return { day: null, timeRange: null };
         }
     }
     const [appointments,setappointments] = useState([])
     const [visited, setVisited] = useState(false);
     //console.log(userData.userData._id)
    //  const user = JSON.parse(localStorage.getItem('user'));
const id = user._id;
     useEffect(() => {
        //console.log(user);
         const fetchData = async () => {
           const response = await fetch(`http://127.0.0.1:5000/api/v1/doctors/${id}/booking/mybookings`, {
             method: "GET",
             headers: {
               "Content-Type": "application/json",
               "Authorization" : `Bearer ${localStorage.getItem('token')}`
             },
           });
           //console.log(response)
           const resolevedData = await response.json();
           setappointments(resolevedData.data)
           //console.log(resolevedData.data);
           //console.log(appointments); // Log the data to the console
         };
         fetchData();
       }, [appointments]);
       const [joined, setJoined] = useState(false);
   const navigate = useNavigate();
   const handleJoin = () => {
     navigate("/room");
     setJoined(true);
   };
   const handlestatus = async(id,status)=>{
    const response = await fetch(`http://127.0.0.1:5000/api/v1/doctors/${id}/booking/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ status }),
    });
    //console.log(response)
    const resolevedData = await response.json();
   }
 return(<>
 {appointments.map((appointment,index)=>{
     const { day, timeRange } = extractDayAndTime(appointment.appointmentDate);
     return(
     <div key={index} className='w-[700px] md:w-[500px] p-4 shadow-lg rounded-lg mt-6'>
         <div>
         <h3 className="heading text-xl text-headingColor mb-2">{appointment.user.name}</h3>
         {/* <span className="text-para bg-[#CCF0F3] text-irisBlueColor rounded-full px-2 my-2">{appointment.doctor.specialization}</span> */}
         </div>
         <div className="flex flex-row justify-between pr-4 content-center text-textColor pl-2">
             <div className="flex flex-col">
                 <p>{day}</p>
                 <p>{timeRange}</p>
             </div>
             <div>
              {
                appointment.status=='pending' && !visited && <div className='flex flex-row gap-3'>
                  <button className='btn rounded-[50px] mt-2 py-1' onClick={()=>{handlestatus(appointment._id,'approved')}}>Accept</button>
                  <button className='btn bg-red-600 rounded-[50px] mt-2 py-1' onClick={()=>{handlestatus(appointment._id,'cancelled')}}>Decline</button>
                </div>
              }
              {
                appointment.status=='approved' && !joined && <button className='btn rounded-[50px] mt-2 py-1' onClick={handleJoin}>Join</button>
              }
             {joined && <VideoRoom join={joined}/>}
             </div>
         </div>
     </div>
     );
 })}
     
     </>
 )
}

export default DoctorBookings