import api from './axios.js';
export const authAPI = {
  register: async (userData) => {
    try {
     
      
      const response = await api.post('/auth/register', userData);
      
    
      
      return response.data;
    } catch (error) {
   
      throw error.response?.data || error.message;
    }
  },
  login: async (credentials) => {
    try {
   
      const response = await api.post('/auth/login', credentials);
      
      return response.data;
    } catch (error) {
      
      throw error.response?.data || error.message;
    }
  },
  logout: async () => {
    try {
      const response = await api.post('/auth/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  getProfile: async () => {
    try {
      const response = await api.get('/auth/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/auth/profile', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  changePassword: async (passwordData) => {
    try {
      const response = await api.put('/auth/change-password', passwordData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  resetPassword: async (resetData) => {
    try {
      const response = await api.post('/auth/reset-password', resetData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
export const dealerAPI = {
  register: async (dealerData) => {
    try {
      
      
      const response = await api.post('/dealer/register', dealerData);
      

      
      return response.data;
    } catch (error) {
     
      
     
      if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
        throw new Error('Server is taking too long to respond. Please try again in a moment.');
      }
      
      
      if (error.code === 'ERR_NETWORK') {
        throw new Error('Network error. Please check your internet connection.');
      }
      
      throw error.response?.data || error.message;
    }
  },

  login: async (credentials) => {
    try {
     
      
      const response = await api.post('/dealer/login', credentials);
      

      
      return response.data;
    } catch (error) {
      
      
     
      if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
        throw new Error('Server is taking too long to respond. Please try again in a moment.');
      }
      
   
      if (error.code === 'ERR_NETWORK') {
        throw new Error('Network error. Please check your internet connection.');
      }
      
      throw error.response?.data || error.message;
    }
  },

  forgotPassword: async (email, retryCount = 0) => {
    const maxRetries = 2;
    
    try {
     
      
      const payload = { email };
      console.log(' Forgot Password Payload:', JSON.stringify(payload, null, 2));
      
      
      const response = await api.post('/dealer/forgot-password', payload);
      
     
      
      return response.data;
    } catch (error) {
     
      
    
    
   
      
      if (error.code === 'ERR_NETWORK') {
        throw new Error('Network error. Please check your internet connection and try again.');
      }
      
      // Handle specific HTTP status codes
      if (error.response?.status === 404) {
        throw new Error('Email not found. Please check your email address and try again.');
      }
      
      if (error.response?.status === 500) {
        throw new Error('Server error. Please try again later.');
      }
      
      throw error.response?.data || error.message;
    }
  },

  verifyOtp: async (email, otp, retryCount = 0) => {
    const maxRetries = 2;
    
    try {
      console.log(` DEALER API - Verify OTP function called (attempt ${retryCount + 1})`);
      console.log(' Email received:', email);
      console.log(' OTP received:', otp);
      
      const payload = { email, otp };
      console.log(' Verify OTP Payload:', JSON.stringify(payload, null, 2));
      
      // Add a longer timeout specifically for this request
      const response = await api.post('/dealer/verify-otp', payload);
      
    
      
      return response.data;
    } catch (error) {
     
      
      
      // Retry logic for timeout errors
 
      
      if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
        throw new Error('The server is currently slow or unavailable. This might be because the server is starting up (common with free hosting services). Please wait a few minutes and try again.');
      }
      
      if (error.code === 'ERR_NETWORK') {
        throw new Error('Network error. Please check your internet connection and try again.');
      }
      
      // Handle specific HTTP status codes
      if (error.response?.status === 400) {
        throw new Error('Invalid OTP. Please check the code and try again.');
      }
      
      if (error.response?.status === 404) {
        throw new Error('OTP session expired. Please request a new OTP.');
      }
      
      if (error.response?.status === 500) {
        throw new Error('Server error. Please try again later.');
      }
      
      throw error.response?.data || error.message;
    }
  },

  resetPassword: async (email, newPassword, retryCount = 0) => {
    const maxRetries = 2;
    
    try {

      const payload = { email, newPassword };

      
      const response = await api.post('/dealer/reset-password', payload);
      
     
      
      return response.data;
    } catch (error) {
      
      
      // Retry logic for timeout errors
      if ((error.code === 'ECONNABORTED' && error.message.includes('timeout')) && retryCount < maxRetries) {

        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds before retry
        return dealerAPI.resetPassword(email, newPassword, retryCount + 1);
      }
      
      if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
        throw new Error('The server is currently slow or unavailable. This might be because the server is starting up (common with free hosting services). Please wait a few minutes and try again.');
      }
      
      if (error.code === 'ERR_NETWORK') {
        throw new Error('Network error. Please check your internet connection and try again.');
      }
      
      // Handle specific HTTP status codes
      if (error.response?.status === 400) {
        throw new Error('Invalid request. Please check your information and try again.');
      }
      
      if (error.response?.status === 404) {
        throw new Error('Reset session expired or email not found. Please start the password reset process again.');
      }
      
      if (error.response?.status === 500) {
        throw new Error('Server error. Please try again later.');
      }
      
      throw error.response?.data || error.message;
    }
  }
};
export default authAPI;