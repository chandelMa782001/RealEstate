import React from 'react';
import { dummyLeads } from '../../../Constant/Constants';

const DealerLeads = ({ 
  selectedLeadOption, 
  setSelectedLeadOption, 
  showLeadDropdown, 
  setShowLeadDropdown,
  leadStatus,
  setLeadStatus,
  filteredLeads 
}) => {

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
};

export default DealerLeads;