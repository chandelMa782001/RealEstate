import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../Context/AppContext';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { allProperties } from '../../Constant/Constants';

const Shortlisted = () => {
  const navigate = useNavigate();
  const { 
    favorites, 
    isAuthenticated, 
    addToRecentlyViewed, 
    showNotification, 
    setIsLoginModalOpen,
    removeFromFavorites 
  } = useAppContext();
  const [shortlistedProperties, setShortlistedProperties] = useState([]);
  const [sortBy, setSortBy] = useState('recent');

  useEffect(() => {
    // Filter properties based on favorites
    const filteredProperties = allProperties.filter(property => 
      favorites.includes(property.id)
    );
    
    // Sort properties based on selected option
    let sortedProperties = [...filteredProperties];
    switch (sortBy) {
      case 'price-low':
        sortedProperties.sort((a, b) => a.priceValue - b.priceValue);
        break;
      case 'price-high':
        sortedProperties.sort((a, b) => b.priceValue - a.priceValue);
        break;
      case 'area':
        sortedProperties.sort((a, b) => {
          const aArea = parseInt(a.area.replace(/[^\d]/g, ''));
          const bArea = parseInt(b.area.replace(/[^\d]/g, ''));
          return bArea - aArea;
        });
        break;
      default:
        // Keep original order (most recent first)
        break;
    }
    
    setShortlistedProperties(sortedProperties);
  }, [favorites, sortBy]);

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

  const handleRemoveFromShortlist = (propertyId, e) => {
    e.stopPropagation();
    removeFromFavorites(propertyId);
    showNotification('Property removed from shortlist', 'info', 2000);
  };

  const clearAllShortlisted = () => {
    favorites.forEach(id => removeFromFavorites(id));
    showNotification('All shortlisted properties cleared', 'info', 2000);
  };

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <div className="text-6xl mb-4">❤️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Login</h2>
            <p className="text-gray-600 mb-6">You need to be logged in to view your shortlisted properties</p>
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
            <span className="text-gray-800 font-medium">Shortlisted Properties</span>
          </nav>
        </div>
      </div>

      {/* Header Section */}
      <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center">
                <span className="mr-3">❤️</span>
                Shortlisted Properties
              </h1>
              <p className="text-red-100">
                {shortlistedProperties.length} {shortlistedProperties.length === 1 ? 'property' : 'properties'} in your wishlist
              </p>
            </div>
            {shortlistedProperties.length > 0 && (
              <div className="mt-4 md:mt-0 flex gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-medium border-0 focus:ring-2 focus:ring-red-300"
                >
                  <option value="recent">Most Recent</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="area">Area: Largest First</option>
                </select>
                <button 
                  onClick={clearAllShortlisted}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {shortlistedProperties.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-6">💔</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-4">No Shortlisted Properties</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              You haven't shortlisted any properties yet. Start exploring and save your favorite properties to see them here.
            </p>
            <Link 
              to="/properties"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors font-medium inline-block"
            >
              Browse Properties
            </Link>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-red-500">
                <div className="flex items-center">
                  <div className="text-2xl mr-3">❤️</div>
                  <div>
                    <p className="text-sm text-gray-600">Total Shortlisted</p>
                    <p className="text-xl font-bold text-gray-800">{shortlistedProperties.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
                <div className="flex items-center">
                  <div className="text-2xl mr-3">✅</div>
                  <div>
                    <p className="text-sm text-gray-600">Verified Properties</p>
                    <p className="text-xl font-bold text-gray-800">
                      {shortlistedProperties.filter(p => p.verified).length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
                <div className="flex items-center">
                  <div className="text-2xl mr-3">🏠</div>
                  <div>
                    <p className="text-sm text-gray-600">Ready to Move</p>
                    <p className="text-xl font-bold text-gray-800">
                      {shortlistedProperties.filter(p => p.status === 'Ready To Move').length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-orange-500">
                <div className="flex items-center">
                  <div className="text-2xl mr-3">💰</div>
                  <div>
                    <p className="text-sm text-gray-600">Avg. Price</p>
                    <p className="text-xl font-bold text-gray-800">
                      ₹{Math.round(shortlistedProperties.reduce((sum, p) => sum + p.priceValue, 0) / shortlistedProperties.length / 100000) / 10}L
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {shortlistedProperties.map((property, index) => (
                <div 
                  key={property.id}
                  onClick={() => handleViewDetails(property)}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer relative"
                >
                  {/* Remove from shortlist button */}
                  <button
                    onClick={(e) => handleRemoveFromShortlist(property.id, e)}
                    className="absolute top-3 left-3 z-10 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                    title="Remove from shortlist"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="relative overflow-hidden">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition duration-300"
                    />
                    {property.verified && (
                      <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold flex items-center">
                        ✓ VERIFIED
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {property.type}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-red-500 text-white p-2 rounded-full">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </div>
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

            {/* Quick Actions */}
            <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  to="/properties"
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors"
                >
                  <span className="text-2xl">🔍</span>
                  <div>
                    <h4 className="font-medium text-gray-800">Browse More</h4>
                    <p className="text-gray-600 text-sm">Discover more properties to shortlist</p>
                  </div>
                </Link>
                
                <Link
                  to="/recently-viewed"
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors"
                >
                  <span className="text-2xl">👁️</span>
                  <div>
                    <h4 className="font-medium text-gray-800">Recently Viewed</h4>
                    <p className="text-gray-600 text-sm">Check your recently viewed properties</p>
                  </div>
                </Link>
                
                <Link
                  to="/activity"
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors"
                >
                  <span className="text-2xl">📊</span>
                  <div>
                    <h4 className="font-medium text-gray-800">My Activity</h4>
                    <p className="text-gray-600 text-sm">View your complete activity history</p>
                  </div>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Shortlisted;