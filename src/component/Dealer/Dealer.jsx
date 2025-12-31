import { useState, useEffect } from "react";
import "../../../src/pages/Dashboard.css"
import { useAppContext } from "../../Context/AppContext";
import { dummyLeads } from "../../../Constant/Constants";
import { useNavigate } from "react-router-dom";
const Dealer = ({ dealerData }) => {
  const { showNotification } = useAppContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showLogout, setShowLogout] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [leadStatus, setLeadStatus] = useState("");
  const [showLeadDropdown, setShowLeadDropdown] = useState(false);
  const [selectedLeadOption, setSelectedLeadOption] = useState('manage');
  const [showMasterDropdown, setShowMasterDropdown] = useState(false);
  const [selectedMasterOption, setSelectedMasterOption] = useState('role');
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showLeadDropdown && !event.target.closest('.lead-dropdown')) {
        setShowLeadDropdown(false);
      }
      if (showMasterDropdown && !event.target.closest('.master-dropdown')) {
        setShowMasterDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLeadDropdown, showMasterDropdown]);
  const handleLogout = () => {
    localStorage.removeItem('currentDealer');
    showNotification('You have been logged out successfully', 'info');
    window.location.reload();
  };

  const renderLeadContent = () => {
    switch(selectedLeadOption) {
      case 'manage':
        return (
          <>
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
                            lead.status === 'New' ? 'bg-yellow-100 text-yellow-800' :
                            lead.status === 'Contacted' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
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
          </>
        );

      case 'create':
        return (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Create New Lead</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Lead Status</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Qualified">Qualified</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Interest</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter property details"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter lead message or notes"
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-200"
                  >
                    Create Lead
                  </button>
                </div>
              </form>
            </div>
          </div>
        );

      case 'upload':
        return (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Upload Leads</h3>
              <div className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-lg font-medium text-gray-900 mb-2">Upload CSV File</p>
                  <p className="text-sm text-gray-600 mb-4">Drag and drop your CSV file here, or click to browse</p>
                  <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-200">
                    Choose File
                  </button>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">CSV Format Requirements:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Name, Email, Phone, Property Interest, Message</li>
                    <li>• First row should contain column headers</li>
                    <li>• Maximum file size: 5MB</li>
                    <li>• Supported format: .csv only</li>
                  </ul>
                </div>
                <div className="flex justify-end space-x-3">
                  <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200">
                    Download Template
                  </button>
                  <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-200">
                    Upload Leads
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'assigned':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Assigned Leads</h3>
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h4 className="text-lg font-medium text-gray-900 mb-2">No Assigned Leads</h4>
              <p className="text-gray-600">You don't have any assigned leads at the moment.</p>
            </div>
          </div>
        );

      case 'summary':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
                <h3 className="text-sm font-medium text-blue-600 mb-2">This Month</h3>
                <p className="text-3xl font-bold text-blue-700">24</p>
                <p className="text-xs text-gray-500 mt-1">↗ 12% from last month</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
                <h3 className="text-sm font-medium text-green-600 mb-2">Converted</h3>
                <p className="text-3xl font-bold text-green-700">8</p>
                <p className="text-xs text-gray-500 mt-1">↗ 25% conversion rate</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-yellow-500">
                <h3 className="text-sm font-medium text-yellow-600 mb-2">In Progress</h3>
                <p className="text-3xl font-bold text-yellow-700">12</p>
                <p className="text-xs text-gray-500 mt-1">Currently active</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-red-500">
                <h3 className="text-sm font-medium text-red-600 mb-2">Lost</h3>
                <p className="text-3xl font-bold text-red-700">4</p>
                <p className="text-xs text-gray-500 mt-1">↓ 20% from last month</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Lead Performance</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">New Leads</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '60%'}}></div>
                    </div>
                    <span className="text-sm text-gray-600">60%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Contacted</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{width: '40%'}}></div>
                    </div>
                    <span className="text-sm text-gray-600">40%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Qualified</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '25%'}}></div>
                    </div>
                    <span className="text-sm text-gray-600">25%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderMasterContent = () => {
    switch(selectedMasterOption) {
      case 'role':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Manage Role</h3>
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h4 className="text-lg font-medium text-gray-900 mb-2">Role Management</h4>
              <p className="text-gray-600">Manage user roles and permissions here.</p>
            </div>
          </div>
        );
      case 'status':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Manage Status</h3>
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h4 className="text-lg font-medium text-gray-900 mb-2">Status Management</h4>
              <p className="text-gray-600">Manage system status configurations here.</p>
            </div>
          </div>
        );
      case 'product':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Manage Product</h3>
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <h4 className="text-lg font-medium text-gray-900 mb-2">Product Management</h4>
              <p className="text-gray-600">Manage products and inventory here.</p>
            </div>
          </div>
        );
      case 'source':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Manage Source</h3>
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h4 className="text-lg font-medium text-gray-900 mb-2">Source Management</h4>
              <p className="text-gray-600">Manage data sources and integrations here.</p>
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Manage Users</h3>
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              <h4 className="text-lg font-medium text-gray-900 mb-2">User Management</h4>
              <p className="text-gray-600">Manage system users and their access here.</p>
            </div>
          </div>
        );
      case 'permission':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Manage Permission</h3>
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h4 className="text-lg font-medium text-gray-900 mb-2">Permission Management</h4>
              <p className="text-gray-600">Manage user permissions and access controls here.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠', active: true },
    { id: 'properties', label: 'My Properties', icon: '🏢', count: 24 },
    { id: 'leads', label: 'Manage Leads', icon: '👥', count: 12 },
    { id: 'activity', label: 'My Activity', icon: '📊' },
    { id: 'searched', label: 'Recently Searched', icon: '🔍' },
    { id: 'master', label: 'Master', icon: '⚙️' },
    { id: 'change-password', label: 'Change Password', icon: '🔒' },
  ];
  const renderDashboardContent = () => (
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
                <div className="relative lead-dropdown">
                  <button
                    onClick={() => {
                      console.log('Dropdown clicked, current state:', showLeadDropdown);
                      setShowLeadDropdown(!showLeadDropdown);
                    }}
                    className="flex items-center space-x-2 text-2xl font-bold text-gray-800 hover:text-orange-600 transition duration-200"
                  >
                    <span>
                      {selectedLeadOption === 'manage' && 'Manage Leads'}
                      {selectedLeadOption === 'create' && 'Create Leads'}
                      {selectedLeadOption === 'upload' && 'Upload Leads'}
                      {selectedLeadOption === 'assigned' && 'Assigned Leads'}
                      {selectedLeadOption === 'summary' && 'Leads Summary'}
                    </span>
                    <svg 
                      className={`w-5 h-5 transition-transform duration-200 ${showLeadDropdown ? 'rotate-180' : ''}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                  </button>
                  
                  {showLeadDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="py-2">
                        <button
                          onClick={() => {
                            setSelectedLeadOption('manage');
                            setShowLeadDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition duration-200 flex items-center space-x-3 ${
                            selectedLeadOption === 'manage' ? 'bg-orange-50 text-orange-600 border-r-2 border-orange-500' : 'text-gray-700'
                          }`}
                        >
                          <span className="text-lg">👥</span>
                          <span className="font-medium">Manage Leads</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedLeadOption('create');
                            setShowLeadDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition duration-200 flex items-center space-x-3 ${
                            selectedLeadOption === 'create' ? 'bg-orange-50 text-orange-600 border-r-2 border-orange-500' : 'text-gray-700'
                          }`}
                        >
                          <span className="text-lg">➕</span>
                          <span className="font-medium">Create Leads</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedLeadOption('upload');
                            setShowLeadDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition duration-200 flex items-center space-x-3 ${
                            selectedLeadOption === 'upload' ? 'bg-orange-50 text-orange-600 border-r-2 border-orange-500' : 'text-gray-700'
                          }`}
                        >
                          <span className="text-lg">📤</span>
                          <span className="font-medium">Upload Leads</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedLeadOption('assigned');
                            setShowLeadDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition duration-200 flex items-center space-x-3 ${
                            selectedLeadOption === 'assigned' ? 'bg-orange-50 text-orange-600 border-r-2 border-orange-500' : 'text-gray-700'
                          }`}
                        >
                          <span className="text-lg">📋</span>
                          <span className="font-medium">Assigned Leads</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedLeadOption('summary');
                            setShowLeadDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition duration-200 flex items-center space-x-3 ${
                            selectedLeadOption === 'summary' ? 'bg-orange-50 text-orange-600 border-r-2 border-orange-500' : 'text-gray-700'
                          }`}
                        >
                          <span className="text-lg">📊</span>
                          <span className="font-medium">Leads Summary</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  {selectedLeadOption === 'manage' && (
                    <>
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
                    </>
                  )}
                </div>
              </div>

              {renderLeadContent()}


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
      case 'master':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
                <div className="relative master-dropdown">
                  <button
                    onClick={() => {
                      console.log('Master dropdown clicked, current state:', showMasterDropdown);
                      setShowMasterDropdown(!showMasterDropdown);
                    }}
                    className="flex items-center space-x-2 text-2xl font-bold text-gray-800 hover:text-orange-600 transition duration-200"
                  >
                    <span>
                      {selectedMasterOption === 'role' && 'Manage Role'}
                      {selectedMasterOption === 'status' && 'Manage Status'}
                      {selectedMasterOption === 'product' && 'Manage Product'}
                      {selectedMasterOption === 'source' && 'Manage Source'}
                      {selectedMasterOption === 'users' && 'Manage Users'}
                      {selectedMasterOption === 'permission' && 'Manage Permission'}
                    </span>
                    <svg className={`w-5 h-5 transition-transform duration-200 ${showMasterDropdown ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                  </button>
                  {showMasterDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="py-2">
                        <button
                          onClick={() => {
                            setSelectedMasterOption('role');
                            setShowMasterDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition duration-200 flex items-center space-x-3 ${selectedMasterOption === 'role' ? 'bg-orange-50 text-orange-600 border-r-2 border-orange-500' : 'text-gray-700'}`}
                        >
                          <span className="text-lg">👤</span>
                          <span className="font-medium">Manage Role</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedMasterOption('status');
                            setShowMasterDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition duration-200 flex items-center space-x-3 ${selectedMasterOption === 'status' ? 'bg-orange-50 text-orange-600 border-r-2 border-orange-500' : 'text-gray-700'}`}
                        >
                          <span className="text-lg">✅</span>
                          <span className="font-medium">Manage Status</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedMasterOption('product');
                            setShowMasterDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition duration-200 flex items-center space-x-3 ${selectedMasterOption === 'product' ? 'bg-orange-50 text-orange-600 border-r-2 border-orange-500' : 'text-gray-700'}`}
                        >
                          <span className="text-lg">📦</span>
                          <span className="font-medium">Manage Product</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedMasterOption('source');
                            setShowMasterDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition duration-200 flex items-center space-x-3 ${selectedMasterOption === 'source' ? 'bg-orange-50 text-orange-600 border-r-2 border-orange-500' : 'text-gray-700'}`}
                        >
                          <span className="text-lg">🔗</span>
                          <span className="font-medium">Manage Source</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedMasterOption('users');
                            setShowMasterDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition duration-200 flex items-center space-x-3 ${selectedMasterOption === 'users' ? 'bg-orange-50 text-orange-600 border-r-2 border-orange-500' : 'text-gray-700'}`}
                        >
                          <span className="text-lg">👥</span>
                          <span className="font-medium">Manage Users</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedMasterOption('permission');
                            setShowMasterDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition duration-200 flex items-center space-x-3 ${selectedMasterOption === 'permission' ? 'bg-orange-50 text-orange-600 border-r-2 border-orange-500' : 'text-gray-700'}`}
                        >
                          <span className="text-lg">🛡️</span>
                          <span className="font-medium">Manage Permission</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {renderMasterContent()}
            </div>
          </div>
        );
     
      case 'change-password':
        return (
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Change Password</h2>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Current Password*"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
              <div>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="New Password*"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm New Password*"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
              <button 
                type="submit" 
                className="w-full sm:w-auto px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-200 font-medium"
              >
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
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              {/* Mobile menu button */}
              <button
                onClick={() => setShowMobileSidebar(!showMobileSidebar)}
                className="lg:hidden mr-3 p-2 rounded-md hover:bg-white/10 transition duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <svg onClick={() => navigate('/')} className="w-8 h-8 lg:block md:block hidden cursor-pointer mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
              <h1 className="text-xl hidden lg:block  md:block font-bold cursor-pointer">Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div onClick={() => navigate('/')} className="text-sm cursor-pointer hidden sm:block">
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

      {/* Mobile Sidebar Overlay */}
      {showMobileSidebar && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setShowMobileSidebar(false)}
        />
      )}

      <div className="pt-16 flex h-screen">
        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
          w-72 lg:w-72 flex-shrink-0 
          transform ${showMobileSidebar ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
          transition-transform duration-300 ease-in-out
          bg-gray-800 lg:top-16 lg:h-[calc(100vh-4rem)]
          mt-16 lg:mt-0
        `}>
          <div className="h-full overflow-y-auto">
            <nav className="p-4">
              <div className="space-y-2">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setShowMobileSidebar(false); // Close mobile sidebar on selection
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition duration-200 ${
                      activeTab === item.id
                        ? 'bg-orange-500 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="mr-3 text-lg">{item.icon}</span>
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    {item.count && (
                      <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded-full">
                        {item.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1  overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
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