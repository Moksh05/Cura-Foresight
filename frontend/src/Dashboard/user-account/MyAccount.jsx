import { useContext, useState , useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import MyBookings from "./MyBookings";
import Profile from "./Profile";
//import Error from "../../components/Loader/Error";
const MyAccount = () => {
  const { dispatch } = useContext(AuthContext);
  const [tab, setTab] = useState("bookings");

  const { state } = useContext(AuthContext);
  const { user, role, token ,appointments} = state;
//   console.log(state);
//   console.log(user,role,token,appointments);
//console.log(user._id)
  let temp=false;
  if(user) {temp = true;}

  const [userdata,setUser]=useState([])
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/api/v1/users/${user._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${localStorage.getItem('token')}`
        },
      });
      //console.log(response)
      const resolevedData = await response.json();
      setUser(resolevedData.data)
      //console.log(resolevedData); // Log the data to the console
    };
    fetchData();
  }, [user._id]);

  console.log(userdata)


  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <section>
        <div className="max-w-[1170px] px-5 mx-auto">
            {
                !temp && <Error errMessage="No Token. Authorization denied. :/"/>
            }
        {
            temp && <div className="grid md:grid-cols-3 gap-10">
            <div className="pb-[50px] px-[30px] rounded-md">
                <div className="flex items-center justify-center">
                    <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                        <img src={user.photo} alt="" className="w-full h-full rounded-full" />
                    </figure>
                </div>
            <div className="text-center mt-4">
                <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">{userdata.name}</h3>
                <p className="text-textColor text-[15px] leading-6 font-medium">{userdata.email}</p>
                <p className="text-textColor text-[15px] leading-6 font-medium">Blood Type: <span className="ml-2 text-headingColor text-[22px] leading-8">{userdata.bloodType}</span></p>
            </div>
            <div className="mt-[50px] md:mt-[100px]">
                <button onClick={handleLogout} className="md:w-full w-[40%] bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white">Logout</button>
                <button className="md:w-full w-[40%] bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white">Delete Account</button>
            </div>
            </div>
            <div className="md:col-span-2 md:px-[30px]">
                <div>
                    <button onClick={()=>{setTab('bookings')}} className={`${tab ==='bookings' && 'bg-primaryColor text-white font-normal'}p-2 mr-5 px-5 py-2 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}>My Bookings</button>
                    <button onClick={()=>{setTab('settings')}} className={`${tab ==='settings' && 'bg-primaryColor text-white font-normal'}p-2 py-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}>Profile Settings</button>
                </div>
                {
                    tab ==='bookings' && <MyBookings userData={user}/>
                }
                {
                    tab ==='settings' && <Profile userData={user}/>
                }
            </div>
        </div>
        }
    </div>
    </section>
  )
}

export default MyAccount