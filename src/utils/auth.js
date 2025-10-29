import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
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
    const res = await api.get('/api/user');
    console.log('Auth check successful:', res.data);
    return res.data;
  } catch (err) {
    console.error('Auth check failed:', err.response?.status, err.response?.data);
    if (err.code === 'ECONNABORTED') {
      console.error('Request timed out');
    }
    return null;
  }
};
