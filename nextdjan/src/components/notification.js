

import { useEffect, useState } from "react"
import axios from 'axios';




export default function Notification(xyz  ){
    const API_BASE_URL = 'http://localhost:8000'; 
    const[notifications,setnotification]=useState([])
    const[loading,setloading]=useState(false)
    const[tick,settick]=useState(true)
    const handleclose = async (notificationText, index) => {
        try {
            const authToken = localStorage.getItem('authToken');
            await axios.delete(`${API_BASE_URL}/api/delete-notification/`, {
                headers: {
                    'Authorization': `Token ${authToken}`
                },
                data: {
                    text: notificationText
                }
            });
    
            // Remove the notification from the array when successfully deleted
            const updatedNotifications = [...notifications];
            updatedNotifications.splice(index, 1);
            setnotification(updatedNotifications);
            setloading(true)
        } catch (error) {
            setloading(true)
            alert('Error deleting notification:', error);
            // Handle error if deletion fails
        }
    };  
    const handletick = async (username, index) => {
        try {
            const authToken = localStorage.getItem('authToken');
            await axios.post(`${API_BASE_URL}/api/tick-notification/`,{
                'username': username
            }, {
                headers: {
                    'Authorization': `Token ${authToken}`
                },
                
            }).then((response)=>{
                console.log(response.data)
            })
    settick(false)
  
            // Remove the notification from the array when successfully deleted
          
        } catch (error) {
            setloading(true)
            alert('Error accepting requests:', error);
            // Handle error if deletion fails
        }
    };   
useEffect(()=>{

    const fetchNotifications = async (username) => {
        try {
            const authToken = localStorage.getItem('authToken');
          const response = await axios.post(`${API_BASE_URL}/api/notifications/`, { username: "noneed" },{ headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Token ${authToken}`
        },});
          return response.data.notifications;
        } catch (error) {
          console.error('Error fetching notifications:', error);
          throw error;
        }
      };
      
      // Usage example
      const username = 'example_user';
      fetchNotifications(username).then(notifications => {
        setloading(true)
       setnotification(notifications.reverse())
        // Handle notifications data here
      }).then(console.log(notifications));













},xyz)

return(
<div className="w-screen h-screen ">


{loading?<div className=" h-screen">
            {notifications.length!=0?   notifications.map((notification,index) => (
                <div key={index} className="flex items-center p-4 border-y-2 mx-1 rounded-md border-white text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                    <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span className="sr-only">Info</span>
                    <div className="ml-3 text-sm font-medium">
                        {notification.text}
                    </div>
                 {tick?   <div className="flex justify-end">
                    <button key={index} onClick={()=>{handletick(notification.sender,index).then(()=>{setTimeout(() => {handleclose(notification.text,index).then(settick(true))
                        
                    }, 1000);})}} className="ml-8 w-16 bg-green-500 rounded-lg px-2 text-lg text-white py-1">Tick</button>
                    <button key={index} className="mx-4 w-16 bg-red-500 rounded-lg px-2 text-lg text-white py-1">Cross</button>
                   </div>:<h1 key={index} className="flex justify-end ml-[10%] text-green-500">Accepted !</h1> }
                    <button onClick={()=>{handleclose(notification.text,index);setloading(false)}} type="button" class="ml-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-1" aria-label="Close">
      <span class="sr-only">Close</span>
      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
      </svg>
  </button>
                </div>

            )): <h1 className="my-4 text-green-500 text-2xl text-center font-semibold">There are no new notifications !</h1>}
        </div>:
        <div className="flex justify-center items-center my-12">
    <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>}



</div>)












}