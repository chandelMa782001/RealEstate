import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../Context/AppContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FeaturedProperties = () => {
  const navigate = useNavigate();
  const { showNotification } = useAppContext();
  const cardsRef = useRef([]);

  useEffect(() => {
    // Animate property cards on scroll
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
    
    // GSAP button animation
    gsap.to(e.currentTarget, {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    });

    // Show notification
    showNotification(`Loading ${property.title}...`, 'info', 2000);

    // Navigate with slight delay for smooth animation
    setTimeout(() => {
      navigate(`/property/${property.id}`);
    }, 300);
  };
  const properties = [
    {
      id: 1,
      title: 'Luxury Villa in Gurgaon',
      location: 'Sector 47, Gurgaon',
      price: '₹2.5 Cr',
      type: 'Villa',
      beds: 4,
      baths: 3,
      area: '3500 sq.ft',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600'
    },
    {
      id: 2,
      title: 'Modern Apartment',
      location: 'Dwarka, New Delhi',
      price: '₹85 Lac',
      type: 'Apartment',
      beds: 3,
      baths: 2,
      area: '1800 sq.ft',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600'
    },
    {
      id: 3,
      title: 'Commercial Space',
      location: 'Connaught Place, Delhi',
      price: '₹5 Cr',
      type: 'Commercial',
      beds: null,
      baths: 2,
      area: '2500 sq.ft',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600'
    },
    {
      id: 4,
      title: 'Residential Plot',
      location: 'Kundli, Sonipat',
      price: '₹45 Lac',
      type: 'Plot',
      beds: null,
      baths: null,
      area: '200 sq.yd',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600'
    },
    {
      id: 5,
      title: 'Premium Penthouse',
      location: 'Vasant Kunj, Delhi',
      price: '₹3.8 Cr',
      type: 'Penthouse',
      beds: 5,
      baths: 4,
      area: '4200 sq.ft',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600'
    },
    {
      id: 6,
      title: 'Studio Apartment',
      location: 'Noida Sector 62',
      price: '₹42 Lac',
      type: 'Apartment',
      beds: 1,
      baths: 1,
      area: '650 sq.ft',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600'
    },
    {
      id: 7,
      title: 'Office Space',
      location: 'Cyber City, Gurgaon',
      price: '₹8 Cr',
      type: 'Commercial',
      beds: null,
      baths: 3,
      area: '3800 sq.ft',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600'
    },
    {
      id: 8,
      title: 'Farmhouse Plot',
      location: 'Manesar, Haryana',
      price: '₹1.2 Cr',
      type: 'Plot',
      beds: null,
      baths: null,
      area: '500 sq.yd',
      image: 'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=600'
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-2 text-center">Featured Properties</h2>
        <p className="text-gray-600 text-center mb-12">Discover our handpicked selection of premium properties</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property, index) => (
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
      </div>
    </div>
  );
};

export default FeaturedProperties;
