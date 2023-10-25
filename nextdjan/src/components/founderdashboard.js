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
       
    
        formData.append('answers', JSON.stringify(answers));
    
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
<>
<h1 className='text-3xl font-semibold text-black text-center my-4'>Welcome, {username}!</h1>
            <h2 className='text-3xl text-black font-bold text-center my-2'>Personalized Dashboard</h2>
           
            <form className='text-xl text-center  my-2 flex-col flex gap-4 items-center ' onSubmit={handleFormSubmit}>
                <label className='block'>
                    Bio:
                    
                </label>
                <textarea className='text-black rounded-lg border-y-2 border-x-2  border-blue-500 p-2' value={bio} onChange={(e) => setBio(e.target.value)} />
                <label>
                    Profile Picture:
                    
                    {profilePictureUrl && <img src={`http://localhost:8000`+profilePictureUrl} className='w-64 h-64 my-6 block mx-auto rounded-full' alt="Profile" />}
                    <input type="file" accept="image/*" onChange={(e) => setProfilePicture(e.target.files[0])} />
                </label>
              
            </form>
<label className='text-red-500 text-center font-bold block tracking-wider mx-auto text-4xl'>Bio:
<p className='text-center tracking-normal text-black font-semibold text-3xl '>{bio}</p></label>
</>


















    )











}