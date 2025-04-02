import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // Change to false if CORS issues occur
});

// Request interceptor for adding auth token or other headers
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage if exists
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Response error:', error);
    const { response } = error;
    
    if (response && response.status === 401) {
      // Handle unauthorized access
      console.log('Authentication error, logging out...');
      localStorage.removeItem('auth_token');
      // Optional: redirect to login
      window.location.href = '/signin';
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
