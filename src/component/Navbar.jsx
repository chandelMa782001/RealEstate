import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaSearch, FaSignOutAlt } from "react-icons/fa";
import { images } from '../../utils/Image';
import { useAppContext } from '../Context/AppContext';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

const Navbar = () => {
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
  const [activeTab, setActiveTab] = useState('Buy');
  const [propertyType, setPropertyType] = useState('Residential');
  const [searchCity, setSearchCity] = useState('');
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

               
                  <div className="flex items-center space-x-3 mb-6">
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

                    <div className="flex-1 relative">
                      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        type="text"
                        value={searchCity}
                        onChange={(e) => setSearchCity(e.target.value)}
                        placeholder="City Name"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>

                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition text-sm">
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
            <Link to="/about-us" className="text-gray-700 hover:text-orange-500 transition font-medium whitespace-nowrap text-base">About Us</Link>
            <a href="#" className="text-gray-700 hover:text-orange-500 transition font-medium whitespace-nowrap text-base">For Buyers</a>
            <a href="#" className="text-gray-700 hover:text-orange-500 transition font-medium whitespace-nowrap text-base">For Tenants</a>
            <a href="#" className="text-gray-700 hover:text-orange-500 transition font-medium whitespace-nowrap text-base">For Owners</a>
            <Link to="/builders" className="text-gray-700 hover:text-orange-500 transition font-medium whitespace-nowrap text-base">For Dealers / Builders</Link>
          
          
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition whitespace-nowrap text-base">
              Post property <span className="text-sm">FREE</span>
            </button>
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
                    <a href="#" className="block px-6 py-3 text-gray-700 hover:bg-gray-50 transition">
                      My Activity
                    </a>
                    <a href="#" className="block px-6 py-3 text-gray-700 hover:bg-gray-50 transition">
                      Recently Searched
                    </a>
                    <a href="#" className="block px-6 py-3 text-gray-700 hover:bg-gray-50 transition">
                      Recently Viewed
                    </a>
                    <a href="#" className="block px-6 py-3 text-gray-700 hover:bg-gray-50 transition">
                      Shortlisted
                    </a>
                    <a href="#" className="block px-6 py-3 text-gray-700 hover:bg-gray-50 transition">
                      Contacted
                    </a>
                  </div>
                  
                  <div className="px-6 py-3 border-t border-gray-200">
                    <button className="flex items-center justify-between w-full text-gray-800 font-semibold hover:text-orange-500 transition mb-3">
                      <span>Post Property</span>
                      <span className="bg-green-500 text-white text-xs px-3 py-1 rounded font-bold">FREE</span>
                    </button>
                    
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
          <div className="md:hidden mt-4 space-y-3">
            <a href="#" className="block text-gray-700 hover:text-orange-500 transition">Buy in ...</a>
            <a href="#" className="block text-gray-700 hover:text-orange-500 transition">For Buyers</a>
            <a href="#" className="block text-gray-700 hover:text-orange-500 transition">For Tenants</a>
            <a href="#" className="block text-gray-700 hover:text-orange-500 transition">For Owners</a>
            <Link to="/builders" className="block text-gray-700 hover:text-orange-500 transition">For Dealers / Builders</Link>
            <a href="#" className="block text-gray-700 hover:text-orange-500 transition">Insights</a>
            <button className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition">
              Post property FREE
            </button>
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
    </nav>
  );
};
export default Navbar;
