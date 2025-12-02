import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero = () => {
  const [activeTab, setActiveTab] = useState('Residential');
  const [searchType, setSearchType] = useState('');
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const searchBoxRef = useRef(null);

  const propertyOptions = {
    Residential: ['Villa', 'Apartment', 'Independent House', 'Plot/Land'],
    FLAT: ['1 BHK', '2 BHK', '3 BHK', '4 BHK', 'Studio Apartment'],
    COMMERCIAL: ['Office Space', 'Shops', 'Industrial Land', 'Warehouse'],
    RENT: ['Residential Rent', 'Commercial Rent', 'PG/Hostel', 'Co-living Space']
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchType('');
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
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <div className="flex justify-end space-x-4 mb-12">
        </div>
        <div className="text-center mb-12">
         
          <h1 ref={titleRef} className="text-5xl md:text-6xl font-bold text-white mb-4">
            Fullfil Your <span className="text-orange-500">Trust</span>
          </h1>
          <h2 ref={subtitleRef} className="text-4xl md:text-5xl font-bold text-white">
            To Find Your <span className="text-orange-500">Dream</span> Property
          </h2>
        </div>
        <div ref={searchBoxRef} className="max-w-3xl mx-auto bg-white rounded-lg shadow-2xl p-6">
     
          <div className="flex space-x-2 mb-6">
            <button
              onClick={() => handleTabChange('Residential')}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition ${
                activeTab === 'Residential'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🏠 Residential
            </button>
            <button
              onClick={() => handleTabChange('FLAT')}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition ${
                activeTab === 'FLAT'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🏢 FLAT
            </button>
            <button
              onClick={() => handleTabChange('COMMERCIAL')}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition ${
                activeTab === 'COMMERCIAL'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🏪 COMMERCIAL
            </button>
            <button
              onClick={() => handleTabChange('RENT')}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition ${
                activeTab === 'RENT'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🔑 RENT
            </button>
          </div>

       
          <div className="flex space-x-2">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-800 font-medium text-base cursor-pointer hover:border-orange-400 transition-all appearance-none bg-no-repeat bg-right pr-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23f97316' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundPosition: 'right 0.5rem center',
                backgroundSize: '1.5em 1.5em'
              }}
            >
              <option value="" disabled className="text-gray-400">Select Property Type</option>
              {propertyOptions[activeTab].map((option) => (
                <option key={option} value={option} className="py-2 text-gray-800 hover:bg-orange-50">
                  {option}
                </option>
              ))}
            </select>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-all hover:shadow-lg hover:scale-105">
              🔍 Search
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
    </div>
  );
};
export default Hero;
