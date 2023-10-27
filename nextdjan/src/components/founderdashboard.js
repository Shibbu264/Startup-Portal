import { useEffect, useState } from "react";

import axios from 'axios';


export default function Founderdashboard (xyz){
    const API_BASE_URL = 'http://localhost:8000'; 
    const [bio, setBio] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [username, setUsername] = useState('');
    const [profilePictureUrl, setProfilePictureUrl] = useState('');
    const [investors, setinvestors] = useState([]);
    const[loading,setloading]=useState(false)
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
              
               
            } catch (error) {
                // Handle error if the API call fails
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData2();



        const fetchUserData3 = async () => {
            
            try {
                const authToken = localStorage.getItem('authToken');
                
                // Include the token in the request headers
                const response = await axios.get(`${API_BASE_URL}/api/get-founders`, {
                    headers: {
                        'Authorization': `Token ${authToken}`
                    }
                });
                
              return response.data.investors 
           
            } catch (error) {
                // Handle error if the API call fails
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData3().then((response)=>{ 
            
            
            setinvestors(response)});
setloading(true)









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

{loading?<div className="flex items-start  flex-row ">
<div className="flex flex-col">
    <h1 className="text-sky-600 font-bold text-2xl text-center my-3">Interested Investors</h1>
          { investors.map((investor,index) => (
            <div key={index}  className="flex items-center w-[100%] py-6 p-4 border-y-2 mx-1 rounded-md border-white text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                    <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span className="sr-only">Info</span>
                    <div key={index} className="ml-3 text-lg font-medium">
                     {investor}
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
        ))}
</div>
            {/* <div  className="flex  items-center p-4 w-[100%] h-72 border-y-2 mx-1 rounded-md border-white bg-blue-800   dark:text-blue-400" role="alert">
                  
  </div>     */}
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