import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaTag, FaPercent, FaClock } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Offers = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const cardsRef = useRef([]);

  const offerProperties = [
    {
      id: 1,
      title: 'Luxury Villa in Gurgaon',
      location: 'Sector 47, Gurgaon',
      originalPrice: '₹3.0 Cr',
      offerPrice: '₹2.5 Cr',
      discount: '17%',
      type: 'Villa',
      beds: 4,
      baths: 3,
      area: '3500 sq.ft',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600',
      status: 'Ready to Move',
      offerType: 'Limited Time',
      offerEndDate: '2024-12-31',
      offerDescription: 'Year-end special offer! Save ₹50 Lacs on this premium villa.',
      badge: 'HOT DEAL'
    },
    {
      id: 2,
      title: 'Modern Apartment',
      location: 'Dwarka, New Delhi',
      originalPrice: '₹1.0 Cr',
      offerPrice: '₹85 Lac',
      discount: '15%',
      type: 'Apartment',
      beds: 3,
      baths: 2,
      area: '1800 sq.ft',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600',
      status: 'Ready to Move',
      offerType: 'Festival Offer',
      offerEndDate: '2024-12-25',
      offerDescription: 'Festival special pricing with free registration and stamp duty.',
      badge: 'FESTIVAL SPECIAL'
    },
    {
      id: 5,
      title: 'Premium Penthouse',
      location: 'Vasant Kunj, Delhi',
      originalPrice: '₹4.5 Cr',
      offerPrice: '₹3.8 Cr',
      discount: '16%',
      type: 'Penthouse',
      beds: 5,
      baths: 4,
      area: '4200 sq.ft',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600',
      status: 'Under Construction',
      offerType: 'Pre-Launch',
      offerEndDate: '2025-01-15',
      offerDescription: 'Pre-launch offer with flexible payment plans and guaranteed returns.',
      badge: 'PRE-LAUNCH'
    },
    {
      id: 6,
      title: 'Studio Apartment',
      location: 'Noida Sector 62',
      originalPrice: '₹50 Lac',
      offerPrice: '₹42 Lac',
      discount: '16%',
      type: 'Apartment',
      beds: 1,
      baths: 1,
      area: '650 sq.ft',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600',
      status: 'Ready to Move',
      offerType: 'First Time Buyer',
      offerEndDate: '2024-12-30',
      offerDescription: 'Special offer for first-time home buyers with easy EMI options.',
      badge: 'FIRST BUYER'
    },
    {
      id: 7,
      title: 'Office Space',
      location: 'Cyber City, Gurgaon',
      originalPrice: '₹10 Cr',
      offerPrice: '₹8 Cr',
      discount: '20%',
      type: 'Commercial',
      beds: null,
      baths: 3,
      area: '3800 sq.ft',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600',
      status: 'Ready to Move',
      offerType: 'Business Special',
      offerEndDate: '2025-01-31',
      offerDescription: 'Corporate discount for bulk bookings and immediate possession.',
      badge: 'CORPORATE DEAL'
    },
    {
      id: 9,
      title: 'Luxury Penthouse in South Delhi',
      location: 'Greater Kailash, New Delhi',
      originalPrice: '₹5.2 Cr',
      offerPrice: '₹4.5 Cr',
      discount: '13%',
      type: 'Penthouse',
      beds: 4,
      baths: 4,
      area: '3800 sq.ft',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600',
      status: 'Ready to Move',
      offerType: 'Luxury Deal',
      offerEndDate: '2025-02-14',
      offerDescription: 'Valentine special on luxury penthouse with premium amenities.',
      badge: 'LUXURY DEAL'
    }
  ];

  const filters = ['All', 'Villa', 'Apartment', 'Commercial', 'Penthouse'];

  const filteredProperties = filter === 'All' 
    ? offerProperties 
    : offerProperties.filter(property => property.type === filter);

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
  }, [filteredProperties]);

  const calculateDaysLeft = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-500 to-orange-600 text-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              🔥 Exclusive Property Offers
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-4">
              Limited time deals on premium properties
            </p>
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3">
              <FaClock className="mr-2 text-yellow-300" />
              <span className="text-sm sm:text-base font-semibold">
                Hurry! Offers ending soon
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 md:py-16">
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-10 md:mb-12 justify-center">
          {filters.map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg font-semibold transition text-sm sm:text-base ${
                filter === filterOption
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
              }`}
            >
              {filterOption}
            </button>
          ))}
        </div>

        {/* Offer Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-red-500 mb-2">
              {filteredProperties.length}
            </div>
            <div className="text-sm sm:text-base text-gray-600">Active Offers</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-green-500 mb-2">
              Up to 20%
            </div>
            <div className="text-sm sm:text-base text-gray-600">Max Discount</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-blue-500 mb-2">
              ₹2+ Cr
            </div>
            <div className="text-sm sm:text-base text-gray-600">Max Savings</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-purple-500 mb-2">
              Limited
            </div>
            <div className="text-sm sm:text-base text-gray-600">Time Only</div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProperties.map((property, index) => (
            <div 
              key={property.id} 
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition group cursor-pointer relative"
              onClick={() => navigate(`/property/${property.id}`)}
            >
              {/* Offer Badge */}
              <div className="absolute top-3 left-3 z-10">
                <div className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                  {property.badge}
                </div>
              </div>

              {/* Discount Badge */}
              <div className="absolute top-3 right-3 z-10">
                <div className="bg-green-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold flex items-center">
                  <FaPercent className="mr-1" />
                  {property.discount} OFF
                </div>
              </div>

              <div className="relative overflow-hidden">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                  {property.status}
                </div>
              </div>
              
              <div className="p-4 sm:p-5">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{property.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-red-500 flex-shrink-0" />
                  <span className="truncate">{property.location}</span>
                </p>

                {/* Offer Details */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs sm:text-sm text-red-600 font-semibold flex items-center">
                      <FaTag className="mr-1" />
                      {property.offerType}
                    </span>
                    <span className="text-xs text-gray-500">
                      {calculateDaysLeft(property.offerEndDate)} days left
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">{property.offerDescription}</p>
                </div>

                {/* Property Details */}
                <div className="flex items-center justify-between mb-3 sm:mb-4 text-xs sm:text-sm text-gray-600">
                  {property.beds && (
                    <div className="flex items-center">
                      <FaBed className="mr-1 text-red-500" />
                      <span>{property.beds}</span>
                    </div>
                  )}
                  {property.baths && (
                    <div className="flex items-center">
                      <FaBath className="mr-1 text-red-500" />
                      <span>{property.baths}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <FaRulerCombined className="mr-1 text-red-500" />
                    <span className="text-xs sm:text-sm">{property.area}</span>
                  </div>
                </div>
                
                {/* Pricing */}
                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t">
                  <div>
                    <div className="text-sm text-gray-500 line-through">{property.originalPrice}</div>
                    <div className="text-xl sm:text-2xl font-bold text-red-500">{property.offerPrice}</div>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/property/${property.id}`);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition font-semibold"
                  >
                    Grab Offer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <FaTag className="text-gray-300 text-5xl sm:text-6xl mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">No Offers Available</h3>
            <p className="text-gray-600 text-sm sm:text-base">Check back soon for exciting property deals!</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-lg p-6 sm:p-8 text-white text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Don't Miss Out!</h2>
          <p className="text-base sm:text-lg mb-6">
            These exclusive offers are available for a limited time only. Contact us now to secure your dream property.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button 
              onClick={() => navigate('/contact-us')}
              className="bg-white text-red-500 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition text-sm sm:text-base"
            >
              Contact Us Now
            </button>
            <a 
              href="tel:+919354527118"
              className="bg-transparent border-2 border-white text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-white hover:text-red-500 transition text-sm sm:text-base"
            >
              Call: +91-9354527118
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Offers;