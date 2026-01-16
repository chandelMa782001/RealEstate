import React, { useState } from 'react';
import { dummyLeads } from '../../../Constant/Constants';
import LeadCard from './LeadCard';
import LeadViewModal from './LeadViewModal';
import LeadForm from './LeadForm';

const DealerLeads = ({ 
  selectedLeadOption, 
  setSelectedLeadOption, 
  showLeadDropdown, 
  setShowLeadDropdown,
  leadStatus,
  setLeadStatus
}) => {
  const [leads, setLeads] = useState([...dummyLeads]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '', mobile: '', alternateMobile: '', email: '', dob: '', gender: '',
    address1: '', address2: '', city: '', state: '', pincode: '', status: '',
    source: '', productType: '', followUpDate: '', followUpTime: '', assignTo: '',
    description: '', property: '', message: ''
  });

  const [editingLead, setEditingLead] = useState(null);
  
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Mike Johnson' }
  ];

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingLead) {
      setLeads(leads.map(lead => 
        lead.id === editingLead.id 
          ? { ...lead, ...formData, date: lead.date }
          : lead
      ));
      alert('Lead updated successfully!');
    } else {
      const newLead = {
        id: Date.now(),
        ...formData,
        date: new Date().toISOString(),
        contact: formData.mobile
      };
      setLeads([newLead, ...leads]);
      alert('Lead created successfully!');
    }
    
    handleReset();
    setSelectedLeadOption('manage');
  };

  const handleReset = () => {
    setFormData({
      name: '', mobile: '', alternateMobile: '', email: '', dob: '', gender: '',
      address1: '', address2: '', city: '', state: '', pincode: '', status: '',
      source: '', productType: '', followUpDate: '', followUpTime: '', assignTo: '',
      description: '', property: '', message: ''
    });
    setEditingLead(null);
  };

  const handleEdit = (lead) => {
    setFormData({
      name: lead.name || '', mobile: lead.contact || '', alternateMobile: lead.alternateMobile || '',
      email: lead.email || '', dob: lead.dob || '', gender: lead.gender || '',
      address1: lead.address1 || '', address2: lead.address2 || '', city: lead.city || '',
      state: lead.state || '', pincode: lead.pincode || '', status: lead.status || '',
      source: lead.source || '', productType: lead.productType || '', followUpDate: lead.followUpDate || '',
      followUpTime: lead.followUpTime || '', assignTo: lead.assignTo || '', description: lead.description || '',
      property: lead.property || '', message: lead.message || ''
    });
    setEditingLead(lead);
    setSelectedLeadOption('create');
    setShowLeadDropdown(false);
  };

  const handleDelete = (leadId) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      setLeads(leads.filter(lead => lead.id !== leadId));
      alert('Lead deleted successfully!');
    }
  };

  const handleView = (lead) => {
    setSelectedLead(lead);
    setShowViewModal(true);
  };

  const getFilteredLeads = () => {
    let filtered = leads;
    if (leadStatus) {
      filtered = filtered.filter(lead => lead.status === leadStatus);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(lead => 
        lead.name?.toLowerCase().includes(query) ||
        lead.email?.toLowerCase().includes(query) ||
        lead.contact?.toLowerCase().includes(query) ||
        lead.property?.toLowerCase().includes(query)
      );
    }
    return filtered;
  };

  const renderLeadContent = () => {
    const displayLeads = getFilteredLeads();
    
    switch(selectedLeadOption) {
      case 'manage':
        return (
          <>
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, email, phone, or property..."
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="text-xs sm:text-sm font-medium text-blue-600">Total Leads</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-700">{leads.length}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <p className="text-xs sm:text-sm font-medium text-yellow-600">New Leads</p>
                <p className="text-xl sm:text-2xl font-bold text-yellow-700">
                  {leads.filter(lead => lead.status === 'New').length}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <p className="text-xs sm:text-sm font-medium text-green-600">Contacted</p>
                <p className="text-xl sm:text-2xl font-bold text-green-700">
                  {leads.filter(lead => lead.status === 'Contacted').length}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                <p className="text-xs sm:text-sm font-medium text-purple-600">Qualified</p>
                <p className="text-xl sm:text-2xl font-bold text-purple-700">
                  {leads.filter(lead => lead.status === 'Qualified').length}
                </p>
              </div>
            </div>

            <div className="h-[60vh] sm:h-[65vh] lg:h-96 overflow-y-auto border border-gray-200 rounded-lg p-2 sm:p-4 bg-gray-50">
              {displayLeads.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No Leads Found</h4>
                  <p className="text-gray-600">
                    {searchQuery ? 'Try adjusting your search criteria' : 'Create your first lead to get started'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                  {displayLeads.map((lead) => (
                    <LeadCard 
                      key={lead.id} 
                      lead={lead} 
                      onView={handleView}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        );

      case 'create':
        return (
          <LeadForm 
            formData={formData}
            editingLead={editingLead}
            users={users}
            onFormChange={handleFormChange}
            onSubmit={handleSubmit}
            onReset={handleReset}
          />
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
                <p className="text-3xl font-bold text-blue-700">{leads.length}</p>
                <p className="text-xs text-gray-500 mt-1">Total leads</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
                <h3 className="text-sm font-medium text-green-600 mb-2">Converted</h3>
                <p className="text-3xl font-bold text-green-700">{leads.filter(l => l.status === 'Qualified').length}</p>
                <p className="text-xs text-gray-500 mt-1">Qualified leads</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-yellow-500">
                <h3 className="text-sm font-medium text-yellow-600 mb-2">In Progress</h3>
                <p className="text-3xl font-bold text-yellow-700">{leads.filter(l => l.status === 'Contacted').length}</p>
                <p className="text-xs text-gray-500 mt-1">Currently active</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-red-500">
                <h3 className="text-sm font-medium text-red-600 mb-2">New</h3>
                <p className="text-3xl font-bold text-red-700">{leads.filter(l => l.status === 'New').length}</p>
                <p className="text-xs text-gray-500 mt-1">Pending contact</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Lead Performance</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">New Leads</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: `${leads.length ? (leads.filter(l => l.status === 'New').length / leads.length * 100) : 0}%`}}></div>
                    </div>
                    <span className="text-sm text-gray-600">{leads.length ? Math.round(leads.filter(l => l.status === 'New').length / leads.length * 100) : 0}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Contacted</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{width: `${leads.length ? (leads.filter(l => l.status === 'Contacted').length / leads.length * 100) : 0}%`}}></div>
                    </div>
                    <span className="text-sm text-gray-600">{leads.length ? Math.round(leads.filter(l => l.status === 'Contacted').length / leads.length * 100) : 0}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Qualified</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: `${leads.length ? (leads.filter(l => l.status === 'Qualified').length / leads.length * 100) : 0}%`}}></div>
                    </div>
                    <span className="text-sm text-gray-600">{leads.length ? Math.round(leads.filter(l => l.status === 'Qualified').length / leads.length * 100) : 0}%</span>
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
      <LeadViewModal 
        lead={selectedLead}
        onClose={() => setShowViewModal(false)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div className="relative lead-dropdown">
            <button
              onClick={() => setShowLeadDropdown(!showLeadDropdown)}
              className="flex items-center space-x-2 text-2xl font-bold text-gray-800 hover:text-orange-600 transition duration-200"
            >
              <span>
                {selectedLeadOption === 'manage' && 'Manage Leads'}
                {selectedLeadOption === 'create' && (editingLead ? 'Edit Lead' : 'Create Leads')}
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
                    onClick={() => { setSelectedLeadOption('manage'); setShowLeadDropdown(false); }}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition duration-200 flex items-center space-x-3 ${
                      selectedLeadOption === 'manage' ? 'bg-orange-50 text-orange-600 border-r-2 border-orange-500' : 'text-gray-700'
                    }`}
                  >
                    <span className="text-lg">👥</span>
                    <span className="font-medium">Manage Leads</span>
                  </button>
                  <button
                    onClick={() => { handleReset(); setSelectedLeadOption('create'); setShowLeadDropdown(false); }}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition duration-200 flex items-center space-x-3 ${
                      selectedLeadOption === 'create' ? 'bg-orange-50 text-orange-600 border-r-2 border-orange-500' : 'text-gray-700'
                    }`}
                  >
                    <span className="text-lg">➕</span>
                    <span className="font-medium">Create Leads</span>
                  </button>
                  <button
                    onClick={() => { setSelectedLeadOption('upload'); setShowLeadDropdown(false); }}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition duration-200 flex items-center space-x-3 ${
                      selectedLeadOption === 'upload' ? 'bg-orange-50 text-orange-600 border-r-2 border-orange-500' : 'text-gray-700'
                    }`}
                  >
                    <span className="text-lg">📤</span>
                    <span className="font-medium">Upload Leads</span>
                  </button>
                  <button
                    onClick={() => { setSelectedLeadOption('assigned'); setShowLeadDropdown(false); }}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition duration-200 flex items-center space-x-3 ${
                      selectedLeadOption === 'assigned' ? 'bg-orange-50 text-orange-600 border-r-2 border-orange-500' : 'text-gray-700'
                    }`}
                  >
                    <span className="text-lg">📋</span>
                    <span className="font-medium">Assigned Leads</span>
                  </button>
                  <button
                    onClick={() => { setSelectedLeadOption('summary'); setShowLeadDropdown(false); }}
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
                  <option value="Hot">Hot</option>
                  <option value="Warm">Warm</option>
                  <option value="Cold">Cold</option>
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
