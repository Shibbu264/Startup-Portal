'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { logout1 } from './api/auth';
const API_BASE_URL = 'http://localhost:8000'; 
const Publicuserdashboard
 = () => {
   
    const [profilePicture, setProfilePicture] = useState('');
    const [username, setUsername] = useState('');
    const [profilePictureUrl, setProfilePictureUrl] = useState('');
    const [personalizedData,setPersonalizedData]=useState([])
    const [answers, setAnswers] = useState([""]);
    const handlelogout = async (e) => {
        e.preventDefault();
        try {
          await logout1().then((data)=> {
    
localStorage.clear()
window.location.replace("/")
          })
        
          // Handle successful registration, e.g., redirect to login page
      } catch (error) {
          // Handle registration error, e.g., show error message
          console.error('Logout failed:', error.message);
      }
      };
    // ... other state variables for form fields
    if (typeof window !== 'undefined') {
    const authToken = localStorage.getItem('authToken');}
                
    useEffect(() => {
        // Fetch user data including the username after component mounts
        const fetchUserData = async () => {
            try {
                const authToken = localStorage.getItem('authToken');
                
                // Include the token in the request headers
                const response = await axios.get(`${API_BASE_URL}/api/get-authenticated-user-info1`, {
                    headers: {
                        'Authorization': `Token ${authToken}`
                    }
                });
                
                setUsername(response.data.username);
            } catch (error) {
                // Handle error if the API call fails
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();

        const fetchUserData2 = async () => {
            
            try {
                const authToken = localStorage.getItem('authToken');
                
                // Include the token in the request headers
                const response = await axios.get(`${API_BASE_URL}/api/get-user-data1`, {
                    headers: {
                        'Authorization': `Token ${authToken}`
                    }
                });
                
               
                
                setProfilePictureUrl(response.data.profile_picture)
                console.log(profilePictureUrl)
            } catch (error) {
                // Handle error if the API call fails
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData2();

        const fetchData = async () => {
            try {
              const response = await axios.get(`${API_BASE_URL}/api/personalized-data/`);
             
            //   const data = await response.json();
              console.log(response.data)
              setPersonalizedData(response.data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          }
      
          fetchData();



    }, []);   // Run the effect only once after the component mounts

    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
       
        formData.append('profile_picture', profilePicture);
        
        // Assuming answers is an array containing the answers to questions
       
    
        
    
        const authToken = localStorage.getItem('authToken');
    
        try {
            await axios.post(`${API_BASE_URL}/api/save-personalized-data1/`, formData, {
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
    
    
    // useEffect(() => {
    //   // Fetch questions from Django API
    //   axios.get('http://localhost:8000/api/get-questions/')
    //     .then(response => {
    //       setQuestions(response.data.questions);
    //     })
    //     .catch(error => {
    //       console.error('Error fetching questions:', error);
    //     });
    // }, []);
    return (
        <>
        <div className='border-x-2 border-y-2 border-blue-50 w-fit block mx-auto p-6 mt-6'>
             <h1 className='text-3xl text-center my-4'>Welcome, {username}!</h1>
            <h2 className='text-xl text-center my-2'>Personalized Dashboard</h2>
           
            <form className='text-xl text-center my-2 flex-col flex gap-4 items-center ' onSubmit={handleFormSubmit}>
               
                <label>
                    Profile Picture:
                    
                    {profilePictureUrl && <img src={`http://localhost:8000`+profilePictureUrl} className='w-36 h-36 my-6 block mx-auto rounded-full' alt="Profile" />}
                    <input type="file" accept="image/*" onChange={(e) => setProfilePicture(e.target.files[0])} />
                </label>
                <button className='rounded-lg p-2 my-3 w-28 bg-green-500 block 'onClick={handleFormSubmit}>Save</button>
                </form>
                </div>
                <div>
                    <h1 className='text-white text-center font-bold text-4xl my-4'>STARTUP LISTS</h1>
      {personalizedData.map((data) => (
        <div key={data.id} className="max-w-sm block mx-auto bg-white border my-6 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h2 className='my-2 text-center'>User ID: {data.user.id}</h2>
        <div className='ml-3'>  <p>Username: {data.user.username}</p>
          <p>Email: {data.user.email}</p>
          <p>Bio: {data.bio}</p></div>
          <img className='w-56 h-56' src={`http://localhost:8000`+data.profile_picture} alt="Profile" />
         
        </div>
      ))}
    </div>
          





<div className='flex justify-center gap-12  '>
<button onClick={handlelogout} className='rounded-lg w-28 p-2 my-3 bg-red-500 block '>Logout</button>

</div> 






     </>
    );
};

export default Publicuserdashboard
;


