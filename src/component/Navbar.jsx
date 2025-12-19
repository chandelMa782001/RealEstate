import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaSearch, FaSignOutAlt } from "react-icons/fa";
import { images } from '../../utils/Image';
import { useAppContext } from '../Context/AppContext';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import PostRequirementModal from './PostRequirementModal';
const Navbar = () => {
  const navigate = useNavigate();
  const { 
    isAuthenticated, 
    user, 
    logout, 
    isLoginModalOpen, 
    setIsLoginModalOpen, 
    isSignupModalOpen, 
    setIsSignupModalOpen 
  } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isTenantsMenuOpen, setIsTenantsMenuOpen] = useState(false);
  const [isOwnersMenuOpen, setIsOwnersMenuOpen] = useState(false);
  const [isPostRequirementOpen, setIsPostRequirementOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Buy');
  const [propertyType, setPropertyType] = useState('Residential');
  const [searchCity, setSearchCity] = useState('');
  const [budgetRange, setBudgetRange] = useState({ min: 30, max: 500 });
  const [showBudgetSlider, setShowBudgetSlider] = useState(false);

  // Close budget slider when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showBudgetSlider && !event.target.closest('.budget-filter-container')) {
        setShowBudgetSlider(false);
      }
    };

    if (showBudgetSlider) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showBudgetSlider]);
  return (
    <nav className="bg-white text-gray-800 shadow-lg sticky top-0 z-[70]">
     
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="flex justify-between items-center">
     
          <Link to="/" className="flex items-center">
            <img src={images.companylogo} alt="Company Logo" className="h-[100px] w-full object-contain" />
          </Link>
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <div 
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <div className="flex items-center text-gray-700 hover:text-orange-500 transition font-medium cursor-pointer whitespace-nowrap text-base">
                Buy in ... 
                <RiArrowDropDownLine 
                  size="2em" 
                  className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
                />
              </div>
              {isDropdownOpen && (
                <div className="absolute left-0  top-full  bg-white text-gray-800 rounded-xl shadow-2xl p-6 w-[700px] z-50 border border-gray-200">
                 
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Explore real estate in...</h2>
                  
                 
                  <div className="flex space-x-4 mb-4 border-b border-gray-200">
                    {['Buy', 'Rent / Lease', 'Plots/Land', 'PG / Co-living'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-2 px-2 text-base font-semibold transition ${
                          activeTab === tab
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

               
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                    {/* Property Type */}
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
                    >
                      <option>Residential</option>
                      <option>Commercial</option>
                      <option>Agricultural</option>
                      <option>Industrial</option>
                    </select>

                    {/* City Search */}
                    <div className="relative">
                      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        type="text"
                        value={searchCity}
                        onChange={(e) => setSearchCity(e.target.value)}
                        placeholder="City Name"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>

                    {/* Budget Filter */}
                    <div className="relative budget-filter-container">
                      <button
                        onClick={() => setShowBudgetSlider(!showBudgetSlider)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm text-left flex items-center justify-between hover:bg-gray-50 transition"
                      >
                        <span className="text-gray-700">
                          ₹{budgetRange.min} Lacs - ₹{budgetRange.max >= 100 ? `${Math.round(budgetRange.max/100)}+ Cr` : `${budgetRange.max} Lacs`}
                        </span>
                        <RiArrowDropDownLine 
                          className={`transition-transform duration-200 ${showBudgetSlider ? 'rotate-180' : 'rotate-0'}`}
                        />
                      </button>
                      
                      {showBudgetSlider && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-[60] min-w-[280px]">
                          <div className="mb-3">
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">Select Price Range</h4>
                            <div className="text-xs text-gray-500 mb-3">
                              ₹{budgetRange.min} Lacs - ₹{budgetRange.max >= 100 ? `${budgetRange.max/100}+ Crores` : `${budgetRange.max} Lacs`}
                            </div>
                          </div>
                          
                          {/* Budget Range Slider */}
                          <div className="relative mb-4">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">₹{budgetRange.min} Lacs</span>
                              <div className="flex-1 relative">
                                <input
                                  type="range"
                                  min="10"
                                  max="500"
                                  step="10"
                                  value={budgetRange.min}
                                  onChange={(e) => setBudgetRange(prev => ({ ...prev, min: parseInt(e.target.value) }))}
                                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
                                  style={{
                                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(budgetRange.min-10)/490*100}%, #e5e7eb ${(budgetRange.min-10)/490*100}%, #e5e7eb 100%)`
                                  }}
                                />
                              </div>
                              <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">₹{budgetRange.max >= 100 ? `${budgetRange.max/100}+ Cr` : `${budgetRange.max} Lacs`}</span>
                            </div>
                            
                            <input
                              type="range"
                              min="20"
                              max="500"
                              step="10"
                              value={budgetRange.max}
                              onChange={(e) => setBudgetRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
                              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
                              style={{
                                background: `linear-gradient(to right, #e5e7eb 0%, #e5e7eb ${(budgetRange.max-20)/480*100}%, #3b82f6 ${(budgetRange.max-20)/480*100}%, #3b82f6 100%)`
                              }}
                            />
                          </div>

                        
                          <div className="grid grid-cols-2 gap-2 mb-3">
                            {[
                              { label: '₹30L - ₹50L', min: 30, max: 50 },
                              { label: '₹50L - ₹1Cr', min: 50, max: 100 },
                              { label: '₹1Cr - ₹2Cr', min: 100, max: 200 },
                              { label: '₹2Cr+', min: 200, max: 500 }
                            ].map((option) => (
                              <button
                                key={option.label}
                                onClick={() => setBudgetRange({ min: option.min, max: option.max })}
                                className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-blue-50 hover:border-blue-300 transition"
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

        
                    <button 
                      onClick={() => navigate('/properties')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition text-sm"
                    >
                      Explore
                    </button>
                  </div>

              
                  <div className="mb-4">
                    <h3 className="text-gray-600 text-base font-semibold mb-3">Continue browsing where you left off...</h3>
                    <div className="flex flex-wrap gap-2">
                      <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition">
                        My properties (2)
                      </button>
                      <button className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full text-sm transition font-semibold">
                        Buy in Western Mumbai
                      </button>
                      <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition">
                        PG in Gurgaon
                      </button>
                      <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition">
                        Buy in Gurgaon
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div className="flex space-x-4">
                      <a href="#" className="text-gray-600 hover:text-blue-600 transition text-base">All India</a>
                      <a href="#" className="text-gray-600 hover:text-blue-600 transition text-base">Dubai</a>
                      <a href="#" className="text-gray-600 hover:text-blue-600 transition text-base">For NRI</a>
                      <a href="#" className="text-gray-600 hover:text-blue-600 transition text-base">
                        International
                        <span className="text-xs text-gray-400 block">Powered by listglobally.com</span>
                      </a>
                    </div>
                    <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center text-base">
                      View top cities
                      <span className="ml-1">→</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
      
            <a href="#" className="text-gray-700 hover:text-orange-500 transition font-medium whitespace-nowrap text-base">For Buyers</a>
            
 
            <div 
              className="relative"
              onMouseEnter={() => setIsTenantsMenuOpen(true)}
              onMouseLeave={() => setIsTenantsMenuOpen(false)}
            >
              <div className="flex items-center text-gray-700 hover:text-orange-500 transition font-medium cursor-pointer whitespace-nowrap text-base">
                For Tenants
                <RiArrowDropDownLine 
                  size="2em" 
                  className={`transition-transform duration-300 ${isTenantsMenuOpen ? 'rotate-180' : 'rotate-0'}`}
                />
              </div>
              {isTenantsMenuOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50">
                  <div className="bg-white text-gray-800 rounded-xl shadow-2xl w-[900px] max-w-[95vw] border border-gray-200 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                      {/* Left Section - Menu Categories */}
                      <div className="col-span-1 md:col-span-3 bg-gray-50 p-4 md:p-6 space-y-4">
                        <div>
                          <h3 className="text-gray-700 font-bold text-sm md:text-base mb-2 uppercase tracking-wide">RENT A HOME</h3>
                        </div>
                        <div>
                          <h3 className="text-gray-700 font-bold text-sm md:text-base mb-2 uppercase tracking-wide">PG/CO-LIVING</h3>
                        </div>
                        <div>
                          <h3 className="text-gray-700 font-bold text-sm md:text-base mb-2 uppercase tracking-wide">COMMERCIAL</h3>
                        </div>
                        <div>
                          <h3 className="text-gray-700 font-bold text-sm md:text-base mb-2 uppercase tracking-wide">POPULAR AREAS</h3>
                        </div>
                        <div>
                          <h3 className="text-blue-600 font-bold text-sm md:text-base mb-2 uppercase tracking-wide flex items-center gap-2">
                            INSIGHTS <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded font-bold">NEW</span>
                          </h3>
                        </div>
                        <div>
                          <h3 className="text-gray-700 font-bold text-sm md:text-base mb-2 uppercase tracking-wide">ARTICLES & NEWS</h3>
                        </div>
                      </div>
                      
                  
                      <div className="col-span-1 md:col-span-5 bg-white p-4 md:p-6">
                        <h3 className="text-gray-500 text-xs font-semibold mb-3 uppercase tracking-wider">PROPERTIES IN DELHI SOUTH WEST</h3>
                        <div className="space-y-2 text-sm">
                          <Link to="/properties" className="block text-gray-700 hover:text-orange-500 transition font-medium">View All Properties</Link>
                          <a href="#" className="block text-gray-700 hover:text-orange-500 transition">Flats</a>
                          <a href="#" className="block text-gray-700 hover:text-orange-500 transition">Builder Floors</a>
                          <a href="#" className="block text-gray-700 hover:text-orange-500 transition">Independent House</a>
                          <a href="#" className="block text-gray-700 hover:text-orange-500 transition">Serviced Apartments</a>
                          <a href="#" className="block text-gray-700 hover:text-orange-500 transition">Studio Apartments/1 RK Flats</a>
                        </div>
                      </div>
                      
                    
                      <div className="col-span-1 md:col-span-4 bg-white p-4 md:p-6 border-l border-gray-100">
                        <div className="mb-6">
                          <h3 className="text-gray-500 text-xs font-semibold mb-3 uppercase tracking-wider">POPULAR SEARCHES</h3>
                          <div className="space-y-2 text-sm">
                            <a href="#" className="block text-gray-700 hover:text-orange-500 transition">Property for rent in Delhi South West</a>
                            <a href="#" className="block text-gray-700 hover:text-orange-500 transition">Verified Property in Delhi South West</a>
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-lg">
                          <div className="flex items-start gap-3">
                            <div className="bg-blue-500 text-white p-2 rounded-lg">
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-800 text-sm mb-1 flex items-center gap-2">
                                INTRODUCING Insights
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                              </h4>
                              <ul className="space-y-1 text-xs text-gray-600">
                                <li className="flex items-center gap-2">
                                  <span className="text-blue-500">✓</span> Understand localities
                                </li>
                                <li className="flex items-center gap-2">
                                  <span className="text-blue-500">✓</span> Read Resident Reviews
                                </li>
                                <li className="flex items-center gap-2">
                                  <span className="text-blue-500">✓</span> Check Price Trends
                                </li>
                                <li className="flex items-center gap-2">
                                  <span className="text-blue-500">✓</span> Tools, Utilities & more
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    

                    <div className="bg-gray-50 px-4 md:px-6 py-2 md:py-3 flex flex-col md:flex-row items-start md:items-center justify-center gap-2 text-xs md:text-sm border-t border-gray-200">
                      <div className="text-gray-600 text-center">
                        <span className="font-semibold">contact us toll free on</span>
                        <span className="ml-2 text-blue-600 font-bold">1800 41 99099</span>
                        <span className="text-gray-400 ml-1">(9AM-11PM IST)</span>
                      </div>
                      <span className="hidden md:inline text-gray-300">|</span>
                      <div className="text-gray-600 text-center">
                        Email us at <a href="mailto:services@99acres.com" className="text-blue-600 hover:underline">services@99acres.com</a>, or call us at <span className="font-semibold">1800 41 99099</span> <span className="text-gray-400">(IND Toll-Free)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
       
            <div 
              className="relative"
              onMouseEnter={() => setIsOwnersMenuOpen(true)}
              onMouseLeave={() => setIsOwnersMenuOpen(false)}
            >
              <div className="flex items-center text-gray-700 hover:text-orange-500 transition font-medium cursor-pointer whitespace-nowrap text-base">
                For Owners
                <RiArrowDropDownLine 
                  size="2em" 
                  className={`transition-transform duration-300 ${isOwnersMenuOpen ? 'rotate-180' : 'rotate-0'}`}
                />
              </div>
              {isOwnersMenuOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50">
                  <div className="bg-white text-gray-800 rounded-xl shadow-2xl w-[850px] max-w-[95vw] border border-gray-200 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                      
                      <div className="col-span-1 md:col-span-3 bg-gray-50 p-4 md:p-6 space-y-3">
                        <div>
                          <h3 className="text-gray-700 font-bold text-sm md:text-base mb-2 uppercase tracking-wide">OWNER OFFERINGS</h3>
                        </div>
                        <div>
                          <h3 className="text-blue-600 font-bold text-sm md:text-base mb-2 uppercase tracking-wide flex items-center gap-2">
                            INSIGHTS <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded font-bold">NEW</span>
                          </h3>
                        </div>
                        <div>
                          <h3 className="text-gray-700 font-bold text-sm md:text-base mb-2 uppercase tracking-wide">ARTICLES & NEWS</h3>
                        </div>
                      </div>
                      
                   
                      <div className="col-span-1 md:col-span-4 bg-white p-4 md:p-6">
                        <h3 className="text-gray-500 text-xs font-semibold mb-3 uppercase tracking-wider">OWNER OFFERINGS</h3>
                        <div className="space-y-2">
                          <Link to="/post-property" className="flex items-center gap-2 text-sm text-gray-700 hover:text-orange-500 transition font-medium">
                            <span>Post Property</span>
                            <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded font-bold">FREE</span>
                          </Link>
                          <a href="#" className="block text-sm text-gray-700 hover:text-orange-500 transition">Owner Services</a>
                          <a href="#" className="block text-sm text-gray-700 hover:text-orange-500 transition">My99acres</a>
                          <a href="#" className="block text-sm text-gray-700 hover:text-orange-500 transition">View Responses</a>
                        </div>
                      </div>
                      
                    
                      <div className="col-span-1 md:col-span-5 bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex-1 text-center md:text-left">
                          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                            Sell or rent faster at<br className="hidden md:block" /> the right price!
                          </h2>
                          <p className="text-sm text-gray-600 mb-4">
                            List your property<br className="hidden md:block" /> now for FREE
                          </p>
                          <Link 
                            to="/post-property"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition shadow-lg text-sm"
                          >
                            Post Property
                          </Link>
                        </div>
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 md:w-32 md:h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-3xl md:text-5xl">
                            👨‍💼
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Bottom Contact Bar */}
                    <div className="bg-gray-50 px-4 md:px-6 py-2 md:py-3 flex flex-col md:flex-row items-start md:items-center justify-center gap-2 text-xs md:text-sm border-t border-gray-200">
                      <div className="text-gray-600 text-center">
                        <span className="font-semibold">contact us toll free on</span>
                        <span className="ml-2 text-blue-600 font-bold">1800 41 99099</span>
                        <span className="text-gray-400 ml-1">(9AM-11PM IST)</span>
                      </div>
                      <span className="hidden md:inline text-gray-300">|</span>
                      <div className="text-gray-600 text-center">
                        Email us at <a href="mailto:services@99acres.com" className="text-blue-600 hover:underline">services@99acres.com</a>, or call us at <span className="font-semibold">1800 41 99099</span> <span className="text-gray-400">(IND Toll-Free)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <Link to="/builders" className="text-gray-700 hover:text-orange-500 transition font-medium whitespace-nowrap text-base">Builders Project</Link>
             <Link to="/dealer/login" className="text-gray-700 hover:text-orange-500 transition font-medium whitespace-nowrap text-base">Dealer Login</Link>
          
          
            <Link to="/post-property" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition whitespace-nowrap text-base inline-block">
              Post property <span className="text-sm">FREE</span>
            </Link>
             <div 
              className="relative"
              onMouseEnter={() => setIsUserMenuOpen(true)}
              onMouseLeave={() => setIsUserMenuOpen(false)}
            >
              <div className="flex items-center space-x-2 hover:opacity-80 transition cursor-pointer">
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center relative">
                  <span className="text-white text-lg"><CgProfile /></span>
                  <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                </div>
                <RiArrowDropDownLine 
                  size="2em" 
                  className={`text-gray-700 transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : 'rotate-0'}`}
                />
              </div>
              {isUserMenuOpen && (
                <div className="absolute  right-0 top-full  pt-2">
                  <div className="bg-white rounded-lg shadow-2xl py-4 w-72 border border-gray-200">
                  {/* User Info or Login Button */}
                  <div className="px-6 py-3 border-b border-gray-200">
                    {isAuthenticated ? (
                      <div>
                        <p className="text-gray-800 font-bold text-lg">Welcome!</p>
                        <p className="text-gray-600 text-sm">{user?.name || user?.email}</p>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setIsLoginModalOpen(true)}
                        className="text-blue-600 cursor-pointer font-bold text-lg hover:text-blue-700 transition"
                      >
                        LOGIN / REGISTER
                      </button>
                    )}
                  </div>
                  
                  <div className="py-2">
                    <Link to="/dashboard" className="block px-6 py-3 text-gray-700 hover:bg-gray-50 transition font-semibold">
                     My Dashboard
                    </Link>
                    <Link 
                      to="/activity" 
                      className="block px-6 py-3 text-gray-700 hover:bg-gray-50 transition"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      My Activity
                    </Link>
                    <Link 
                      to="/recently-viewed" 
                      className="block px-6 py-3 text-gray-700 hover:bg-gray-50 transition"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Recently Searched
                    </Link>
                    <button 
                      onClick={() => {
                        setIsPostRequirementOpen(true);
                        setIsUserMenuOpen(false);
                      }}
                      className="block w-full text-left px-6 py-3 text-gray-700 hover:bg-gray-50 transition"
                    >
                      Post Your Requirement
                    </button>
                    <a href="#" className="block px-6 py-3 text-gray-700 hover:bg-gray-50 transition">
                      Shortlisted
                    </a>
                    <a href="#" className="block px-6 py-3 text-gray-700 hover:bg-gray-50 transition">
                      Contacted
                    </a>
                  </div>
                  
                  <div className="px-6 py-3 border-t border-gray-200">
                    <Link to="/post-property" className="flex items-center justify-between w-full text-gray-800 font-semibold hover:text-orange-500 transition mb-3">
                      <span>Post Property</span>
                      <span className="bg-green-500 text-white text-xs px-3 py-1 rounded font-bold">FREE</span>
                    </Link>
                    
                    {/* Logout Button */}
                    {isAuthenticated && (
                      <button 
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="flex items-center justify-center w-full text-white bg-red-500 hover:bg-red-600 py-2 rounded-lg font-semibold transition"
                      >
                        <FaSignOutAlt className="mr-2" />
                        Logout
                      </button>
                    )}
                  </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-2xl text-gray-800"
          >
            ☰
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-3 pb-4">
            {/* For mobile screen budget */}
{/*   
             <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Search Properties</h3>
         
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm mb-3"
              >
                <option>Residential</option>
                <option>Commercial</option>
                <option>Agricultural</option>
                <option>Industrial</option>
              </select>

             
              <div className="relative mb-3">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  placeholder="Enter City Name"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

             
              <div className="mb-3">
                <button
                  onClick={() => setShowBudgetSlider(!showBudgetSlider)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm text-left flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <span className="text-gray-700">
                    Budget: ₹{budgetRange.min}L - ₹{budgetRange.max >= 100 ? `${Math.round(budgetRange.max/100)}+ Cr` : `${budgetRange.max}L`}
                  </span>
                  <RiArrowDropDownLine 
                    className={`transition-transform duration-200 ${showBudgetSlider ? 'rotate-180' : 'rotate-0'}`}
                  />
                </button>
                
                {showBudgetSlider && (
                  <div className="mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
                    <div className="mb-3">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Select Price Range</h4>
                      <div className="text-xs text-gray-500 mb-3">
                        ₹{budgetRange.min} Lacs - ₹{budgetRange.max >= 100 ? `${Math.round(budgetRange.max/100)}+ Crores` : `${budgetRange.max} Lacs`}
                      </div>
                    </div>
                    
               
                    <div className="space-y-3 mb-4">
                      <div>
                        <label className="text-xs text-gray-600 mb-1 block">Min: ₹{budgetRange.min} Lacs</label>
                        <input
                          type="range"
                          min="10"
                          max="500"
                          step="10"
                          value={budgetRange.min}
                          onChange={(e) => setBudgetRange(prev => ({ ...prev, min: parseInt(e.target.value) }))}
                          className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-600 mb-1 block">Max: ₹{budgetRange.max >= 100 ? `${Math.round(budgetRange.max/100)}+ Cr` : `${budgetRange.max} Lacs`}</label>
                        <input
                          type="range"
                          min="20"
                          max="500"
                          step="10"
                          value={budgetRange.max}
                          onChange={(e) => setBudgetRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
                          className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>
                    </div>

                
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: '₹30L - ₹50L', min: 30, max: 50 },
                        { label: '₹50L - ₹1Cr', min: 50, max: 100 },
                        { label: '₹1Cr - ₹2Cr', min: 100, max: 200 },
                        { label: '₹2Cr+', min: 200, max: 500 }
                      ].map((option) => (
                        <button
                          key={option.label}
                          onClick={() => setBudgetRange({ min: option.min, max: option.max })}
                          className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-blue-50 hover:border-blue-300 transition"
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

          
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition text-sm">
                🔍 Search Properties
              </button>
            </div>  */}

            <Link 
              to="/" 
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-700 hover:text-orange-500 transition py-2"
            >
              Home
            </Link>
            {/* <Link 
              to="/about-us" 
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-700 hover:text-orange-500 transition py-2"
            >
              About Us
            </Link> */}
            <Link 
              to="/projects" 
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-700 hover:text-orange-500 transition py-2"
            >
              Projects
            </Link>
            <Link 
              to="/properties" 
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-700 hover:text-orange-500 transition py-2"
            >
            Properties
            </Link>
            <Link 
              to="/offers" 
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-700 hover:text-orange-500 transition py-2 flex items-center"
            >
               View Offers
             
            </Link>
            <Link 
              to="/builders" 
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-700 hover:text-orange-500 transition py-2"
            >
              Builders
            </Link>
            <Link 
              to="/contact-us" 
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-700 hover:text-orange-500 transition py-2"
            >
              Contact Us
            </Link>
            {isAuthenticated && (
              <>
                <Link 
                  to="/dashboard" 
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-gray-700 hover:text-orange-500 transition py-2"
                >
                  📊 My Dashboard
                </Link>
                <Link 
                  to="/activity" 
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-gray-700 hover:text-orange-500 transition py-2"
                >
                  📈 My Activity
                </Link>
                <Link 
                  to="/recently-viewed" 
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-gray-700 hover:text-orange-500 transition py-2"
                >
                  👁️ Recently Searched
                </Link>
              </>
            )}
            <Link 
              to="/post-property" 
              onClick={() => setIsMenuOpen(false)}
              className="block w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition text-center mt-4"
            >
              Post property FREE
            </Link>
            {!isAuthenticated ? (
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsLoginModalOpen(true);
                }}
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition text-center"
              >
                Login / Register
              </button>
            ) : (
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  logout();
                }}
                className="block w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition text-center"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToSignup={() => {
          setIsLoginModalOpen(false);
          setIsSignupModalOpen(true);
        }}
      />
      
      <SignupModal 
        isOpen={isSignupModalOpen} 
        onClose={() => setIsSignupModalOpen(false)}
        onSwitchToLogin={() => {
          setIsSignupModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
      <PostRequirementModal 
        isOpen={isPostRequirementOpen} 
        onClose={() => setIsPostRequirementOpen(false)}
      />
    </nav>
  );
};
export default Navbar;
