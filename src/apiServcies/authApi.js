import api from './axios.js';
export const authAPI = {
  register: async (userData) => {
    try {
      console.log('AUTH API - Register function called');
      console.log('User Data received:', userData);
      console.log(' User Data type:', typeof userData);
      console.log(' User Data keys:', Object.keys(userData));
      console.log(' User Data stringified:', JSON.stringify(userData, null, 2));
      
      const response = await api.post('/auth/register', userData);
      
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
      const response = await api.post('/auth/login', credentials);
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
      console.log(' DEALER API - Register function called');
      console.log(' Dealer Data received:', dealerData);
      console.log(' Dealer Data type:', typeof dealerData);
      console.log(' Dealer Data keys:', Object.keys(dealerData));
      console.log(' Dealer Data stringified:', JSON.stringify(dealerData, null, 2));
      
      const response = await api.post('/dealer/register', dealerData);
      
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
      console.log(' DEALER API - Login function called');
      console.log(' Dealer Login Credentials received:', credentials);
      console.log(' Credentials type:', typeof credentials);
      console.log(' Credentials keys:', Object.keys(credentials));
      console.log(' Credentials stringified:', JSON.stringify(credentials, null, 2));
      
      const response = await api.post('/dealer/login', credentials);
      
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
      console.log(` DEALER API - Forgot Password function called (attempt ${retryCount + 1})`);
      console.log(' Email received:', email);
      
      const payload = { email };
      console.log(' Forgot Password Payload:', JSON.stringify(payload, null, 2));
      
      // Add a longer timeout specifically for this request
      const response = await api.post('/dealer/forgot-password', payload);
      
      console.log(' API Dealer Forgot Password - Full Response:', response);
      console.log(' API Dealer Forgot Password - Response Data:', response.data);
      console.log(' API Dealer Forgot Password - Response Status:', response.status);
      
      return response.data;
    } catch (error) {
      console.log(` API Dealer Forgot Password - Error occurred (attempt ${retryCount + 1}):`, error);
      console.log(' API Dealer Forgot Password - Error response:', error.response);
      console.log(' API Dealer Forgot Password - Error data:', error.response?.data);
      console.log(' API Dealer Forgot Password - Error status:', error.response?.status);
      console.log(' API Dealer Forgot Password - Error message:', error.message);
      console.log(' API Dealer Forgot Password - Error code:', error.code);
      
    
    
   
      
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
      
      console.log(' API Dealer Verify OTP - Full Response:', response);
      console.log(' API Dealer Verify OTP - Response Data:', response.data);
      console.log(' API Dealer Verify OTP - Response Status:', response.status);
      
      return response.data;
    } catch (error) {
     
      console.log(' API Dealer Verify OTP - Error response:', error.response);
      console.log(' API Dealer Verify OTP - Error data:', error.response?.data);
      console.log(' API Dealer Verify OTP - Error status:', error.response?.status);
      console.log(' API Dealer Verify OTP - Error message:', error.message);
      console.log(' API Dealer Verify OTP - Error code:', error.code);
      
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
  }
};
export default authAPI;