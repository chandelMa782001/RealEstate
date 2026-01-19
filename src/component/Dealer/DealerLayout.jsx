import React from 'react';
import { useNavigate } from 'react-router-dom';
const DealerLayout = ({ 
  dealerData, 
  activeTab, 
  setActiveTab, 
  showLogout, 
  setShowLogout, 
  showMobileSidebar, 
  setShowMobileSidebar, 
  handleLogout,
  children 
}) => {
  const navigate = useNavigate();

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠', active: true },
    { id: 'profile', label: 'My Profile', icon: '👤' },
    { id: 'properties', label: 'My Properties', icon: '🏢', count: 24 },
    { id: 'leads', label: 'Manage Leads', icon: '👥', count: 12 },
    // { id: 'activity', label: 'My Activity', icon: '📊' },
    // { id: 'searched', label: 'Recently Searched', icon: '🔍' },
    { id: 'master', label: 'Master', icon: '⚙️' },
    // { id: 'change-password', label: 'Change Password', icon: '🔒' },
  ];

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
              <h1 className="text-xl hidden lg:block md:block font-bold cursor-pointer">Dashboard</h1>
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
                      setShowMobileSidebar(false); 
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
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
            {children}
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

export default DealerLayout;