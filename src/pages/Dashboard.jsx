import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { useAppContext } from '../Context/AppContext';
import './Dashboard.css';
const Dashboard = () => {
  const { user, isAuthenticated, logout } = useAppContext();
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
  
    alert('Password changed successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Login</h2>
            <p className="text-gray-600">You need to be logged in to view your dashboard</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-page">
       
        <div className="dashboard-header">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="dashboard-main-title">Dashboard</h1>
            <div className="breadcrumb">
              <Link to="/" className="breadcrumb-link">🏠 Home</Link>
              <span className="breadcrumb-separator">›</span>
              <span className="breadcrumb-current">My Dashboard</span>
            </div>
          </div>
        </div>

     
        <div className="dashboard-container">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="dashboard-layout">
            
              <aside className="dashboard-sidebar">
                <nav className="sidebar-nav">
                  <button
                    onClick={() => setActiveMenu('dashboard')}
                    className={`sidebar-item ${activeMenu === 'dashboard' ? 'active' : ''}`}
                  >
                    <span className="sidebar-icon">🏠</span>
                    <span>Dashboard</span>
                  </button>
                  <button
                    onClick={() => setActiveMenu('properties')}
                    className={`sidebar-item ${activeMenu === 'properties' ? 'active' : ''}`}
                  >
                    <span className="sidebar-icon">📋</span>
                    <span>My Properties</span>
                  </button>
                  <Link
                    to="/post-property"
                    className="sidebar-item"
                  >
                    <span className="sidebar-icon">➕</span>
                    <span>Add Property</span>
                  </Link>
                  <button
                    onClick={() => setActiveMenu('password')}
                    className={`sidebar-item ${activeMenu === 'password' ? 'active' : ''}`}
                  >
                    <span className="sidebar-icon">🔒</span>
                    <span>Change Password</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="sidebar-item logout"
                  >
                    <span className="sidebar-icon">🚪</span>
                    <span>Logout</span>
                  </button>
                </nav>
              </aside>

           
              <main className="dashboard-content">
                {activeMenu === 'dashboard' && (
                  <div className="content-card">
                    <h2 className="content-greeting">Hello {user?.name || 'User'}</h2>
                    <p className="content-description">
                      From your account dashboard you can view your recent property, manage your property, and edit your password and account details.
                    </p>
                  </div>
                )}

                {activeMenu === 'password' && (
                  <div className="content-card">
                    <h2 className="content-title">Change Password</h2>
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
                )}

                {activeMenu === 'properties' && (
                  <div className="content-card">
                    <h2 className="content-title">My Properties</h2>
                    <p className="content-description">
                      You haven't posted any properties yet.
                    </p>
                    <Link to="/post-property" className="post-property-link">
                      Post Your First Property
                    </Link>
                  </div>
                )}
              </main>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Dashboard;
