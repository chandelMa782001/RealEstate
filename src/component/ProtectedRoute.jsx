import React, { useEffect, useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../Context/AppContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, setIsLoginModalOpen, showNotification } = useAppContext();
  const location = useLocation();
  const hasShownModal = useRef(false);

  useEffect(() => {
    if (!isAuthenticated && !hasShownModal.current) {
      hasShownModal.current = true;
      

      showNotification('Please login to view property details', 'warning', 3000);
      
 
      setTimeout(() => {
        setIsLoginModalOpen(true);
      }, 500);
    }
  }, [isAuthenticated, setIsLoginModalOpen, showNotification]);

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
