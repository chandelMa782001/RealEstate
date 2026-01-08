import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const LoadingOverlay = ({ 
  isLoading, 
  text = 'Loading...', 
  children,
  blur = true,
  opacity = 'bg-opacity-50'
}) => {
  if (!isLoading) {
    return children;
  }

  return (
    <div className="relative">
   
      <div className={blur ? 'filter blur-sm pointer-events-none' : 'pointer-events-none opacity-50'}>
        {children}
      </div>
      
     
      <div className={`absolute inset-0 bg-white ${opacity} flex items-center justify-center z-10`}>
        <div className="bg-white rounded-lg p-6 shadow-xl">
          <LoadingSpinner size="lg" color="orange" text={text} />
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;