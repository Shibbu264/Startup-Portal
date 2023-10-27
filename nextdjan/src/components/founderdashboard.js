import { useEffect, useState } from "react";

import axios from 'axios';


export default function Founderdashboard (xyz){
    const API_BASE_URL = 'http://localhost:8000'; 
    const [bio, setBio] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [username, setUsername] = useState('');
    const [profilePictureUrl, setProfilePictureUrl] = useState('');

    useEffect(()=>{
        const fetchUserData = async () => {
            try {
                const authToken = localStorage.getItem('authToken');
                
               
                const response = await axios.get(`${API_BASE_URL}/api/get-authenticated-user-info`, {
                    headers: {
                        'Authorization': `Token ${authToken}`
                    }
                });
                
                setUsername(response.data.username);
               
            } catch (error) {
                // window.location.replace("/")
                // Handle error if the API call fails
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();

        const fetchUserData2 = async () => {
            
            try {
                const authToken = localStorage.getItem('authToken');
                
                // Include the token in the request headers
                const response = await axios.get(`${API_BASE_URL}/api/get-user-data`, {
                    headers: {
                        'Authorization': `Token ${authToken}`
                    }
                });
                
               
                setBio(response.data.bio)
                setProfilePictureUrl(response.data.profile_picture)
              
                console.log(profilePictureUrl)
            } catch (error) {
                // Handle error if the API call fails
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData2();










    },xyz)

    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('bio', bio);
        
        formData.append('profile_picture', profilePicture);
        
        // Assuming answers is an array containing the answers to questions
       
    
     
    
        const authToken = localStorage.getItem('authToken');
    
        try {
            await axios.post(`${API_BASE_URL}/api/save-personalized-data/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${authToken}`
                },
            });
    
            alert('Personalized data saved successfully!');
        } catch (error) {
            alert('Error saving personalized data:', error);
        }
    };
    




    return(
<div className="h-screen ">

            
           
            <form className='text-xl text-center  my-2 p-6 border-x-2 border-y-2 mx-2 rounded-xl border-sky-600    ' onSubmit={handleFormSubmit}>
           <div className="flex flex-row justify-center  mt-12 ">
            <div className="flex justify-center flex-col items-center">
            
                    
                    {profilePictureUrl &&
                    <img className="w-[180px] h-[180px] rounded-xl shadow-inner border-4 border-sky-600" src={`http://localhost:8000`+profilePictureUrl} />
                    }
                    <input className="" type="file" accept="image/*" onChange={(e) => setProfilePicture(e.target.files[0])} />
                
                </div>
                <div className="flex-col w-fit h-[180px] p-2 px-3 rounded-lg border-sky-600 border-x-2 border-y-2  flex justify-start">
                <h1 className='text-2xl font-semibold text-black text-start my-2'>Welcome, {username}!</h1>
                 <label className='text-red-500 text-start font-bold block tracking-wider my-1 mx-auto text-2xl'>Bio:</label>
               <div className="flex">
                <input type="text" className='text-black rounded-lg border-y-2 border-x-2  border-blue-500 p-1' value={bio} onChange={(e) => setBio(e.target.value)} />
                <button className='rounded-lg p-2 my-3 w-28 bg-green-500 block mx-auto ' type="submit">Save</button>
                </div>
                </div>
                </div>
                
              


            </form>

<div className="flex items-start  flex-row ">

          
            <div  className="flex items-center w-[100%] py-6 p-4 border-y-2 mx-1 rounded-md border-white text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                    <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span className="sr-only">Info</span>
                    <div className="ml-3 text-lg font-medium">
                      Siddhant singh
                    </div>
                    <div className="flex justify-end">
                    <button className="ml-8 w-44 bg-green-500 rounded-lg px-1 text-lg text-white py-1">Schedule Meeting</button>
                    <button className="mx-4 w-32 bg-red-500 rounded-lg px-2 text-lg text-white py-1">Ignore</button>
                   </div>
                    <button  type="button" class="ml-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-1" aria-label="Close">
      <span class="sr-only">Close</span>
      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
      </svg>
  </button>
              
            </div>

            <div  className="flex  items-center p-4 w-[100%] h-72 border-y-2 mx-1 rounded-md border-white bg-blue-800   dark:text-blue-400" role="alert">
                  
  </div>    
            </div>

</div>


















    )











}