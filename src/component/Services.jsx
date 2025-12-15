import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../Context/AppContext';
import {services} from "../../Constant/Constants"
const Services = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsLoginModalOpen, showNotification } = useAppContext();
  
  const handleProtectedAction = (actionType) => {
    if (!isAuthenticated) {
      showNotification(`Please login to ${actionType.toLowerCase()}`, 'warning', 3000);
      setTimeout(() => {
        setIsLoginModalOpen(true);
      }, 500);
      return;
    }
    switch (actionType) {
      case 'Sell Property':
        navigate('/post-property');
        break;
      case 'Rent Property':
        navigate('/properties');
        break;
      case 'Property Valuation':
        showNotification('Property valuation service coming soon!', 'info', 2000);
        break;
      default:
        break;
    }
  };
  
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-2 text-center">Our Services</h2>
        <p className="text-gray-600 text-center mb-12">Everything you need for your real estate journey</p> 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              onClick={service.action}
              className={`text-center p-6 rounded-lg hover:shadow-lg transition group relative ${
                service.action ? 'cursor-pointer hover:bg-gray-50' : ''
              }`}
            >
              {service.requiresAuth && !isAuthenticated && (
                <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  Login Required
                </div>
              )}
              <div className="text-6xl mb-4 group-hover:scale-110 transition">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
              {service.action && (
                <button className={`mt-4 px-4 py-2 rounded-lg text-sm transition-all ${
                  service.requiresAuth && !isAuthenticated 
                    ? 'bg-gray-400 text-white cursor-not-allowed' 
                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                }`}>
                  {service.requiresAuth && !isAuthenticated ? 'Login to Access' : 'Explore Now'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Services;
