import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { useAppContext } from '../Context/AppContext';
import { images } from '../../utils/Image';

const Activity = () => {
  const { user, isAuthenticated } = useAppContext();
  const [activeTab, setActiveTab] = useState('recent');

  // Mock activity data - replace with real data from your backend
  const activities = {
    recent: [
      {
        id: 1,
        type: 'property_view',
        title: 'Viewed Luxury Villa in Gurgaon',
        description: 'You viewed a 4 BHK villa in Sector 45, Gurgaon',
        timestamp: '2 hours ago',
        icon: '👁️',
        link: '/property/1'
      },
      {
        id: 2,
        type: 'inquiry',
        title: 'Sent Inquiry for Apartment',
        description: 'You inquired about a 3 BHK apartment in Noida',
        timestamp: '5 hours ago',
        icon: '💬',
        link: '/property/2'
      },
      {
        id: 3,
        type: 'saved',
        title: 'Saved Property',
        description: 'You saved a 2 BHK flat in Delhi',
        timestamp: '1 day ago',
        icon: '❤️',
        link: '/property/3'
      }
    ],
    inquiries: [
      {
        id: 1,
        property: 'Luxury Villa in Gurgaon',
        agent: 'Rajesh Kumar',
        status: 'pending',
        date: '2024-12-10',
        message: 'Interested in scheduling a visit'
      },
      {
        id: 2,
        property: '3 BHK Apartment in Noida',
        agent: 'Priya Sharma',
        status: 'responded',
        date: '2024-12-09',
        message: 'Looking for immediate possession'
      }
    ],
    saved: [
      {
        id: 1,
        title: 'Modern 2 BHK Flat',
        location: 'Sector 62, Noida',
        price: '₹85 Lakhs',
        image: images.house_6,
        savedDate: '2024-12-08'
      },
      {
        id: 2,
        title: 'Luxury Villa',
        location: 'Gurgaon',
        price: '₹2.5 Crores',
        image: images.house_4,
        savedDate: '2024-12-07'
      },
      {
        id: 3,
        title: 'Premium Apartment',
        location: 'Dwarka, Delhi',
        price: '₹1.2 Crores',
        image: images.house_2,
        savedDate: '2024-12-06'
      },
      {
        id: 4,
        title: 'Spacious Villa',
        location: 'Sector 45, Gurgaon',
        price: '₹3.8 Crores',
        image: images.house_5,
        savedDate: '2024-12-05'
      }
    ]
  };

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Login</h2>
            <p className="text-gray-600">You need to be logged in to view your activity</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">My Activity</h1>
          <div className="flex items-center space-x-2 text-blue-100">
            <Link to="/" className="hover:text-white transition-colors">🏠 Home</Link>
            <span>›</span>
            <span>My Activity</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Welcome Message */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Welcome back, {user?.name || 'User'}!
            </h2>
            <p className="text-gray-600">
              Here's a summary of your recent activity and interactions on our platform.
            </p>
          </div>

          {/* Activity Tabs */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('recent')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'recent'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Recent Activity
                </button>
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'inquiries'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  My Inquiries
                </button>
                <button
                  onClick={() => setActiveTab('saved')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'saved'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Saved Properties
                </button>
              </nav>
            </div>

            <div className="p-6">
              {/* Recent Activity Tab */}
              {activeTab === 'recent' && (
                <div className="space-y-4">
                  {activities.recent.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="text-2xl">{activity.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{activity.title}</h3>
                        <p className="text-gray-600 text-sm">{activity.description}</p>
                        <p className="text-gray-400 text-xs mt-1">{activity.timestamp}</p>
                      </div>
                      <Link
                        to={activity.link}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View →
                      </Link>
                    </div>
                  ))}
                </div>
              )}

              {/* Inquiries Tab */}
              {activeTab === 'inquiries' && (
                <div className="space-y-4">
                  {activities.inquiries.map((inquiry) => (
                    <div key={inquiry.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-gray-800">{inquiry.property}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          inquiry.status === 'pending' 
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {inquiry.status}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">Agent: {inquiry.agent}</p>
                      <p className="text-gray-700 text-sm mb-3">"{inquiry.message}"</p>
                      <p className="text-gray-400 text-xs">Sent on {inquiry.date}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Saved Properties Tab */}
              {activeTab === 'saved' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activities.saved.map((property) => (
                    <div key={property.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={property.image} 
                          alt={property.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-800 mb-1">{property.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{property.location}</p>
                        <p className="text-blue-600 font-semibold mb-2">{property.price}</p>
                        <p className="text-gray-400 text-xs mb-3">Saved on {property.savedDate}</p>
                        <div className="flex space-x-2">
                          <Link 
                            to={`/property/${property.id}`}
                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md text-sm hover:bg-blue-700 transition-colors text-center"
                          >
                            View Details
                          </Link>
                          <button 
                            className="p-2 text-red-500 hover:text-red-700 transition-colors"
                            title="Remove from saved"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                to="/post-property"
                className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <span className="text-2xl">➕</span>
                <div>
                  <h4 className="font-medium text-gray-800">Post Property</h4>
                  <p className="text-gray-600 text-sm">List your property for sale or rent</p>
                </div>
              </Link>
              
              <Link
                to="/projects"
                className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <span className="text-2xl">🏗️</span>
                <div>
                  <h4 className="font-medium text-gray-800">Browse Projects</h4>
                  <p className="text-gray-600 text-sm">Explore new residential projects</p>
                </div>
              </Link>
              
              <Link
                to="/dashboard"
                className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <span className="text-2xl">📊</span>
                <div>
                  <h4 className="font-medium text-gray-800">Dashboard</h4>
                  <p className="text-gray-600 text-sm">Manage your account and properties</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Activity;