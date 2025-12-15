import React, { useEffect, useRef } from 'react';
import { FaCheckCircle, FaInfoCircle, FaExclamationTriangle, FaTimesCircle, FaTimes } from 'react-icons/fa';
import gsap from 'gsap';
const Notification = ({ type = 'info', message, onClose, duration = 3000 }) => {
  const notificationRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      notificationRef.current,
      { x: 400, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
    );
    if (duration) {
      const timer = setTimeout(() => {
      
        gsap.to(notificationRef.current, {
          x: 400,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: onClose
        });
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const handleClose = () => {
    gsap.to(notificationRef.current, {
      x: 400,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: onClose
    });
  };
  const icons = {
    success: <FaCheckCircle className="text-green-500" size={24} />,
    error: <FaTimesCircle className="text-red-500" size={24} />,
    warning: <FaExclamationTriangle className="text-yellow-500" size={24} />,
    info: <FaInfoCircle className="text-blue-500" size={24} />
  };
  const bgColors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    warning: 'bg-yellow-50 border-yellow-200',
    info: 'bg-blue-50 border-blue-200'
  };
  return (
    <div 
      ref={notificationRef}
      className={`${bgColors[type]} border-l-4 rounded-lg shadow-lg p-4 flex items-center justify-between min-w-[300px] max-w-md`}
    >
      <div className="flex items-center space-x-3">
        {icons[type]}
        <p className="text-gray-800 font-medium">{message}</p>
      </div>
      <button
        onClick={handleClose}
        className="text-gray-400 hover:text-gray-600 transition ml-4"
      >
        <FaTimes size={18} />
      </button>
    </div>
  );
};
export default Notification;
