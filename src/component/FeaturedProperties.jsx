import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../Context/AppContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { propertiess } from '../../Constant/Constants';
gsap.registerPlugin(ScrollTrigger);
const FeaturedProperties = () => {
  const navigate = useNavigate();
  const { showNotification, isAuthenticated, setIsLoginModalOpen } = useAppContext();
  const cardsRef = useRef([]);
  useEffect(() => {  
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { 
            opacity: 0, 
            y: 50,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    });
  }, []);
  const handleViewDetails = (property, e) => {
    e.stopPropagation();
    gsap.to(e.currentTarget, {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    });
    setTimeout(() => {
      navigate(`/property/${property.id}`);
    }, 300);
  };
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-2 text-center">Featured Properties</h2>
        <p className="text-gray-600 text-center mb-12">Discover our handpicked selection of premium properties</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {propertiess.map((property, index) => (
            <div 
               onClick={(e) => handleViewDetails(property, e)}
              key={property.id} 
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {property.type}
                </div>
              </div> 
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{property.title}</h3>
                <p className="text-gray-600 text-sm mb-3 flex items-center">
                  <span className="mr-1">📍</span>
                  {property.location}
                </p>
                <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
                  {property.beds && <span>🛏️ {property.beds} Beds</span>}
                  {property.baths && <span>🚿 {property.baths} Baths</span>}
                  <span>📐 {property.area}</span>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t">
                  <span className="text-2xl font-bold text-orange-500">{property.price}</span>
                  <button 
                    onClick={(e) => handleViewDetails(property, e)}
                    className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
            <span className='font-bold cursor-pointer text-orange-500 flex justify-end py-5 ' onClick={()=>navigate('/properties')}>View All</span>
      </div>
  
    </div>
  );
};
export default FeaturedProperties;
