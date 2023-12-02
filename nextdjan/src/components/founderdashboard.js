import { useEffect, useState } from "react";

import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export default function Founderdashboard (xyz){

    const [selectedDateTime, setSelectedDateTime] = useState(new Date());

    const handleDateTimeChange = (dateTime) => {
      setSelectedDateTime(dateTime);
    };


    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL 
    const [date, setDate] = useState(new Date()); // Initialize state for the selected date
const[events,setevents]=useState([])
const[createdevents,seteventsforcreation]=useState("")
    const onChange = (newDate) => {
      setDate(newDate); // Update the selected date when the user selects a new date
    };
    const [fetch,setfetch]=useState(false)
    const [bio, setBio] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [username, setUsername] = useState('');
    const [phonenumber, setphonenumber] = useState('+91 ');
    const [profilePictureUrl, setProfilePictureUrl] = useState('');
    const [investors, setinvestors] = useState([]);
    const[loading,setloading]=useState(false)
    useEffect(()=>{
        

      

        const fetchUserData2 = async () => {
            
            try {
                const authToken = localStorage.getItem('authToken');
                
                // Include the token in the request headers
                const response = await axios.get(`${API_BASE_URL}/api/get-user-data`, {
                    headers: {
                        'Authorization': `Token ${authToken}`
                    }
                });
               return response
               
              
               
            } catch (error) {
                // Handle error if the API call fails
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData2().then((response)=>{
            console.log(response.data)
            setUsername(response.data.name);
            setBio(response.data.bio)
            setphonenumber("+91 "+response.data.phonenumber)
            setProfilePictureUrl(response.data.profile_picture)
        })



        const fetchUserData3 = async () => {
            
            try {
                const authToken = localStorage.getItem('authToken');
                
                // Include the token in the request headers
                const response = await axios.get(`${API_BASE_URL}/api/get-founders`, {
                    headers: {
                        'Authorization': `Token ${authToken}`
                    }
                });
                const abc =response.data
                
              return abc.investors
           
            } catch (error) {
                // Handle error if the API call fails
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData3().then((response)=>{ 
            
            
            setinvestors(response.reverse())})
setloading(true)









    },[!loading])

    const handleventchange = (e)=>{
        seteventsforcreation(e.target.value);
    }

    useEffect(()=>{


        const fetchevents = async () => {
            
            try {
                const authToken = localStorage.getItem('authToken');
                
                // Include the token in the request headers
                const response = await axios.get(`${API_BASE_URL}/api/get-events/`,{
                    headers: {
                        'Authorization': `Token ${authToken}`
                    }
                });
                console.log(response.data)
              return response.data.events
           
            } catch (error) {
                // Handle error if the API call fails
                console.error('Error fetching user data:', error);
            }
        };

        fetchevents().then(response =>{ 
            
            
            setevents(response)});
setfetch(false)
console.log(createdevents)



    },[fetch])

    const createevent = async () => {
        try {
            const authToken = localStorage.getItem('authToken');
            await axios.post(`${API_BASE_URL}/api/create-events/`, {
                
                'events':createdevents,
                'date':selectedDateTime
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${authToken}`
                },
            });
            
            
           setfetch(true)
           
            
        } catch (error) {
            console.log(error)
            alert('Error adding Event !', error);
        }
      }
const handledelete = async (event,index)=>{

    try {
        const authToken = localStorage.getItem('authToken');
        await axios.delete(`${API_BASE_URL}/api/delete-events/`, {
            headers: {
                'Authorization': `Token ${authToken}`
            },
            data: {
                event:event
            }
        });

        // Remove the event from the array when successfully deleted
        const updatedEvents = [...events];
        updatedEvents.splice(index, 1);
        setevents(updatedEvents); // Assuming your state variable is named 'events'
       
    } catch (error) {
        
        alert('Error deleting event:', error);
        // Handle error if deletion fails
    }


}

    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('bio', bio);
        
        formData.append('profile_picture', profilePicture);
        formData.append('name', username);
        formData.append('phonenumber', phonenumber.substring(3));
        

        
        // Assuming answers is an array containing the answers to questions
       
    
     
    
        const authToken = localStorage.getItem('authToken');
    
        try {
            await axios.post(`${API_BASE_URL}/api/save-personalized-data/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${authToken}`
                },
            })
    
            await setloading(false) 
           
        } catch (error) {
            alert('Error saving personalized data,Check for phonenumber length', error);
        }
       
    }
    
 



    return(
<div className="h-fit flex flex-col w-fit justify-center ">

            
           
          {loading?  <form className='text-xl text-center flex justify-center    my-2 p-6 border-x-2 border-y-2 w-[90%] mx-2 rounded-xl border-sky-600    ' onSubmit={handleFormSubmit}>
           <div className="flex sm:flex-row flex-col justify-center items-center  mt-12 ">
            <div className="flex justify-center flex-col items-center">
            
                    
                    {profilePictureUrl &&
                    <img className="sm:w-[180px] sm:h-[180px] w-[120px] h-[120px] rounded-xl shadow-inner border-4 border-sky-600" src={API_BASE_URL+profilePictureUrl} />
                    }
                    <input className="" type="file" accept="image/*" onChange={(e) => setProfilePicture(e.target.files[0])} />
                
                </div>
                <div className="flex-col w-fit  p-2 px-3 rounded-lg border-sky-600 border-x-2 border-y-2  flex justify-start">
                <div class="flex">
  <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-white rounded-l-md   dark:border-gray-600">
    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
    </svg>
  </span>
  <input type="text" onChange={(e)=>{setUsername(e.target.value)}} value={username} id="website-admin" class="rounded-none rounded-r-lg text-xl font-semibold bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5   dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="elonmusk"/>

</div>
<div class="flex my-1">
  <span class="inline-flex items-center w-10 h-[50px] px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-white rounded-l-md   dark:border-gray-600">
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIsAAACLCAMAAABmx5rNAAAAb1BMVEX///8AAAD5+fn8/Pza2trj4+Pu7u7o6Oj19fWwsLDW1tYtLS3y8vJ1dXWGhobe3t5cXFzGxsYyMjIaGhrQ0NDAwMB+fn5HR0dMTEwlJSWgoKCnp6dBQUFXV1e2trZjY2Nra2uOjo4MDAw6OjqXl5dnRHzhAAAGJUlEQVR4nO1b6daqOgy1jA4oMjkgyOT7P+PR79o0xZahWFx3Lfa/c+hHN2mSpjt1tVqwYMGCBQsWjIdpWMn9vl2bPycSPxryH66HZP1LKlYREYT8/jMmzom0cY5/QyW+fFAhpK6M+ZkYlYDJC83spnFKCZUnZvYav5FTIeQwJ5Xkyk9+jfh/n+ZzmqDmYiexXdtOOE8u56Jy55kAwwL9934ey8TYKnuXPVg/0IPHHFS2yFd2Af/MRgt100/FOLPpcr/9FIV6ZGnngvJKKXrO9oWLo5kK8ttKXCUcYIDmNOPuGBXJEHMPQ/SuUjnko3M6ptAZ2DFQOXaUcX5IRwXyQVNhQDZrOr84oMOu+rhswSxJ98BCv2GOfX5LYVMXL3RRWYNZeovs6j0w1BVKKaWS9g716J7Vs5jKoF4Q2v1jD4NpK8GioXoaMvg9dq+HSzIwiP7gvnfzi57jJLjLkNc7mU4uJo3oy5DRbtifnydwoTljiLusXK3+YtAlGnT8oeWmnuoOuAyI6JVHC1E9m4Dzfns9hAut7jK3f6wC7PfrrwNeDyGnqbQbwYWVOUNsqAC6RlHv+wM4tQwKOQWsh35rDFSuH2eWLwHiqHsC8wYLRDaaqKwMWgZsu0bZ7BRAjrqorMz3DiMtA9ae45dI/NAUz3+gXyyuG500zzgVRusZljrCTkglJy1ole3gpCGy/aHFJOz0qsmAuk4UHi3RbKcpyQFovSvKYLxg99CuStF1yAQfHSImzQyiKhwbBQVvRZ/V5xkEqSfofIIkRut+EupWgN4Azcn7eLSG8+08ZmG1gOA8DYLVDDrdCx79+PNnioEtguSzcIHUK9qTIBX2qhDfgUenE4k8oJ/VGuUoBEj1AlnbZr0TjTs0g0+LmFAwHdNb889A04Auw6xYHVXO0SH2YeMRhK7D9PlZWhOQ70ShC9l3UMozjRcmWNADw4hKhw0j01N4e0F6fBUaYZEGyj12aBI1PTVVp2T0QN2dOr8pGseDtwgTLDoHSC1j3Lgm4d9YtcgDrUyofnio8JVYxhf1ky9qCRJetRMVtbgKF1pmI2Dywl4lQ7Leg1Aus1lfR2SZh4jHH5Q6/uzLhJrGFhWcH6H9eR8DQUUNhsJJLJhZtez1Zvvs0oLCzQwflkGsgAToWMC1ArkFytLYSvb8CaIczQXFkri+3aIZCjYiRrMWb+8w0gz9LynHW4alkb0wT+FrBheqkrho1gdLtm6KuCjoR8al548tfGK6tz+glQ1clCEVykKLrYI4v25RaJPTy3isLde0E5OJHWl8n4fVtxL12cbSQxaj6BPJjwGjXo8/SVRsJrGowOsg6Z1aUlwPx2xRz6O5mGxbkSgcHnYDAosqqbNQihyf89A1C5liKUpt0n7yFmJP4byHYuUi2dgEG6G8/GSDy9FcUGSQRqL+WOc2l47DP0s0Ctsk+uxcMoez56mEHVUT9KiU+k7oDspFpovduQtw564KDvaOSKV+QPn7LLO+jQu5vLPSBmdX0czNCllGKs/HzGu649WhsVSolOO4JJE58HPU/Z11jz26FTVhpCQ/Gsg5M3liWFtVE+2qvnofthY1KdRAlqmnyt32NC4rE904jCaKL8BF9TDJlbHTxENrol14n5l2t+M2mQvnMyo1K4Bm3ikXIXCeIUfl1gTk8WkCDq6glVL4ClfnE0OAqw/UnIYpTVMVvw13s1fBadj5abqSj0/SJBxtZhv+vJlM5UkGnwHrsR/HUuZXrp8ZnM4z5MYZA0sLX1Lxudgm0YjQZA3/6GtSdcIpB1k8MGmhuwdf7CdYfK/6NOiGBaLyVZ3a4Mvt66E/vNEW8u2rZ8mOY1M/up3YZ0IXyb7+6y6/4MiQ5tChUm4Q852OFuEm5NmQPBEaxwuwDTVd37Fbh7SncU73drQ66RGPuGprySWCX5E1+41vu67juLYdVy3bjcuN47BOo082L6dosnP4+SjXeyPDO4nZiHDS3ozzq4+miBChruvYHOxqABWlzoQK1rdjN5NS7zUiHt62oxNQbmf/Ya91KNr57xnjRfqDX4r+0Qk2pzPcrQqLW6LrmuQwvFrBnm07hmH+/DfXCxYsWLBgwf8W/wAkeUMRT3GrygAAAABJRU5ErkJggg=="/>
  </span>
  <input type="text" onChange={(e)=>{e.target.value.startsWith==""?setphonenumber(e.target.value+"+91"):setphonenumber(e.target.value)}} value={phonenumber} id="website-admin" class="rounded-none rounded-r-lg text-xl font-semibold bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5   dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="elonmusk"/>

</div>
                 <label className='text-red-500 text-start font-bold block tracking-wider  text-xl'>Bio:</label>
               <div className="flex justify-center items-center gap-[5%]">
                <input type="text" className='text-black h-12 rounded-lg border-y-2 border-x-2  border-blue-500 p-1' value={bio} onChange={(e) => setBio(e.target.value)} />
                <button className='rounded-lg p-2 my-2 w-28 bg-green-500 block mx-auto ' type="submit">Save</button>
                </div>
                </div>
                </div>
                
              


            </form>:<div className="flex justify-center items-center my-12">
        <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
    </div>}

{loading?<div className="sm:flex w-[90%] sm:w-fit mx-2 sm:flex-row flex-col justify-center items-start  h-fit     ">
<div className="flex  flex-col items-center justify-center my-2 ">
    <h1 className="text-sky-600 font-bold text-2xl text-center mb-3">Interested Investors</h1>
          { investors.map((investor,index) => (
            <div key={index}  className="flex items-center w-[100%] py-6 h-24 p-4 border-y-2 mx-1 rounded-md border-white text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                    <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span className="sr-only">Info</span>
                    <div key={index} className="sm:ml-3 ml-1 mr-auto  text-md font-medium">
                     {investor}
                    </div>
                    <div className="flex self-end justify-end mr-4 items-center ">
                    <button className="ml-8 w-fit bg-green-500 rounded-lg px-1 text-md text-white py-1">Plan Meeting</button>
                    <button  type="button" class="ml-auto  -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-1" aria-label="Close">
      <span class="sr-only">Close</span>
      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
      </svg>
  </button>
                   </div>
                 
              
            </div>
        ))}
</div>
            <div  className="flex flex-col justify-center items-center my-9    border-y-2 mx-1 rounded-md border-white   dark:text-blue-400" role="alert">
          <Calendar  onChange={onChange} value={date} />
            <h1 className="text-4xl font-bold text-center">Events</h1>
            
<div className="mt-2 mb-1 flex flex-col justify-center">
    {events.map((event,index) => (
            <div key={index}  className="flex items-center w-[90%] py-4 px-2 border-y-2 mx-1 rounded-md border-white text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
            <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <span className="sr-only">Info</span>
            <div key={index} className="ml-3 sm:text-lg text-md font-medium">
             {event.events}
            </div>
            <div className="flex justify-end items-center">
            <button className="ml-8 w-fit bg-green-500 rounded-lg mr-3 px-2 sm:text-lg text-md text-white py-1">{event.date}</button>
            <button onClick={()=>{handledelete(event.events,index)}}  type="button" class="ml-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-1" aria-label="Close">
<span class="sr-only">Close</span>
<svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
</svg>
</button>
           </div>
    </div>
    ))}
<input type="text" onChange={handleventchange} value={createdevents}  className="p-1 w-[90%] rounded-md flex justify-center items-center font-semibold my-2 border-x-black border-y-black border-x-2 border-y-2" placeholder="Type event"></input>
<DatePicker 
          id="eventDateTime"
          selected={selectedDateTime}
          onChange={handleDateTimeChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          className="form-control "
          
        />
            <button onClick={createevent} className="mx-2 my-2 flex  self-center btn btn-blue">Add Event</button>
            </div>
            
  </div>    


            </div>:<div className="flex justify-center items-center my-12">
        <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
    </div>}

</div>


















    )











}