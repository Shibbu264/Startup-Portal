
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; 

export const login = async (username, password) => {
   
    try {
        const response = await axios.post(`${API_BASE_URL}/api/login/`, {
            username: username,
            password: password,
            type:"FOUNDERS"
        },{
            headers: {
               
                
            },
        });
       
        const redirectUrl = response.data.redirect_url;
        const token = response.data.token;
        localStorage.setItem('authToken', token);
          if (redirectUrl) {
              // Redirect the user to the specified URL
       
              window.location.replace='/fillform';
          } else {
              // Handle other responses or errors as needed
          }
    } catch (error) {
        if (error.response) {
            // The request was made, but the server responded with an error status code
            console.error('Error status:', error.response.status);
            console.error('Error data:', error.response.data);
            throw error.response.data;  // Rethrow the error data for the calling code to handle
        } else if (error.request) {
            // The request was made, but no response was received
            console.error('No response received:', error.request);
            throw 'No response received';  // Rethrow a custom error message
        } else {
            // Something happened in setting up the request that triggered an error
            console.error('Error message:', error.message);
            throw error.message;  // Rethrow the error message
        }
    }
};
export const logout = async (accessToken) => {
    try { 
       
       
        const response = await axios.post(`${API_BASE_URL}/api/logout/`,{access_token:accessToken});
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const register = async (email,username, password) => {
  try {
      const response = await axios.post(`${API_BASE_URL}/api/register/`, {
          username: username,
          password: password,
          email:email,
          type:"FOUNDERS"
      });
      const redirectUrl = response.data.redirect_url;
      const token = response.data.token;
      localStorage.setItem('authToken', token);
        if (redirectUrl) {
            // Redirect the user to the specified URL
     console.log(token)
            window.location.replace='/fillform';
        } else {
            // Handle other responses or errors as needed
        }
  } catch (error) {
      throw error.response.data;
  }}




  // for common user

  export const login1 = async (username, password) => {
   
    try {
        const response = await axios.post(`${API_BASE_URL}/api/login1/`, {
            username: username,
            password: password,
            type:"PUBLIC"
        },{
            headers: {
               
                
            },
        });
       
        const redirectUrl = response.data.redirect_url;
        const token = response.data.token;
        localStorage.setItem('authToken', token);
          if (redirectUrl) {
              // Redirect the user to the specified URL
       
              window.location.replace = '/welcome';
          } else {
              // Handle other responses or errors as needed
          }
    } catch (error) {
        if (error.response) {
            // The request was made, but the server responded with an error status code
            console.error('Error status:', error.response.status);
            console.error('Error data:', error.response.data);
            throw error.response.data;  // Rethrow the error data for the calling code to handle
        } else if (error.request) {
            // The request was made, but no response was received
            console.error('No response received:', error.request);
            throw 'No response received';  // Rethrow a custom error message
        } else {
            // Something happened in setting up the request that triggered an error
            console.error('Error message:', error.message);
            throw error.message;  // Rethrow the error message
        }
    }
};
export const logout1 = async () => {
    try {
        
        const response = await axios.post(`${API_BASE_URL}/api/logout1/`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const register1 = async (email,username, password) => {
  try {
      const response = await axios.post(`${API_BASE_URL}/api/register1/`, {
          username: username,
          password: password,
          email:email,
          type:"PUBLIC"
      });
      const redirectUrl = response.data.redirect_url;
      const token = response.data.token;
      localStorage.setItem('authToken', token);
        if (redirectUrl) {
            // Redirect the user to the specified URL
     
            window.location.replace = '/welcome';
        } else {
            // Handle other responses or errors as needed
        }
  } catch (error) {
      throw error.response.data;
  }}

 export const  sendTokenToBackend = async (accessToken) => {
    localStorage.clear()
    // Replace 'YOUR_BACKEND_API_ENDPOINT' with the actual endpoint URL
    fetch(`${API_BASE_URL}/api/google-login1/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ access_token: accessToken,
    type:"PUBLIC"
    }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
       
        if(data.error){ alert("Auth error occured!") }
        else{
         localStorage.setItem('authToken', data.access_token)
         window.location.replace("/welcome");
        }
        
      })
      .catch((error) => {
        // Handle error
        alert('Error sending token to backend:', error);
      });
  };

  export const  sendTokenToBackend1 = async (accessToken) => {
    localStorage.clear()
    // Replace 'YOUR_BACKEND_API_ENDPOINT' with the actual endpoint URL
    fetch(`${API_BASE_URL}/api/google-login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ access_token: accessToken ,
        type:"FOUNDERS"}),
    })
      .then((response) => response.json())
      .then((data) => {
       
       if(data.error){ alert("Auth error occured!") }
       else{
        localStorage.setItem('authToken', data.access_token)
        window.location.replace("/fillform");
       }
      })
      .catch((error) => {
        // Handle error
        alert('Error sending token to backend:', error);
      });
  };