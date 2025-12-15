import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import LoanButton from './LoanButton';
import "../component/Hero.css"

const Hero = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Buy');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState({
    'Flat/Apartment': false,
    'Independent/Builder Floor': false,
    'Independent House/Villa': false,
    'Residential Land': false,
    '1 RK/ Studio Apartment': false,
    'Farm House': false,
    'Serviced Apartments': false,
    'Other': false
  });
  const [showPropertyTypes, setShowPropertyTypes] = useState(false);
  const [showBudgetDropdown, setShowBudgetDropdown] = useState(false);
  const [showBedroomDropdown, setShowBedroomDropdown] = useState(false);
  const [showConstructionDropdown, setShowConstructionDropdown] = useState(false);
  const [showPostedByDropdown, setShowPostedByDropdown] = useState(false);
  const [budgetRange, setBudgetRange] = useState({ min: 0, max: 100 });
  const [selectedBedroom, setSelectedBedroom] = useState('Bedroom');
  const [selectedConstruction, setSelectedConstruction] = useState('Construction Status');
  const [selectedPostedBy, setSelectedPostedBy] = useState('Posted By');
  const [isLoanButtonVisible, setIsLoanButtonVisible] = useState(true);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const searchBoxRef = useRef(null);

  const tabs = ['Buy', 'Rent', 'New Launch', 'Commercial', 'Plots/Land', 'Projects', 'Post Property'];
  
  // Budget range values in crores
  const budgetValues = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const formatBudgetValue = (value) => {
    if (value === 0) return '0';
    if (value >= 100) return '100+ Crores';
    return `${value} Crores`;
  };
  const bedroomOptions = ['1 RK', '1 BHK', '2 BHK', '3 BHK', '4 BHK', '4+ BHK'];
  const constructionOptions = ['New Launch', 'Under Construction', 'Ready to Move'];
  const postedByOptions = ['Owner', 'Dealer', 'Builder'];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Reset property types when changing tabs
    setSelectedPropertyTypes({
      'Flat/Apartment': false,
      'Independent/Builder Floor': false,
      'Independent House/Villa': false,
      'Residential Land': false,
      '1 RK/ Studio Apartment': false,
      'Farm House': false,
      'Serviced Apartments': false,
      'Other': false
    });
    setShowPropertyTypes(false);
  };

  const handlePropertyTypeChange = (type) => {
    setSelectedPropertyTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleMinBudgetChange = (e) => {
    const value = parseInt(e.target.value);
    setBudgetRange(prev => ({
      ...prev,
      min: Math.min(value, prev.max)
    }));
  };

  const handleMaxBudgetChange = (e) => {
    const value = parseInt(e.target.value);
    setBudgetRange(prev => ({
      ...prev,
      max: Math.max(value, prev.min)
    }));
  };

  const getSelectedBudgetDisplay = () => {
    if (budgetRange.min === 0 && budgetRange.max === 100) {
      return 'Budget';
    }
    const minText = budgetRange.min === 0 ? '0' : `${budgetRange.min} Cr`;
    const maxText = budgetRange.max >= 100 ? '100+ Cr' : `${budgetRange.max} Cr`;
    return `₹${minText} - ₹${maxText}`;
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
    }
    
    // Add selected property types
    const selectedTypes = Object.keys(selectedPropertyTypes).filter(type => selectedPropertyTypes[type]);
    if (selectedTypes.length > 0) {
      params.set('propertyTypes', selectedTypes.join(','));
    }
    
    // Add budget range
    if (budgetRange.min !== 0 || budgetRange.max !== 100) {
      params.set('budgetMin', budgetRange.min.toString());
      params.set('budgetMax', budgetRange.max.toString());
    }
    if (selectedBedroom !== 'Bedroom') {
      params.set('bedroom', selectedBedroom);
    }
    if (selectedConstruction !== 'Construction Status') {
      params.set('construction', selectedConstruction);
    }
    if (selectedPostedBy !== 'Posted By') {
      params.set('postedBy', selectedPostedBy);
    }
    
    navigate(`/projects?${params.toString()}`);
  };

  const handleKeyDown = (e) => {
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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setShowPropertyTypes(false);
        setShowBudgetDropdown(false);
        setShowBedroomDropdown(false);
        setShowConstructionDropdown(false);
        setShowPostedByDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleHeroClick = (e) => {
    setIsLoanButtonVisible(false);
  };

  return (
    <div className="relative min-h-screen" onClick={handleHeroClick}>
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-green-700/50"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-8 xs:py-12 sm:py-16 md:py-20 hero-container">
        <div className="text-center mb-8 sm:mb-12">
          <h1 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 px-2">
            Fulfill Your <span className="text-orange-500">Trust</span>
          </h1>
          <h2 ref={subtitleRef} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white px-2">
            To Find Your <span className="text-orange-500">Dream</span> Property
          </h2>
        </div>
        
        {/* Modern Search Container */}
        <div 
          ref={searchBoxRef} 
          className="max-w-7xl mx-auto bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-visible hero-search-container"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Tab Navigation */}
          <div className="flex flex-wrap border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`flex-1 min-w-0 px-1 xs:px-2 sm:px-4 lg:px-6 py-2 xs:py-3 sm:py-4 text-xs xs:text-xs sm:text-sm lg:text-base font-semibold transition-all relative ${
                  activeTab === tab
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <span className="block truncate">{tab}</span>
                {tab === 'New Launch' && (
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full"></span>
                )}
                {tab === 'Post Property' && (
                  <span className="hidden xs:inline ml-1 px-1 sm:px-1.5 py-0.5 text-xs bg-green-500 text-white rounded">FREE</span>
                )}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                )}
              </button>
            ))}
          </div>

          <div className="p-3 xs:p-4 sm:p-6 relative">
            {/* Property Type Selector and Search */}
            <div className="flex flex-col gap-3 sm:gap-4 mb-4">
              {/* Top Row: Property Type and Search */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {/* Property Type Dropdown */}
                <div className="relative dropdown-container">
                  <button
                    onClick={() => setShowPropertyTypes(!showPropertyTypes)}
                    className="flex items-center justify-between w-full sm:w-auto sm:min-w-48 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-xs sm:text-sm font-medium text-gray-700">All Residential</span>
                    <svg className={`w-4 h-4 transition-transform ${showPropertyTypes ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {/* Search Input */}
                <div className="flex-1 relative">
                  <div className="relative">
                    <svg className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder='Search "Farm house in Punjab below 1 cr"'
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="w-full pl-10 sm:pl-12 pr-16 sm:pr-20 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs sm:text-sm"
                    />
                    <div className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-1 sm:space-x-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </button>
                      <button className="hidden sm:block p-1 hover:bg-gray-100 rounded">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  className="px-4 sm:px-8 py-2.5 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-xs sm:text-sm w-full sm:w-auto"
                >
                  Search
                </button>
              </div>
            </div>
            {/* Property Type Checkboxes */}
            {showPropertyTypes && (
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Property Type</h3>
                  <button
                    onClick={() => setShowPropertyTypes(false)}
                    className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium"
                  >
                    Clear
                  </button>
                </div>
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                  {Object.keys(selectedPropertyTypes).map((type) => (
                    <label key={type} className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-white rounded transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedPropertyTypes[type]}
                        onChange={() => handlePropertyTypeChange(type)}
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-xs sm:text-sm text-gray-700 leading-tight">{type}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-3 text-xs text-gray-500">
                  Looking for commercial properties? <button className="text-blue-600 hover:underline">Click here</button>
                </div>
              </div>
            )}

            {/* Filter Dropdowns - Hidden on mobile, visible on desktop */}
            <div className="hidden lg:flex flex-wrap gap-2 sm:gap-3 relative z-10">
              {/* Budget Filter */}
              <div className="relative dropdown-container">
                <button
                  onClick={() => {
                    setShowBudgetDropdown(!showBudgetDropdown);
                    // Close other dropdowns
                    setShowBedroomDropdown(false);
                    setShowConstructionDropdown(false);
                    setShowPostedByDropdown(false);
                  }}
                  className="flex items-center justify-between px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-w-24 sm:min-w-32"
                >
                  <span className="text-xs sm:text-sm text-gray-700 truncate">{getSelectedBudgetDisplay()}</span>
                  <svg className={`w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 transition-transform ${showBudgetDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showBudgetDropdown && (
                  <div 
                    className="budget-dropdown"
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '0',
                      marginTop: '8px',
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                      zIndex: 9999,
                      width: '380px',
                      padding: '20px'
                    }}
                  >
                    <div>
                      <h3 className="font-semibold text-gray-800 text-base mb-4">Select Price Range</h3>
                      
                      {/* Budget Range Display */}
                      <div className="mb-6">
                        <div className="text-sm text-gray-600 mb-2">
                          ₹{formatBudgetValue(budgetRange.min)} - ₹{formatBudgetValue(budgetRange.max)}
                        </div>
                      </div>

                      {/* Dual Range Slider */}
                      <div className="relative mb-8">
                        <div className="flex items-center justify-between mb-4">
                          {/* Min Value Input */}
                          <div className="flex items-center bg-blue-900 text-white px-3 py-1 rounded text-sm font-medium">
                            {budgetRange.min}
                          </div>
                          
                          {/* Max Value Input */}
                          <div className="flex items-center bg-blue-900 text-white px-3 py-1 rounded text-sm font-medium">
                            {budgetRange.max}+ Crores
                          </div>
                        </div>

                        {/* Range Slider Track */}
                        <div className="relative">
                          <div className="h-2 bg-gray-200 rounded-full relative">
                            {/* Active Range */}
                            <div 
                              className="absolute h-2 bg-blue-500 rounded-full"
                              style={{
                                left: `${(budgetRange.min / 100) * 100}%`,
                                width: `${((budgetRange.max - budgetRange.min) / 100) * 100}%`
                              }}
                            ></div>
                          </div>
                          
                          {/* Min Range Input */}
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={budgetRange.min}
                            onChange={handleMinBudgetChange}
                            className="absolute top-0 left-0 w-full h-2 bg-transparent appearance-none cursor-pointer range-slider"
                            style={{ zIndex: 1 }}
                          />
                          
                          {/* Max Range Input */}
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={budgetRange.max}
                            onChange={handleMaxBudgetChange}
                            className="absolute top-0 left-0 w-full h-2 bg-transparent appearance-none cursor-pointer range-slider"
                            style={{ zIndex: 2 }}
                          />
                        </div>
                      </div>

                      {/* Apply Button */}
                      <div className="flex justify-end">
                        <button
                          onClick={() => setShowBudgetDropdown(false)}
                          className="px-6 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bedroom Filter */}
              <div className="relative dropdown-container">
                <button
                  onClick={() => {
                    setShowBedroomDropdown(!showBedroomDropdown);
                    // Close other dropdowns
                    setShowBudgetDropdown(false);
                    setShowConstructionDropdown(false);
                    setShowPostedByDropdown(false);
                  }}
                  className="flex items-center justify-between px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-w-24 sm:min-w-32"
                >
                  <span className="text-xs sm:text-sm text-gray-700 truncate">{selectedBedroom}</span>
                  <svg className={`w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 transition-transform ${showBedroomDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showBedroomDropdown && (
                  <div 
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '0',
                      marginTop: '8px',
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                      zIndex: 9999,
                      minWidth: '160px'
                    }}
                  >
                    {bedroomOptions.map((option, index) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSelectedBedroom(option);
                          setShowBedroomDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-3 hover:bg-blue-50 text-sm text-gray-700 transition-colors ${
                          index === 0 ? 'rounded-t-lg' : ''
                        } ${index === bedroomOptions.length - 1 ? 'rounded-b-lg' : ''}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Construction Status Filter */}
              <div className="relative dropdown-container">
                <button
                  onClick={() => {
                    setShowConstructionDropdown(!showConstructionDropdown);
                    // Close other dropdowns
                    setShowBudgetDropdown(false);
                    setShowBedroomDropdown(false);
                    setShowPostedByDropdown(false);
                  }}
                  className="flex items-center justify-between px-2 sm:px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-w-28 sm:min-w-40"
                >
                  <span className="text-xs sm:text-sm text-gray-700 truncate">{selectedConstruction}</span>
                  <svg className={`w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 transition-transform ${showConstructionDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showConstructionDropdown && (
                  <div 
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '0',
                      marginTop: '8px',
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                      zIndex: 9999,
                      minWidth: '180px'
                    }}
                  >
                    {constructionOptions.map((option, index) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSelectedConstruction(option);
                          setShowConstructionDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-3 hover:bg-blue-50 text-sm text-gray-700 transition-colors ${
                          index === 0 ? 'rounded-t-lg' : ''
                        } ${index === constructionOptions.length - 1 ? 'rounded-b-lg' : ''}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Posted By Filter */}
              <div className="relative dropdown-container">
                <button
                  onClick={() => {
                    setShowPostedByDropdown(!showPostedByDropdown);
                    // Close other dropdowns
                    setShowBudgetDropdown(false);
                    setShowBedroomDropdown(false);
                    setShowConstructionDropdown(false);
                  }}
                  className="flex items-center justify-between px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-w-24 sm:min-w-32"
                >
                  <span className="text-xs sm:text-sm text-gray-700 truncate">{selectedPostedBy}</span>
                  <svg className={`w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 transition-transform ${showPostedByDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showPostedByDropdown && (
                  <div 
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '0',
                      marginTop: '8px',
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                      zIndex: 9999,
                      minWidth: '140px'
                    }}
                  >
                    {postedByOptions.map((option, index) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSelectedPostedBy(option);
                          setShowPostedByDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-3 hover:bg-blue-50 text-sm text-gray-700 transition-colors ${
                          index === 0 ? 'rounded-t-lg' : ''
                        } ${index === postedByOptions.length - 1 ? 'rounded-b-lg' : ''}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>


      </div>
      <LoanButton isVisible={isLoanButtonVisible} />
    </div>
  );
};

export default Hero;
