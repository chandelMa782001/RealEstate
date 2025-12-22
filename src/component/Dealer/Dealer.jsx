import { useState } from "react";
import "../../../src/pages/Dashboard.css"
import { useAppContext } from "../../Context/AppContext";
import { dummyLeads } from "../../../Constant/Constants";
import { useNavigate } from "react-router-dom";
const Dealer = ({ dealerData }) => {
  const { showNotification } = useAppContext();
  const navigate=useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showLogout, setShowLogout] = useState(false);
  const [leadStatus, setLeadStatus] = useState("");
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showNotification('New passwords do not match', 'error');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      showNotification('Password must be at least 6 characters long', 'error');
      return;
    }
    
    // Here you would typically validate the current password and update it
    // For now, we'll just show a success message
    showNotification('Password changed successfully!', 'success');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };
  const handleLogout = () => {
    localStorage.removeItem('currentDealer');
    showNotification('You have been logged out successfully', 'info');
    window.location.reload();
  };
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠', active: true },
    { id: 'properties', label: 'My Properties', icon: '🏢', count: 24 },
    { id: 'leads', label: 'Manage Leads', icon: '👥', count: 12 },
    { id: 'activity', label: 'My Activity', icon: '📊' },
    { id: 'searched', label: 'Recently Searched', icon: '🔍' },
    // { id: 'add-property', label: 'Add Property', icon: '➕' },
    { id: 'change-password', label: 'Change Password', icon: '🔒' },
  ];
  const renderDashboardContent = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Hello {dealerData?.name || 'Dealer'}</h2>
        <p className="text-gray-600 mb-4">
          From your account dashboard you can view your recent property, manage your property, and edit your password and account details.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">Email:</span> {dealerData?.email || 'dealer@example.com'}
          </div>
          <div>
            <span className="font-medium">Mobile:</span> {dealerData?.mobile || '+91 9876543210'}
          </div>
          <div>
            <span className="font-medium">Member Since:</span> January 2024
          </div>
          <div>
            <span className="font-medium">Status:</span> <span className="text-green-600 font-medium">Active</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Properties</p>
              <p className="text-3xl font-bold text-blue-600">24</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">↗ 12% from last month</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Listings</p>
              <p className="text-3xl font-bold text-green-600">18</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">↗ 8% from last month</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Inquiries</p>
              <p className="text-3xl font-bold text-yellow-600">156</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">↗ 23% from last month</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-3xl font-bold text-purple-600">2.4K</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">↗ 15% from last month</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">New inquiry received for 3BHK Apartment in Sector 62</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">Your property "Luxury Villa in Gurgaon" got 45 new views</p>
              <p className="text-xs text-gray-500">5 hours ago</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">Property listing "2BHK Flat" expires in 3 days</p>
              <p className="text-xs text-gray-500">1 day ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* <button 
            onClick={() => setActiveTab('add-property')}
            className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition duration-200"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
              </svg>
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">Add New Property</p>
              <p className="text-sm text-gray-600">List a new property</p>
            </div>
          </button> */}

          <button 
            onClick={() => setActiveTab('properties')}
            className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition duration-200"
          >
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">Manage Properties</p>
              <p className="text-sm text-gray-600">Edit existing listings</p>
            </div>
          </button>

          <button 
            onClick={() => setActiveTab('leads')}
            className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition duration-200"
          >
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
              </svg>
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">Manage Leads</p>
              <p className="text-sm text-gray-600">View and follow up</p>
            </div>
          </button>

          <button 
            onClick={() => setActiveTab('activity')}
            className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition duration-200"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">View Analytics</p>
              <p className="text-sm text-gray-600">Property insights</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return renderDashboardContent();
      case 'properties':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">My Properties</h2>
            <p className="text-gray-600">Property management functionality will be implemented here.</p>
          </div>
        );
      case 'leads':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
                <h2 className="text-2xl font-bold text-gray-800">Manage Leads</h2>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                 
                  <select
  value={leadStatus}
  onChange={(e) => setLeadStatus(e.target.value)}
  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
>
  <option value="">All Status</option>
  <option value="New">New</option>
  <option value="Contacted">Contacted</option>
  <option value="Qualified">Qualified</option>
