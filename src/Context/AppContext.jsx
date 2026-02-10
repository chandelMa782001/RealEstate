import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const AppContext = createContext();


export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};


export const AppProvider = ({ children }) => {
 
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const [favorites, setFavorites] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  const showNotification = (message, type = 'info', duration = 3000) => {
    switch (type) {
      case 'success':
        toast.success(message, { duration });
        break;
      case 'error':
        toast.error(message, { duration });
        break;
      case 'warning':
        toast(message, { 
          icon: '⚠️',
          duration,
          style: {
            background: '#fef3c7',
            color: '#92400e',
            border: '1px solid #fbbf24',
          }
        });
        break;
      case 'info':
      default:
        toast(message, { 
          icon: 'ℹ️',
          duration,
          style: {
            background: '#dbeafe',
            color: '#1e40af',
            border: '1px solid #60a5fa',
          }
        });
        break;
    }
  };

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setIsLoginModalOpen(false);
    localStorage.setItem('user', JSON.stringify(userData));
    // showNotification(`Welcome back, ${userData.name || userData.email}!`, 'success');
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    showNotification('You have been logged out successfully', 'info');
  };

  const signup = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setIsSignupModalOpen(false);
    localStorage.setItem('user', JSON.stringify(userData));
    showNotification(`Account created successfully! Welcome, ${userData.name}!`, 'success');
  };

  
  const addToFavorites = (propertyId) => {
    if (!favorites.includes(propertyId)) {
      const newFavorites = [...favorites, propertyId];
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  };

 
  const removeFromFavorites = (propertyId) => {
    const newFavorites = favorites.filter(id => id !== propertyId);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };


  const addToRecentlyViewed = (propertyId) => {
    const newRecentlyViewed = [propertyId, ...recentlyViewed.filter(id => id !== propertyId)].slice(0, 10);
    setRecentlyViewed(newRecentlyViewed);
    localStorage.setItem('recentlyViewed', JSON.stringify(newRecentlyViewed));
  };

  // Initialize state from localStorage on app load
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const storedFavorites = localStorage.getItem('favorites');
    const storedRecentlyViewed = localStorage.getItem('recentlyViewed');

    // Only set as authenticated if both user and token exist
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
    if (storedRecentlyViewed) {
      setRecentlyViewed(JSON.parse(storedRecentlyViewed));
    }
  }, []);

  const value = {
   
    user,
    isAuthenticated,
    login,
    logout,
    signup,

  
    isLoginModalOpen,
    setIsLoginModalOpen,
    isSignupModalOpen,
    setIsSignupModalOpen,

    favorites,
    addToFavorites,
    removeFromFavorites,

    recentlyViewed,
    addToRecentlyViewed,

    // Notifications
    showNotification
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
