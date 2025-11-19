import axios from 'axios';

const API = axios.create({
   baseURL: import.meta.env.VITE_API_URL || 'https://background1.onrender.com/api',
  // baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Add request interceptor
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, error => {
  return Promise.reject(error);
});

// Add response interceptor
API.interceptors.response.use(response => {
  console.log('API Response:', response.status, response.config.method.toUpperCase(), response.config.url);
  return response;
}, error => {
  console.error('API Response Error:', error.response?.status || 'Network Error', error.response?.data || error.message);
  return Promise.reject(error);
});

export default API;
