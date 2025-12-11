import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import LoanButton from './LoanButton';
import "../component/Hero.css"
const Hero = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Residential');
  const [searchType, setSearchType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPropertyDropdown, setShowPropertyDropdown] = useState(false);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const searchBoxRef = useRef(null);

  const propertyOptions = {
    Residential: ['Villa', 'Apartment', 'Independent House', 'Plot/Land'],
    INDUSTRIAL: ['Industrial Land', 'Factory Space', 'Warehouse', 'Manufacturing Unit', 'Industrial Plot'],
    COMMERCIAL: ['Office Space', 'Shops', 'Retail Space', 'Commercial Plot'],
    RENT: ['Residential Rent', 'Commercial Rent', 'PG/Hostel', 'Co-living Space']
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchType('');
    setShowPropertyDropdown(false);
  };

  const handlePropertySelect = (option) => {
    setSearchType(option);
   
    setShowPropertyDropdown(false);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
    }
    
    if (searchType && searchType !== searchQuery) {
      // Map property types to filter categories
      const typeMapping = {
        'Villa': 'Villa',
        'Apartment': 'Apartment',
        'Independent House': 'Villa',
        'Plot/Land': 'Plot',
        '1 BHK': 'Apartment',
        '2 BHK': 'Apartment',
        '3 BHK': 'Apartment',
        '4 BHK': 'Apartment',
        'Studio Apartment': 'Apartment',
        'Office Space': 'Commercial',
        'Shops': 'Commercial',
        'Retail Space': 'Commercial',
        'Commercial Plot': 'Commercial',
        'Industrial Land': 'Plot',
        'Factory Space': 'Commercial',
        'Warehouse': 'Commercial',
        'Manufacturing Unit': 'Commercial',
        'Industrial Plot': 'Plot',
        'Residential Rent': 'Apartment',
        'Commercial Rent': 'Commercial',
        'PG/Hostel': 'Apartment',
        'Co-living Space': 'Apartment'
      };
      
      const mappedType = typeMapping[searchType] || searchType;
      params.set('type', mappedType);
    }
    
    // navigate(`/projects?${params.toString()}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo(
      subtitleRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo(
      searchBoxRef.current,
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.2)' },
      '-=0.4'
    );
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showPropertyDropdown && !event.target.closest('.property-dropdown-container')) {
        setShowPropertyDropdown(false);
      }
    };

    if (showPropertyDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPropertyDropdown]);

  return (
    <div className="relative min-h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-green-700/50"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="flex justify-end space-x-4 mb-8 sm:mb-12">
        </div>
        <div className="text-center mb-8 sm:mb-12">
         
          <h1 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 px-2">
            Fullfil Your <span className="text-orange-500">Trust</span>
          </h1>
          <h2 ref={subtitleRef} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white px-2">
            To Find Your <span className="text-orange-500">Dream</span> Property
          </h2>
        </div>
        <div ref={searchBoxRef} className="max-w-3xl mx-auto bg-white rounded-lg shadow-2xl p-4 sm:p-6">
     
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-4 sm:mb-6">
            <button
              onClick={() => handleTabChange('Residential')}
              className={`flex-1 py-2 sm:py-3 px-3 sm:px-6 rounded-lg text-sm sm:text-base font-semibold transition ${
                activeTab === 'Residential'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Residential
            </button>
            <button
              onClick={() => handleTabChange('INDUSTRIAL')}
              className={`flex-1 py-2 sm:py-3 px-3 sm:px-6 rounded-lg text-sm sm:text-base font-semibold transition ${
                activeTab === 'INDUSTRIAL'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              INDUSTRIAL
            </button>
            <button
              onClick={() => handleTabChange('COMMERCIAL')}
              className={`flex-1 py-2 sm:py-3 px-3 sm:px-6 rounded-lg text-sm sm:text-base font-semibold transition ${
                activeTab === 'COMMERCIAL'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
             COMMERCIAL
            </button>
            <button
              onClick={() => handleTabChange('RENT')}
              className={`flex-1 py-2 sm:py-3 px-3 sm:px-6 rounded-lg text-sm sm:text-base font-semibold transition ${
                activeTab === 'RENT'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
             RENT
            </button>
          </div>
          {/* Enhanced Search Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-4">
            {/* Property Type Dropdown with Search Integration */}
            <div className="relative property-dropdown-container">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowPropertyDropdown(!showPropertyDropdown)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-800 font-medium text-sm sm:text-base cursor-pointer hover:border-orange-400 transition-all text-left flex items-center justify-between shadow-sm"
                >
                  <span className={searchType ? 'text-gray-800' : 'text-gray-400'}>
                    {searchType || 'Select Property Type'}
                  </span>
                  <svg 
                    className={`w-5 h-5 text-orange-500 transition-transform duration-200 ${showPropertyDropdown ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showPropertyDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-gray-200 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
                    <div className="p-2">
                      {propertyOptions[activeTab].map((option) => (
                        <button
                          key={option}
                          onClick={() => handlePropertySelect(option)}
                          className="w-full text-left px-3 py-2 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition text-sm font-medium text-gray-700 flex items-center space-x-2"
                        >
                          <span>🏠</span>
                          <span>{option}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Search Input */}
            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search....."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-3 pl-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base bg-white shadow-sm hover:border-orange-400 transition-all"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Enhanced Search Button */}
            <button 
              onClick={handleSearch}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 sm:px-8 py-3 rounded-lg text-sm sm:text-base font-semibold transition-all hover:shadow-lg hover:scale-105 flex items-center justify-center space-x-2 shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Search Properties</span>
            </button>
          </div>


        </div>
        <div className="mt-16 flex justify-center">
          <div className="text-gray-700 opacity-50">
            <svg className="w-32 h-32" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 20 L70 35 L70 50 L50 65 L30 50 L30 35 Z M50 35 A10 10 0 1 1 50 55 A10 10 0 1 1 50 35" />
            </svg>
          </div>
        </div>
      </div>
      <LoanButton />
    </div>
  );
};
export default Hero;
