import axios from 'axios';

// TEMPORARY HARDCODE FOR PRODUCTION - Change back after setting env vars
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://crm-backend-vd9y.onrender.com',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000 
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export const checkAuth = async () => {
  try {
    console.log('Checking authentication...');
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      console.log('No auth token found');
      return null;
    }
    
    const res = await api.get('/api/user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('Auth check successful:', res.data);
    return res.data;
  } catch (err) {
    console.error('Auth check failed:', err.response?.status, err.response?.data);
    if (err.code === 'ECONNABORTED') {
      console.error('Request timed out');
    }
    // Clear token if unauthorized
    if (err.response?.status === 401) {
      localStorage.removeItem('authToken');
    }
    return null;
  }
};
