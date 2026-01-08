// API utility functions for handling responses and errors

export const handleApiResponse = (response) => {
  if (response.success) {
    return {
      success: true,
      data: response.data,
      message: response.message
    };
  }
  throw new Error(response.message || 'Something went wrong');
};

export const handleApiError = (error) => {
  console.error('API Error:', error);
  
  if (error.response) {
    // Server responded with error status
    return {
      success: false,
      message: error.response.data?.message || 'Server error occurred',
      status: error.response.status
    };
  } else if (error.request) {
    // Network error
    return {
      success: false,
      message: 'Network error. Please check your connection.',
      status: 0
    };
  } else {
    // Other error
    return {
      success: false,
      message: error.message || 'An unexpected error occurred',
      status: 0
    };
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const setAuthToken = (token) => {
  localStorage.setItem('token', token);
};

export const removeAuthToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

export const getUserFromStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const setUserToStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};