import axios from "axios";



const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  withCredentials: false,
  timeout: 60000, 
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('🔍 Axios Interceptor - Full Error:', error);
    console.log('🔍 Axios Interceptor - Error Code:', error.code);
    console.log('🔍 Axios Interceptor - Error Message:', error.message);
    console.log('🔍 Axios Interceptor - Error Config:', error.config);
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
