import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../Context/AppContext';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { Filter, usePropertyFilter } from '../component/FIlter';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Properties.css';
gsap.registerPlugin(ScrollTrigger);
const Properties = () => {
  const navigate = useNavigate();
  const { showNotification, isAuthenticated, setIsLoginModalOpen } = useAppContext();
  const { filteredProperties, filters, handleFilterChange, clearFilters } = usePropertyFilter();
  const [showFilters, setShowFilters] = useState(false);

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
  }, [filteredProperties]);



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

  const handleContactOwner = (property, e) => {
    e.stopPropagation();
    
    // Check if user is authenticated using the existing context
    if (!isAuthenticated) {
      showNotification('Please login to contact property owner', 'warning', 3000);
      setTimeout(() => {
        setIsLoginModalOpen(true);
      }, 500);
      return;
    }

    // If authenticated, show contact details or open contact modal
    showNotification(`Contacting owner for ${property.title}`, 'success', 2000);
    // Here you would typically open a contact modal or show contact details
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      

      
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-2 sm:py-3">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-xs sm:text-sm text-gray-600">
            <span className='cursor-pointer hover:text-gray-800 transition-colors' onClick={()=>navigate('/') }>Home</span>
            <span className="mx-1 sm:mx-2">›</span>
            <span className="text-gray-800 font-medium">Properties</span>
          </nav>
        </div>
      </div>

      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl md:text-4xl font-bold mb-2">All Properties</h1>
              <p className="text-gray-300 text-sm md:text-base">
                {filteredProperties.length} results | Flats, Villas & More for Sale
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="bg-blue-600 px-4 py-2 rounded-lg flex items-center">
                <span className="text-sm">📍 Get to know more about Delhi NCR</span>
                <button className="ml-2 text-blue-200 hover:text-white text-sm">View Insights →</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <Filter 
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
            showFilters={showFilters}
            onToggleFilters={() => setShowFilters(!showFilters)}
          />

          {/* Properties Grid */}
          <div className="lg:w-3/4">
            {/* Sort and View Options */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 bg-white p-4 rounded-lg shadow gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-2 sm:gap-0">
                <span className="text-sm text-gray-600 font-medium">Sort by:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
              <div className="flex items-center justify-center sm:justify-end space-x-2">
                <span className="text-xs text-gray-500 mr-2">View:</span>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 bg-orange-50 border-orange-300 transition-colors">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Properties Grid */}
            <div className="properties-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {filteredProperties.map((property, index) => (
                <div 
                  key={property.id}
                  ref={(el) => (cardsRef.current[index] = el)}
                  onClick={(e) => handleViewDetails(property, e)}
                  className="property-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition duration-300"
                    />
                    {property.verified && (
                      <div className="verified-badge absolute top-2 left-2 sm:top-3 sm:left-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold flex items-center">
                        ✓ VERIFIED
                      </div>
                    )}
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-orange-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                      {property.type}
                    </div>
                    <button className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-white bg-opacity-80 hover:bg-opacity-100 p-1.5 sm:p-2 rounded-full transition-all">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="p-3 sm:p-4">
                    <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 line-clamp-2">{property.title}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm mb-3 flex items-center line-clamp-1">
                      <span className="mr-1">📍</span>
                      {property.location}
                    </p>
                    
                    <div className="flex items-center justify-between mb-3 text-xs sm:text-sm text-gray-600">
                      {property.beds && <span className="flex items-center"><span className="mr-1">🛏️</span>{property.beds} BHK</span>}
                      {property.baths && <span className="flex items-center"><span className="mr-1">🚿</span>{property.baths} Baths</span>}
                      <span className="flex items-center"><span className="mr-1">📐</span>{property.area}</span>
                    </div>

                    {/* Highlights */}
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {property.highlights.slice(0, 2).map((highlight, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded truncate">
                            {highlight}
                          </span>
                        ))}
                        {property.highlights.length > 2 && (
                          <span className="text-xs text-gray-500">+{property.highlights.length - 2}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="price-highlight text-lg sm:text-xl font-bold">{property.price}</span>
                          <p className="text-xs text-gray-500">{property.status}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">
                            ₹{Math.round(property.priceValue / parseInt(property.area.replace(/[^\d]/g, '')))}/sqft
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={(e) => handleViewDetails(property, e)}
                          className="flex-1 bg-gray-800 hover:bg-gray-900 text-white px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm transition-all duration-200 hover:scale-105 active:scale-95 font-medium"
                        >
                          View Details
                        </button>
                        <button 
                          onClick={(e) => handleContactOwner(property, e)}
                          className="flex-1 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm transition-all duration-200 relative font-medium"
                        >
                          Contact
                          {!isAuthenticated && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full border border-white"></span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredProperties.length === 0 && (
              <div className="text-center py-8 sm:py-12 px-4">
                <div className="text-gray-400 text-4xl sm:text-6xl mb-4">🏠</div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">No properties found</h3>
                <p className="text-sm sm:text-base text-gray-500 mb-4 max-w-md mx-auto">Try adjusting your filters to see more results</p>
                <button 
                  onClick={clearFilters}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors font-medium min-h-[44px]"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default Properties;