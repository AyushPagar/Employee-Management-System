import axios from 'axios';

// This creates a shortcut for your backend URL
const API = axios.create({
  baseURL: 'http://localhost:5000/api', 
});

// This automatically attaches your Login Token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
