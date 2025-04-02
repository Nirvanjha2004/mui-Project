import apiClient from '../client';

const userService = {
  // Get current user
  getCurrentUser: () => apiClient.get('/auth/me'),
  
  // Login
  login: (credentials: { email: string; password: string }) => 
    apiClient.post('/auth/login', credentials),
  
  // Register
  register: (userData: { name: string; email: string; password: string; role: 'user' | 'admin' }) => 
    apiClient.post('/auth/register', userData),
  
  // Get user profile
  getUserProfile: (id: string) => apiClient.get(`/users/${id}`),
  
  // Update user profile
  updateUserProfile: (id: string, userData: { name?: string; email?: string }) => 
    apiClient.put(`/users/${id}`, userData),
  
  // Get user results
  getUserResults: (id: string) => apiClient.get(`/users/${id}/results`),
  
  // Get user statistics
  getUserStatistics: (id: string) => apiClient.get(`/users/${id}/statistics`),
};

export default userService;
