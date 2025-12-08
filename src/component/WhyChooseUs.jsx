import React from 'react';
import { FaHandshake, FaHeadset, FaHardHat, FaHandHoldingUsd } from 'react-icons/fa';
import {images} from '../../utils/Image'
const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      image: images.hand,
      title: 'Trusted by Thousands',
      description: 'Thousands of happy investors since 2014 and continue...'
    },
    {
      id: 2,
      image: images.contact,
      title: '24/7 Support',
      description: 'An impeccable service standard helps us to stand out.'
    },
    {
      id: 3,
 image: images.house,
      title: 'Ease of Construction',
      description: 'Providing an end-to-end construction solutions.'
    },
    {
      id: 4,
      image: images.Last,
      title: 'Encash your Property',
      description: 'Investment is easy. Providing hassle free resale options.'
    }
  ];

  return (
    <div className="bg-gray-50 py-8 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-8 sm:mb-10 md:mb-12 text-center">Why Choose Us</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="bg-white p-6 sm:p-8 rounded-lg shadow-lg hover:shadow-xl transition text-center group"
            >
              <div className="flex justify-center mb-4 sm:mb-6 text-gray-800 group-hover:text-orange-500 transition">
               <img src={feature.image} alt="image" className="w-16 h-16 sm:w-20 sm:h-20 object-contain" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default WhyChooseUs;
