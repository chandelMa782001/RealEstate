import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../Context/AppContext';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { allProperties } from '../../Constant/Constants';

const RecentlyViewed = () => {
  const navigate = useNavigate();
  const { recentlyViewed, isAuthenticated, addToRecentlyViewed, showNotification, setIsLoginModalOpen } = useAppContext();
  const [viewedProperties, setViewedProperties] = useState([]);

  useEffect(() => {
    // Filter properties based on recently viewed IDs
    const filteredProperties = allProperties.filter(property => 
      recentlyViewed.includes(property.id)
    );
    
    // Sort by the order in recentlyViewed array (most recent first)
    const sortedProperties = recentlyViewed.map(id => 
      filteredProperties.find(property => property.id === id)
    ).filter(Boolean);
    
    setViewedProperties(sortedProperties);
  }, [recentlyViewed]);

  const handleViewDetails = (property) => {
    addToRecentlyViewed(property.id);
    navigate(`/property/${property.id}`);
  };

  const handleContactOwner = (property, e) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      showNotification('Please login to contact property owner', 'warning', 3000);
      setTimeout(() => {
        setIsLoginModalOpen(true);
      }, 500);
      return;
    }

    showNotification(`Contacting owner for ${property.title}`, 'success', 2000);
  };

  const clearRecentlyViewed = () => {
    localStorage.removeItem('recentlyViewed');
    setViewedProperties([]);
    showNotification('Recently viewed properties cleared', 'info', 2000);
  };

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Login</h2>
            <p className="text-gray-600 mb-6">You need to be logged in to view your recently viewed properties</p>
            <button 
              onClick={() => setIsLoginModalOpen(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              Login Now
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-gray-800 transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <Link to="/dashboard" className="hover:text-gray-800 transition-colors">Dashboard</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-800 font-medium">Recently Viewed</span>
          </nav>
        </div>
      </div>

      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Recently Viewed Properties</h1>
              <p className="text-gray-300">
                {viewedProperties.length} {viewedProperties.length === 1 ? 'property' : 'properties'} viewed recently
              </p>
            </div>
            {viewedProperties.length > 0 && (
              <button 
                onClick={clearRecentlyViewed}
                className="mt-4 md:mt-0 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {viewedProperties.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-6">👁️</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-4">No Recently Viewed Properties</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Start exploring properties to see them here. Your recently viewed properties will appear in this section.
            </p>
            <Link 
              to="/properties"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors font-medium inline-block"
            >
              Browse Properties
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {viewedProperties.map((property, index) => (
              <div 
                key={property.id}
                onClick={() => handleViewDetails(property)}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition duration-300"
                  />
                  {property.verified && (
                    <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold flex items-center">
                      ✓ VERIFIED
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {property.type}
                  </div>
                  <button className="absolute bottom-3 right-3 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{property.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 flex items-center line-clamp-1">
                    <span className="mr-1">📍</span>
                    {property.location}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
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
                        <span className="text-xl font-bold text-orange-600">{property.price}</span>
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
                        onClick={() => handleViewDetails(property)}
                        className="flex-1 bg-gray-800 hover:bg-gray-900 text-white px-3 py-2 rounded-lg text-sm transition-all duration-200 hover:scale-105 active:scale-95 font-medium"
                      >
                        View Details
                      </button>
                      <button 
                        onClick={(e) => handleContactOwner(property, e)}
                        className="flex-1 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-3 py-2 rounded-lg text-sm transition-all duration-200 relative font-medium"
                      >
                        Contact
                        {!isAuthenticated && (
                          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white"></span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default RecentlyViewed;