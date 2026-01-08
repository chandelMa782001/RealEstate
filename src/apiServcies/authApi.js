import api from './axios.js';

// Auth API endpoints
export const authAPI = {
  // Register user
  register: async (userData) => {
    try {
      console.log('AUTH API - Register function called');
      console.log('User Data received:', userData);
      console.log(' User Data type:', typeof userData);
      console.log(' User Data keys:', Object.keys(userData));
      console.log(' User Data stringified:', JSON.stringify(userData, null, 2));
      
      const response = await api.post('/api/auth/register', userData);
      
      console.log(' API Register - Full Response:', response);
      console.log('API Register - Response Data:', response.data);
      console.log(' API Register - Response Status:', response.status);
      console.log(' API Register - Response Headers:', response.headers);
      
      return response.data;
    } catch (error) {
      console.log('API Register - Error occurred:', error);
      console.log('API Register - Error response:', error.response);
      console.log(' API Register - Error data:', error.response?.data);
      console.log(' API Register - Error status:', error.response?.status);
      console.log(' API Register - Error message:', error.message);
      throw error.response?.data || error.message;
    }
  },

 
  login: async (credentials) => {
    try {
      console.log(' AUTH API - Login function called');
      console.log(' Login Credentials received:', credentials);
      console.log(' Credentials type:', typeof credentials);
      console.log(' Credentials keys:', Object.keys(credentials));
      console.log(' Credentials stringified:', JSON.stringify(credentials, null, 2));
      
      const response = await api.post('/api/auth/login', credentials);
      
      console.log(' API Login - Full Response:', response);
      console.log(' API Login - Response Data:', response.data);
      console.log(' API Login - Response Status:', response.status);
      console.log(' API Login - Response Headers:', response.headers);
      
      return response.data;
    } catch (error) {
      console.log(' API Login - Error occurred:', error);
      console.log(' API Login - Error response:', error.response);
      console.log(' API Login - Error data:', error.response?.data);
      console.log(' API Login - Error status:', error.response?.status);
      console.log(' API Login - Error message:', error.message);
      throw error.response?.data || error.message;
    }
  },

  // Logout user
  logout: async () => {
    try {
      const response = await api.post('/api/auth/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get user profile
  getProfile: async () => {
    try {
      const response = await api.get('/api/auth/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/api/auth/profile', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Change password
  changePassword: async (passwordData) => {
    try {
      const response = await api.put('/api/auth/change-password', passwordData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Forgot password
  forgotPassword: async (email) => {
    try {
      const response = await api.post('/api/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Reset password
  resetPassword: async (resetData) => {
    try {
      const response = await api.post('/api/auth/reset-password', resetData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

// Dealer API endpoints
export const dealerAPI = {
  // Register dealer
  register: async (dealerData) => {
    try {
      console.log(' DEALER API - Register function called');
      console.log(' Dealer Data received:', dealerData);
      console.log(' Dealer Data type:', typeof dealerData);
      console.log(' Dealer Data keys:', Object.keys(dealerData));
      console.log(' Dealer Data stringified:', JSON.stringify(dealerData, null, 2));
      
      const response = await api.post('/api/dealer/register', dealerData);
      
      console.log(' API Dealer Register - Full Response:', response);
      console.log(' API Dealer Register - Response Data:', response.data);
      console.log(' API Dealer Register - Response Status:', response.status);
      console.log(' API Dealer Register - Response Headers:', response.headers);
      
      return response.data;
    } catch (error) {
      console.log(' API Dealer Register - Error occurred:', error);
      console.log(' API Dealer Register - Error response:', error.response);
      console.log(' API Dealer Register - Error data:', error.response?.data);
      console.log(' API Dealer Register - Error status:', error.response?.status);
      console.log(' API Dealer Register - Error message:', error.message);
      console.log(' API Dealer Register - Error code:', error.code);
      
      // Handle timeout errors specifically
      if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
        throw new Error('Server is taking too long to respond. Please try again in a moment.');
      }
      
      // Handle network errors
      if (error.code === 'ERR_NETWORK') {
        throw new Error('Network error. Please check your internet connection.');
      }
      
      throw error.response?.data || error.message;
    }
  },

  // Login dealer
  login: async (credentials) => {
    try {
      console.log(' DEALER API - Login function called');
      console.log(' Dealer Login Credentials received:', credentials);
      console.log(' Credentials type:', typeof credentials);
      console.log(' Credentials keys:', Object.keys(credentials));
      console.log(' Credentials stringified:', JSON.stringify(credentials, null, 2));
      
      const response = await api.post('/api/dealer/login', credentials);
      
      console.log(' API Dealer Login - Full Response:', response);
      console.log(' API Dealer Login - Response Data:', response.data);
      console.log(' API Dealer Login - Response Status:', response.status);
      console.log(' API Dealer Login - Response Headers:', response.headers);
      
      return response.data;
    } catch (error) {
      console.log(' API Dealer Login - Error occurred:', error);
      console.log('API Dealer Login - Error response:', error.response);
      console.log(' API Dealer Login - Error data:', error.response?.data);
      console.log(' API Dealer Login - Error status:', error.response?.status);
      console.log(' API Dealer Login - Error message:', error.message);
      console.log(' API Dealer Login - Error code:', error.code);
      
      // Handle timeout errors specifically
      if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
        throw new Error('Server is taking too long to respond. Please try again in a moment.');
      }
      
      // Handle network errors
      if (error.code === 'ERR_NETWORK') {
        throw new Error('Network error. Please check your internet connection.');
      }
      
      throw error.response?.data || error.message;
    }
  }
};
export default authAPI;