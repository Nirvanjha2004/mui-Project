import apiClient from './client';

// Example user service
export const userService = {
  // Get current user
  getCurrentUser: () => apiClient.get('/users/me'),
  
  // Login
  login: (credentials: { email: string; password: string }) => 
    apiClient.post('/auth/login', credentials),
  
  // Register
  register: (userData: { name: string; email: string; password: string }) => 
    apiClient.post('/auth/register', userData),
};

// Add more services as needed for different resources
// Example:
export const productService = {
  getAll: () => apiClient.get('/products'),
  getById: (id: string) => apiClient.get(`/products/${id}`),
  // etc.
};

export default {
  user: userService,
  product: productService,
  // Add other services here
};