</select>
                  <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-200">
                    Export Leads
                  </button>
                </div>
              </div>

              {/* Stats Overview */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="text-xs sm:text-sm font-medium text-blue-600">Total Leads</p>
                  <p className="text-xl sm:text-2xl font-bold text-blue-700">{dummyLeads.length}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                  <p className="text-xs sm:text-sm font-medium text-yellow-600">New Leads</p>
                  <p className="text-xl sm:text-2xl font-bold text-yellow-700">
                    {dummyLeads.filter(lead => lead.status === 'New').length}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <p className="text-xs sm:text-sm font-medium text-green-600">Contacted</p>
                  <p className="text-xl sm:text-2xl font-bold text-green-700">
                    {dummyLeads.filter(lead => lead.status === 'Contacted').length}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                  <p className="text-xs sm:text-sm font-medium text-purple-600">Qualified</p>
                  <p className="text-xl sm:text-2xl font-bold text-purple-700">
                    {filteredLeads.filter(lead => lead.status === 'Qualified').length}
                  </p>
                </div>
              </div>

              
              <div className="h-[60vh] sm:h-[65vh] lg:h-96 overflow-y-auto border border-gray-200 rounded-lg p-2 sm:p-4 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                  {filteredLeads.map((lead) => (
                    <div key={lead.id} className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition duration-200">
                      {/* Lead Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center flex-1 min-w-0">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                            <span className="text-orange-600 font-semibold text-base sm:text-lg">
                              {lead.name.charAt(0)}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{lead.name}</h3>
                            <span className={`inline-flex px-2 py-0.5 sm:py-1 text-xs font-medium rounded-full ${
                              lead.status === 'New' 
                                ? 'bg-yellow-100 text-yellow-800'
                                : lead.status === 'Contacted'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {lead.status}
                            </span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 ml-2 flex-shrink-0">
                          {new Date(lead.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div className="space-y-1.5 sm:space-y-2 mb-3">
                        <div className="flex items-center text-xs sm:text-sm text-gray-600">
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                          </svg>
                          <span className="truncate">{lead.email}</span>
                        </div>
                        <div className="flex items-center text-xs sm:text-sm text-gray-600">
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                          </svg>
                          <span className="truncate">{lead.contact}</span>
                        </div>
                      </div>

                      {/* Property Interest */}
                      <div className="mb-2 sm:mb-3">
                        <p className="text-xs text-gray-500 mb-1">Property Interest:</p>
                        <p className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-1">{lead.property}</p>
                      </div>

                      {/* Message */}
                      <div className="mb-3 sm:mb-4">
                        <p className="text-xs text-gray-500 mb-1">Message:</p>
                        <p className="text-xs sm:text-sm text-gray-700 line-clamp-2">{lead.message}</p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-between items-center pt-2 sm:pt-3 border-t border-gray-100">
                        <div className="flex space-x-1.5 sm:space-x-2">
                          <button 
                            className="flex items-center px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-orange-600 bg-orange-50 rounded-md hover:bg-orange-100 transition duration-200"
                            title="Send Email"
                          >
                            <svg className="w-3 h-3 sm:mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                            </svg>
                            <span className="hidden sm:inline">Email</span>
                          </button>
                          <button 
                            className="flex items-center px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100 transition duration-200"
                            title="Call"
                          >
                            <svg className="w-3 h-3 sm:mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                            </svg>
                            <span className="hidden sm:inline">Call</span>
                          </button>
                        </div>
                        <button 
                          className="flex items-center px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition duration-200"
                          title="View Details"
                        >
                          <svg className="w-3 h-3 sm:mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                          </svg>
                          <span className="hidden sm:inline">View</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'activity':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">My Activity</h2>
            <p className="text-gray-600">Activity tracking functionality will be implemented here.</p>
          </div>
        );
      case 'searched':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recently Searched</h2>
            <p className="text-gray-600">Search history functionality will be implemented here.</p>
          </div>
        );
     
      case 'change-password':
        return (
          <div className="bg-white   items-center
           rounded-lg shadow-sm p-6">

            <h2 className="text-xl font-bold text-gray-800 mb-4">Change Password</h2>
          
               <form onSubmit={handlePasswordSubmit} className="password-form">
                      <div className="form-group">
                        <input
                          type="password"
                          name="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          placeholder="Current Password*"
                          required
                          className="password-input"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          name="newPassword"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          placeholder="New Password*"
                          required
                          className="password-input"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          name="confirmPassword"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          placeholder="Confirm New Password*"
                          required
                          className="password-input"
                        />
                      </div>
                      <button type="submit" className="save-changes-btn">
                        Save Changes
                      </button>
                    </form>
          </div>
        );
      default:
        return renderDashboardContent();
    }
  };

  const filteredLeads = leadStatus
  ? dummyLeads.filter((lead) => lead.status === leadStatus)
  : dummyLeads;

  return (
    <div className="min-h-screen bg-gray-50">
    
      <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <svg onClick={()=>navigate('/')} className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
              <h1 className="text-xl font-bold">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm cursor-pointer hidden sm:block">
                🏠 Home › My Dashboard
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowLogout(!showLogout)}
                  className="flex items-center space-x-2 hover:bg-white/10 px-3 py-2 rounded-lg transition duration-200"
                >
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium hidden sm:inline">{dealerData?.name || 'Dealer'}</span>
                </button>
                {showLogout && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-200"
                    >
                      <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"/>
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      
      <div className="pt-16 flex h-screen">
      
        <div className="w-full lg:w-72 lg:flex-shrink-0 lg:fixed lg:left-0 lg:top-16 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto bg-gray-800">
          <div className="lg:h-full">
            <nav className="p-4 lg:h-full lg:overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2 lg:space-y-2">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition duration-200 ${
                      activeTab === item.id
                        ? 'bg-orange-500 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="mr-3 text-lg">{item.icon}</span>
                      <span className="text-sm font-medium hidden sm:inline lg:inline">{item.label}</span>
                    </div>
                    {item.count && (
                      <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded-full hidden sm:inline lg:inline">
                        {item.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </div>

   
        <div className="flex-1 lg:ml-72 h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderContent()}
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-40">
        <button className="w-12 h-12 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg flex items-center justify-center transition duration-200">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
          </svg>
        </button>
      </div>
    </div>
  );
};
export default Dealer;