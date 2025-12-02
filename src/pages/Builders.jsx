import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaStar, FaBuilding, FaPhone, FaEnvelope } from 'react-icons/fa';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Builders = () => {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState('');
  const [filteredBuilders, setFilteredBuilders] = useState([]);
  const cardsRef = useRef([]);

  const builders = [
    {
      id: 1,
      name: 'Raghav Kumar',
      location: 'Gurgaon, Haryana',
      experience: '10+ Years',
      projects: 50,
      rating: 4.5,
      specialization: 'Residential & Commercial',
      phone: '+91 9354527118',
      email: 'raghav.kumar@realestate.com',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600',
      description: 'Experienced real estate dealer with over 10 years of expertise in delivering quality residential and commercial projects.',
      completedProjects: ['Luxury Villas', 'Modern Apartments', 'Commercial Spaces']
    },
    {
      id: 2,
      name: 'Priya Sharma',
      location: 'New Delhi, Delhi',
      experience: '15+ Years',
      projects: 80,
      rating: 4.8,
      specialization: 'Luxury Residential',
      phone: '+91 124 4567890',
      email: 'priya.sharma@properties.com',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600',
      description: 'Trusted property dealer specializing in luxury residential properties across Delhi NCR.',
      completedProjects: ['Premium Apartments', 'Luxury Penthouses', 'Villa Projects']
    },
    {
      id: 3,
      name: 'Amit Verma',
      location: 'Noida, Uttar Pradesh',
      experience: '12+ Years',
      projects: 65,
      rating: 4.6,
      specialization: 'Sustainable Housing',
      phone: '+91 120 4567890',
      email: 'amit.verma@builders.com',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600',
      description: 'Committed to delivering innovative and sustainable real estate solutions with a focus on eco-friendly projects.',
      completedProjects: ['Green Apartments', 'Eco Villas', 'Smart Homes']
    },
    {
      id: 4,
      name: 'Neha Gupta',
      location: 'Gurgaon, Haryana',
      experience: '8+ Years',
      projects: 45,
      rating: 4.7,
      specialization: 'Affordable & Premium',
      phone: '+91 124 7890123',
      email: 'neha.gupta@realty.com',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600',
      description: 'Building trust through quality properties, specializing in both affordable and premium segments.',
      completedProjects: ['Budget Apartments', 'Premium Flats', 'Residential Plots']
    },
    {
      id: 5,
      name: 'Vikram Singh',
      location: 'Dwarka, New Delhi',
      experience: '20+ Years',
      projects: 120,
      rating: 4.5,
      specialization: 'Premium Residential',
      phone: '+91 11 4567890',
      email: 'vikram.singh@estates.com',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600',
      description: 'Renowned for uncompromising quality and customer satisfaction in premium residential projects.',
      completedProjects: ['Luxury Towers', 'Premium Societies', 'High-Rise Apartments']
    },
    {
      id: 6,
      name: 'Anjali Mehta',
      location: 'Noida, Uttar Pradesh',
      experience: '14+ Years',
      projects: 70,
      rating: 4.6,
      specialization: 'Mixed-Use Development',
      phone: '+91 120 9876543',
      email: 'anjali.mehta@properties.com',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600',
      description: 'Creating landmark projects across residential, commercial, and retail segments with expertise.',
      completedProjects: ['Mixed-Use Complexes', 'Shopping Centers', 'Residential Towers']
    },
    {
      id: 7,
      name: 'Rohit Malhotra',
      location: 'Gurgaon, Haryana',
      experience: '18+ Years',
      projects: 95,
      rating: 4.4,
      specialization: 'Integrated Townships',
      phone: '+91 124 3456789',
      email: 'rohit.malhotra@builders.com',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600',
      description: 'Pioneer in creating integrated lifestyle communities with modern amenities and facilities.',
      completedProjects: ['Township Projects', 'Gated Communities', 'Residential Complexes']
    },
    {
      id: 8,
      name: 'Kavita Reddy',
      location: 'New Delhi, Delhi',
      experience: '16+ Years',
      projects: 85,
      rating: 4.7,
      specialization: 'Luxury & Ultra-Luxury',
      phone: '+91 11 8765432',
      email: 'kavita.reddy@luxury.com',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600',
      description: 'Premier real estate dealer known for luxury and ultra-luxury property projects across Delhi NCR.',
      completedProjects: ['Ultra-Luxury Villas', 'Premium Penthouses', 'Luxury Apartments']
    }
  ];

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
      
      <div className="bg-gradient-to-r from-green-900 to-green-700 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            Find Trusted <span className="text-orange-500">Builders & Dealers</span>
          </h1>
          <p className="text-white text-center mb-8 text-lg">
            Connect with verified builders and dealers across Delhi NCR
          </p>
          
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Search by location (e.g., Gurgaon, Delhi, Noida)"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {filteredBuilders.length} Builder{filteredBuilders.length !== 1 ? 's' : ''} Found
          </h2>
          {searchLocation && (
            <p className="text-gray-600">
              Showing results for: <span className="font-semibold">{searchLocation}</span>
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="text-center py-16">
            <FaBuilding className="text-gray-300 text-6xl mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Builders Found</h3>
            <p className="text-gray-600">Try searching with a different location</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Builders;
