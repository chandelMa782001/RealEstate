import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

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


  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setIsLoginModalOpen(false);
    localStorage.setItem('user', JSON.stringify(userData));
    toast.success(`Welcome back, ${userData.name || userData.email}!`, {
      position: "top-right",
      autoClose: 3000,
    });
  };


  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    toast.info('You have been logged out successfully', {
      position: "top-right",
      autoClose: 3000,
    });
  };

 
  const signup = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setIsSignupModalOpen(false);
    localStorage.setItem('user', JSON.stringify(userData));
    toast.success(`Account created successfully! Welcome, ${userData.name}!`, {
      position: "top-right",
      autoClose: 3000,
    });
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

  
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedFavorites = localStorage.getItem('favorites');
    const storedRecentlyViewed = localStorage.getItem('recentlyViewed');

    if (storedUser) {
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
    addToRecentlyViewed
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
