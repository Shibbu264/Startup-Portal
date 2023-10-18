'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { logout } from './api/auth';
const API_BASE_URL = 'http://localhost:8000'; 
const PersonalizedDashboard = () => {
    const [bio, setBio] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [username, setUsername] = useState('');

    const handlelogout = async (e) => {
        e.preventDefault();
        try {
          await logout().then((data)=> {
    
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
                const response = await axios.get(`${API_BASE_URL}/api/get-authenticated-user-info`, {
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
                const response = await axios.get(`${API_BASE_URL}/api/get-user-data`, {
                    headers: {
                        'Authorization': `Token ${authToken}`
                    }
                });
                
               
                setBio(response.data.bio)
                console.log(response.data.profile_picture)
            } catch (error) {
                // Handle error if the API call fails
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData2();


    }, []);   // Run the effect only once after the component mounts

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Create a form data object to send bio and profile picture
        const formData = new FormData();
        formData.append('bio', bio);
        formData.append('profile_picture', profilePicture);

        try {
            // Send a POST request to save personalized data
            await axios.post(`${API_BASE_URL}/api/save-personalized-data/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${authToken}`
                },
            });
            // Optionally, you can display a success message to the user
            console.log('Personalized data saved successfully!');
        } catch (error) {
            // Handle errors, e.g., display an error message to the user
            console.error('Error saving personalized data:', error);
        }
    };

    return (
        <div className='bg-blue-500 block m-auto h-screen'>
             <h1 className='text-xl text-center my-4'>Welcome, {username}!</h1>
            <h2 className='text-xl text-center my-2'>Personalized Dashboard</h2>
            <form className='text-xl text-center my-2 flex-col flex gap-4 items-center ' onSubmit={handleFormSubmit}>
                <label>
                    Bio:
                    <textarea className='text-black' value={bio} onChange={(e) => setBio(e.target.value)} />
                </label>
                <label>
                    Profile Picture:
                    <input type="file" accept="image/*" onChange={(e) => setProfilePicture(e.target.files[0])} />
                </label>
                <button type="submit">Save</button>
            </form>

<p className='text-center text-3xl mt-4'>{bio}</p>

<button onClick={handlelogout} className='rounded-lg p-2 my-3 bg-red-500 block mx-auto'>Logout</button>
        </div>
    );
};

export default PersonalizedDashboard;
