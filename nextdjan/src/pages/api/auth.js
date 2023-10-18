
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; 

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/login/`, {
            username: username,
            password: password,
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
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