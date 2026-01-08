import { useState, useEffect } from "react";
import "../../../src/pages/Dashboard.css";
import { useAppContext } from "../../Context/AppContext";
import { dummyLeads } from "../../../Constant/Constants";
import { useNavigate } from "react-router-dom";

// Import modular components
import DealerLayout from './DealerLayout';
import DealerDashboard from './DealerDashboard';
import DealerLeads from './DealerLeads';
import DealerMaster from './DealerMaster';
import DealerPasswordChange from './DealerPasswordChange';
import DealerProfile from './DealerProfile';

const Dealer = ({ dealerData }) => {
  const { showNotification } = useAppContext();
  const navigate = useNavigate();
  
  // State management
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

  // Event handlers
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
    
    showNotification('Password changed successfully!', 'success');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('currentDealer');
    localStorage.removeItem('dealerToken');
    showNotification('You have been logged out successfully', 'info');
    window.location.reload();
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

  // Filter leads based on status
  const filteredLeads = leadStatus
    ? dummyLeads.filter((lead) => lead.status === leadStatus)
    : dummyLeads;

  // Render content based on active tab
  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <DealerDashboard dealerData={dealerData} setActiveTab={setActiveTab} />;
      
      case 'properties':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">My Properties</h2>
            <p className="text-gray-600">Property management functionality will be implemented here.</p>
          </div>
        );
      
      case 'leads':
        return (
          <DealerLeads 
            selectedLeadOption={selectedLeadOption}
            setSelectedLeadOption={setSelectedLeadOption}
            showLeadDropdown={showLeadDropdown}
            setShowLeadDropdown={setShowLeadDropdown}
            leadStatus={leadStatus}
            setLeadStatus={setLeadStatus}
            filteredLeads={filteredLeads}
          />
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
          <DealerMaster 
            selectedMasterOption={selectedMasterOption}
            setSelectedMasterOption={setSelectedMasterOption}
            showMasterDropdown={showMasterDropdown}
            setShowMasterDropdown={setShowMasterDropdown}
          />
        );
      
      case 'profile':
        return <DealerProfile dealerData={dealerData} />;
      
      case 'change-password':
        return (
          <DealerPasswordChange 
            passwordData={passwordData}
            handlePasswordChange={handlePasswordChange}
            handlePasswordSubmit={handlePasswordSubmit}
          />
        );
      
      default:
        return <DealerDashboard dealerData={dealerData} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <DealerLayout
      dealerData={dealerData}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      showLogout={showLogout}
      setShowLogout={setShowLogout}
      showMobileSidebar={showMobileSidebar}
      setShowMobileSidebar={setShowMobileSidebar}
      handleLogout={handleLogout}
    >
      {renderContent()}
    </DealerLayout>
  );
};

export default Dealer;