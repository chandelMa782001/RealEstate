import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaStar, FaBuilding, FaPhone, FaEnvelope } from 'react-icons/fa';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import gsap from 'gsap';
import { builders } from '../../Constant/Constants';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const Builders = () => {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState('');
  const [filteredBuilders, setFilteredBuilders] = useState([]);
  const cardsRef = useRef([]);
  useEffect(() => {
    setFilteredBuilders(builders);
  }, []);

  useEffect(() => {
    if (searchLocation.trim() === '') {
      setFilteredBuilders(builders);
    } else {
      const filtered = builders.filter(builder =>
        builder.location.toLowerCase().includes(searchLocation.toLowerCase())
      );
      setFilteredBuilders(filtered);
    }
  }, [searchLocation]);
  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.9 },
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
  }, [filteredBuilders]);

  const handleViewDetails = (builderId) => {
    navigate(`/builder/${builderId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-gradient-to-r from-green-900 to-green-700 py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 text-center">
            Find Trusted <span className="text-orange-500">Builders & Dealers</span>
          </h1>
          <p className="text-white text-center mb-6 sm:mb-8 text-base sm:text-lg">
            Connect with verified builders and dealers across Delhi NCR
          </p>
          
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <FaSearch className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg sm:text-xl" />
              <input
                type="text"
                placeholder="Search by location (e.g., Gurgaon, Delhi, Noida)"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 rounded-lg text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            {filteredBuilders.length} Builder{filteredBuilders.length !== 1 ? 's' : ''} Found
          </h2>
          {searchLocation && (
            <p className="text-sm sm:text-base text-gray-600">
              Showing results for: <span className="font-semibold">{searchLocation}</span>
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBuilders.map((builder, index) => (
            <div
              key={builder.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
              onClick={() => handleViewDetails(builder.id)}
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={builder.image}
                  alt={builder.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full flex items-center space-x-1">
                  <FaStar className="text-yellow-500" />
                  <span className="font-semibold text-gray-800">{builder.rating}</span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{builder.name}</h3>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <FaMapMarkerAlt className="mr-2 text-orange-500" />
                  <span className="text-sm">{builder.location}</span>
                </div>

                <div className="flex items-center justify-between mb-3 text-sm">
                  <div className="flex items-center text-gray-600">
                    <FaBuilding className="mr-2 text-orange-500" />
                    <span>{builder.projects}+ Projects</span>
                  </div>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {builder.experience}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {builder.description}
                </p>

                <div className="border-t pt-3">
                  <p className="text-xs text-gray-500 mb-2">Specialization</p>
                  <p className="text-sm font-semibold text-gray-800">{builder.specialization}</p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewDetails(builder.id);
                  }}
                  className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredBuilders.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <FaBuilding className="text-gray-300 text-5xl sm:text-6xl mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">No Builders Found</h3>
            <p className="text-sm sm:text-base text-gray-600">Try searching with a different location</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
export default Builders;
