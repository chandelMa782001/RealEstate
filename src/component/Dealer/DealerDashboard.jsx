import React from 'react';

const DealerDashboard = ({ dealerData, setActiveTab }) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Hello {dealerData?.name || 'Dealer'}</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-4">
          From your account dashboard you can view your recent property, manage your property, and edit your password and account details.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">Email:</span> {dealerData?.email || 'dealer@example.com'}
          </div>
          <div>
            <span className="font-medium">Mobile:</span> {dealerData?.mobile || '+91 9876543210'}
          </div>
          <div>
            <span className="font-medium">Status:</span> <span className="text-green-600 font-medium">Active</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total Properties</p>
              <p className="text-xl sm:text-3xl font-bold text-blue-600">24</p>
            </div>
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2 hidden sm:block">↗ 12% from last month</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Active Listings</p>
              <p className="text-xl sm:text-3xl font-bold text-green-600">18</p>
            </div>
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2 hidden sm:block">↗ 8% from last month</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total Inquiries</p>
              <p className="text-xl sm:text-3xl font-bold text-yellow-600">156</p>
            </div>
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2 hidden sm:block">↗ 23% from last month</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-xl sm:text-3xl font-bold text-purple-600">2.4K</p>
            </div>
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2 hidden sm:block">↗ 15% from last month</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-800">New inquiry received for 3BHK Apartment in Sector 62</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-800">Your property "Luxury Villa in Gurgaon" got 45 new views</p>
              <p className="text-xs text-gray-500">5 hours ago</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-800">Property listing "2BHK Flat" expires in 3 days</p>
              <p className="text-xs text-gray-500">1 day ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <button 
            onClick={() => setActiveTab('profile')}
            className="flex items-center p-3 sm:p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition duration-200"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
              </svg>
            </div>
            <div className="text-left min-w-0">
              <p className="text-sm font-medium text-gray-900">My Profile</p>
              <p className="text-xs text-gray-600">Update your information</p>
            </div>
          </button>

          <button 
            onClick={() => setActiveTab('properties')}
            className="flex items-center p-3 sm:p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition duration-200"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div className="text-left min-w-0">
              <p className="text-sm font-medium text-gray-900">Manage Properties</p>
              <p className="text-xs text-gray-600">Edit existing listings</p>
            </div>
          </button>

          <button 
            onClick={() => setActiveTab('leads')}
            className="flex items-center p-3 sm:p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition duration-200"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
              </svg>
            </div>
            <div className="text-left min-w-0">
              <p className="text-sm font-medium text-gray-900">Manage Leads</p>
              <p className="text-xs text-gray-600">View and follow up</p>
            </div>
          </button>

          <button 
            onClick={() => setActiveTab('activity')}
            className="flex items-center p-3 sm:p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition duration-200"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
            </div>
            <div className="text-left min-w-0">
              <p className="text-sm font-medium text-gray-900">View Analytics</p>
              <p className="text-xs text-gray-600">Property insights</p>
            </div>
          </button>

          <button 
            onClick={() => setActiveTab('change-password')}
            className="flex items-center p-3 sm:p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition duration-200"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
              </svg>
            </div>
            <div className="text-left min-w-0">
              <p className="text-sm font-medium text-gray-900">Change Password</p>
              <p className="text-xs text-gray-600">Update security</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DealerDashboard;