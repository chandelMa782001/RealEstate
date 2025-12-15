import React, { useEffect, useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../Context/AppContext';

const ProtectedRoute = ({ children, message = 'Please login to access this page' }) => {
  const { isAuthenticated, setIsLoginModalOpen, showNotification } = useAppContext();
  const location = useLocation();
  const hasShownModal = useRef(false);

  useEffect(() => {
    if (!isAuthenticated && !hasShownModal.current) {
      hasShownModal.current = true;
      
      // Show custom message based on the route
      showNotification(message, 'warning', 3000);
      
      // Open login modal after a short delay
      setTimeout(() => {
        setIsLoginModalOpen(true);
      }, 500);
    }
  }, [isAuthenticated, setIsLoginModalOpen, showNotification, message]);

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
