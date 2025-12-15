import React from 'react';
import './Filter.css';

const Filter = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  showFilters, 
  onToggleFilters 
}) => {
  return (
    <>
 
      <div className="lg:hidden mb-6">
        <button
          onClick={onToggleFilters}
          className="w-full bg-white border border-gray-300 rounded-lg p-4 flex items-center justify-between shadow-sm"
        >
          <span className="font-medium text-gray-700">Filters</span>
          <svg 
            className={`w-5 h-5 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:sticky lg:top-4 filter-sidebar">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Applied Filters</h3>
            <button 
              onClick={onClearFilters}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Clear All
            </button>
          </div>

          {/* Hide already seen toggle */}
          <div className="mb-6 p-3 bg-blue-50 rounded-lg hidden lg:block">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Hide already seen</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>        
  {/* Property Type Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property Type
            </label>
            <select
              value={filters.propertyType}
              onChange={(e) => onFilterChange('propertyType', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="Apartment">Flat/Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Plot">Plot</option>
              <option value="Commercial">Commercial</option>
              <option value="Penthouse">Penthouse</option>
            </select>
          </div>

          {/* Budget Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget
            </label>
            <select
              value={filters.priceRange}
              onChange={(e) => onFilterChange('priceRange', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Any Budget</option>
              <option value="0-5000000">Under ₹50 Lac</option>
              <option value="5000000-10000000">₹50 Lac - ₹1 Cr</option>
              <option value="10000000-50000000">₹1 Cr - ₹5 Cr</option>
              <option value="50000000-999999999">Above ₹5 Cr</option>
            </select>
          </div>

          {/* Bedrooms Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bedrooms
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5].map(bed => (
                <button
                  key={bed}
                  onClick={() => onFilterChange('beds', filters.beds === bed.toString() ? '' : bed.toString())}
                  className={`p-3 sm:p-2 rounded-lg border text-sm font-medium transition-all min-h-[44px] ${
                    filters.beds === bed.toString()
                      ? 'bg-orange-500 text-white border-orange-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-orange-500 active:bg-gray-50'
                  }`}
                >
                  {bed} BHK
                </button>
              ))}
            </div>
          </div>

          {/* Location Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              placeholder="Search by location..."
              value={filters.location}
              onChange={(e) => onFilterChange('location', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>          
{/* Status Filters */}
          <div className="mb-6 hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Property Status
            </label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input type="checkbox" id="verified" className="mr-2 text-orange-500 focus:ring-orange-500" />
                <label htmlFor="verified" className="text-sm text-gray-700">Verified properties</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="ready" className="mr-2 text-orange-500 focus:ring-orange-500" />
                <label htmlFor="ready" className="text-sm text-gray-700">Ready to move</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="construction" className="mr-2 text-orange-500 focus:ring-orange-500" />
                <label htmlFor="construction" className="text-sm text-gray-700">Under construction</label>
              </div>
            </div>
          </div>

          {/* Additional Amenities */}
          <div className="mb-6 hidden lg:block">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Amenities
            </label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input type="checkbox" id="parking" className="mr-2 text-orange-500 focus:ring-orange-500" />
                <label htmlFor="parking" className="text-sm text-gray-700">Parking</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="gym" className="mr-2 text-orange-500 focus:ring-orange-500" />
                <label htmlFor="gym" className="text-sm text-gray-700">Gym</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="pool" className="mr-2 text-orange-500 focus:ring-orange-500" />
                <label htmlFor="pool" className="text-sm text-gray-700">Swimming Pool</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;