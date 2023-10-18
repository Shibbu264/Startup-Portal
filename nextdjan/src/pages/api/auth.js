
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; 

export const login = async (username, password) => {
    const base64Credentials = btoa(`${username}:${password}`);
    try {
        const response = await axios.post(`${API_BASE_URL}/api/login/`, {
            username: username,
            password: password,
        },{
            headers: {
               
                
            },
        });
       
        const redirectUrl = response.data.redirect_url;
        const token = response.data.token;
        localStorage.setItem('authToken', token);
          if (redirectUrl) {
              // Redirect the user to the specified URL
       
              window.location.href = redirectUrl;
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
export const logout = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/logout/`);
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
      });
      const redirectUrl = response.data.redirect_url;
      const token = response.data.token;
      localStorage.setItem('authToken', token);
        if (redirectUrl) {
            // Redirect the user to the specified URL
     
            window.location.href = redirectUrl;
        } else {
            // Handle other responses or errors as needed
        }
  } catch (error) {
      throw error.response.data;
  }}