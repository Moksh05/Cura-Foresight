import {useState} from 'react'
import HashLoader from 'react-spinners/HashLoader';
import { toast } from 'react-toastify';

const SidePanel = (doctors) => {
    const [loading,setLoading] = useState(false);
    const {ticketPrice,timeSlots,_id}= doctors.doctors
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
    const[show,setShow] = useState(false);
    let selectedtimeslot = ""
    //const [selectedtimeslot,setselectedtimeslot] = useState()
    const [selectedCheckbox, setSelectedCheckbox] = useState(null);
    const handleCheckboxChange = (index, timeSlot) => {
        setSelectedCheckbox(prevState => (prevState === index ? null : index));
    };
    const postData = async()=>{
        try{
            console.log("working")
            console.log(ticketPrice)
            //console.log(localStorage.getItem('token'))
            console.log(selectedtimeslot)
            const response = await fetch(`http://localhost:5000/api/v1/doctors/${_id}/booking`,{
                method : 'POST',
                body : JSON.stringify({
                    ticketPrice : ticketPrice,
                    appointmentDate :selectedtimeslot,
                    status : 'pending',
                    isPaid : true
                }),
                headers : {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem('token')}`
                }
            },
        )
        console.log("Booking line 39")
        const resolvedResp=await response.json()
        console.log(resolvedResp)
        
        }catch(e){
            console.log(e)
        }
    }
    const handleBookAppointment = () => {
        setLoading(true);
        if (selectedCheckbox !== null) {
            const timeSlot = timeSlots[selectedCheckbox];
            console.log('Appointment booked for:', timeSlot);
            selectedtimeslot = timeSlot
            //setselectedtimeslot(timeSlot)
            console.log(selectedtimeslot)
            postData();
            
        }
        setShow(!show); 
        setLoading(false);
        toast.success("Appointment Booked!");
        
    };
  return (
    <div className='shadow-xl p-3 lg:p-5 rounded-md'>
        <div className='flex items-center justify-between'>
            <p className='text_para mt-0 font-semibold'>Ticket Price</p>
            <span className='text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold'>Rs.{ticketPrice}</span>
        </div>
        <div className='mt-[30px]'>
            <p className='text_para mt-0 font-semibold text-headingColor'>Available Time Slots:</p>
            <ul className='mt-3'>
                {timeSlots.map((timeSlot, index) => {
                    const { day, timeRange } = extractDayAndTime(timeSlot);
                    return (
                        <li key={index} className='flex items-center justify-between mb-2'>
                            <p className='text-[15px] leading-6 text-textColor font-semibold'>{day}</p>
                            <p className='text-[15px] leading-6 text-textColor font-semibold'>{timeRange}</p>
                            <input 
                                type="checkbox" 
                                name="selected" 
                                id={`selected-${index}`} 
                                checked={selectedCheckbox === index} 
                                onChange={() => handleCheckboxChange(index, timeSlot)} 
                            />
                        </li>
                    );
                })}
                </ul>
            </div>
            <button className='btn px-2 w-full rounded-md' onClick={handleBookAppointment}>{loading ? <HashLoader size={35} color='#ffffff'/> : 'Book Appointment'}</button>
        </div>
  )
}

export default SidePanel