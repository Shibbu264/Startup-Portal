'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { logout } from './api/auth';
import { useRouter } from 'next/router'
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Sidebar1 from '@/components/sidebar';
import Founderdashboard from '@/components/founderdashboard';
import Question from '@/components/Questions';
import Notification from '@/components/notification';
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8000"; 
const PersonalizedDashboard = () => {
    let router= useRouter()
  const[dashvisible,setdashvisibily]=useState(true)
  

    const[notification,setnotification]=useState(false)
    const [answers, setAnswers] = useState([""]);
    const [authstate,setAuth]=useState(false);
    const handlelogout = async (e) => {
        e.preventDefault();
       const accessToken=localStorage.getItem("authToken")
        try {
          await logout(accessToken).then((data)=> {
    
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
       
        const checkAuth = async () => {
            try {
                const authToken = localStorage.getItem('authToken');
                
               
                const response = await axios.get(`${API_BASE_URL}/api/get-authenticated-user-info`, {
                    headers: {
                        'Authorization': `Token ${authToken}`
                    }
                });
                
               
                setAuth(true)
            } catch (error) {
                window.location.replace("/")
                // Handle error if the API call fails
                console.error('Error fetching user data:', error);
            }
        };

       checkAuth();

  


    }, []);   // Run the effect only once after the component mounts
    const [isSidebarVisible, setSidebarVisibility] = useState(true);

    const toggleSidebar = () => {
      setSidebarVisibility(!isSidebarVisible);
      setnotification(false)
    };
     const handledashboard = () => {
     setdashvisibily(true)
     setnotification(false)
    };
    const handlehome =()=>{
        setdashvisibily(false)
        setnotification(false)
    }
    const handlenotification =()=>{
      setnotification(true)
  }
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
    
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
      // Fetch questions from Django API
      axios.get(`${API_BASE_URL}/api/get-questions/`)
        .then(response => {
          setQuestions(response.data.questions);
        })
        .catch(error => {
          console.error('Error fetching questions:', error);
        });
    }, []);
    return (
        authstate?
        <>
        <Navbar onSidebarToggle={toggleSidebar} />

      <div className={`flex h-fit ${!isSidebarVisible?'justify-center ':'justify-between'}` }>
      <div className={`sidebar-container h-full ${isSidebarVisible ? 'sidebar-visible' : ''}`}>  {isSidebarVisible && <Sidebar1 dashboard={handledashboard} home={handlehome} signout={handlelogout} notification={handlenotification} />}</div> 
           
{notification?

  <Notification xyz={authstate}/>
:dashvisible?<div className='flex-1'><Founderdashboard xyz={authstate}/></div>:
<Question/>}







</div>



<Footer/>
     </>:
<div className='flex justify-center my-16'>
    <svg aria-hidden="true" class="w-10 h-10  text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
   
</div>

    );
};

export default PersonalizedDashboard;
