import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../Context/AppContext';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { allProperties } from '../../Constant/Constants';

const ContactedProperty = () => {
  const navigate = useNavigate();
  const { 
    isAuthenticated, 
    addToRecentlyViewed, 
    showNotification, 
    setIsLoginModalOpen,
    addToFavorites,
    removeFromFavorites,
    favorites
  } = useAppContext();
  
  const [contactedProperties, setContactedProperties] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock contacted properties data - replace with real data from your backend
  const mockContactedData = [
    {
      id: 1,
      propertyId: 1,
      contactDate: '2024-12-20',
      contactTime: '10:30 AM',
      status: 'pending',
      agentName: 'Rajesh Kumar',
      agentPhone: '+91 98765 43210',
      message: 'Interested in scheduling a site visit this weekend',
      responseTime: null,
      lastFollowUp: '2024-12-21',
      priority: 'high'
    },
    {
      id: 2,
      propertyId: 2,
      contactDate: '2024-12-19',
      contactTime: '2:15 PM',
      status: 'responded',
      agentName: 'Priya Sharma',
      agentPhone: '+91 87654 32109',
      message: 'Looking for immediate possession. What are the loan options?',
      responseTime: '2024-12-19 4:30 PM',
      lastFollowUp: '2024-12-20',
      priority: 'medium'
    },
    {
      id: 3,
      propertyId: 3,
      contactDate: '2024-12-18',
      contactTime: '11:45 AM',
      status: 'closed',
      agentName: 'Amit Singh',
      agentPhone: '+91 76543 21098',
      message: 'Need more details about commercial space rental terms',
      responseTime: '2024-12-18 1:20 PM',
      lastFollowUp: '2024-12-19',
      priority: 'low'
    },
    {
      id: 4,
      propertyId: 4,
      contactDate: '2024-12-17',
      contactTime: '9:20 AM',
      status: 'responded',
      agentName: 'Neha Gupta',
      agentPhone: '+91 65432 10987',
      message: 'Interested in plot. Can we negotiate on price?',
      responseTime: '2024-12-17 11:15 AM',
      lastFollowUp: '2024-12-18',
      priority: 'high'
    }
  ];

  useEffect(() => {
    // Combine contacted data with property details
    const enrichedData = mockContactedData.map(contact => {
      const property = allProperties?.find(p => p.id === contact.propertyId) || {};
      return {
        ...contact,
        property: {
          ...property,
          title: property.title || `Property ${contact.propertyId}`,
          location: property.location || 'Location not available',
          price: property.price || 'Price on request',
          image: property.image || '/placeholder-property.jpg',
          type: property.type || 'Property',
          area: property.area || 'Area not specified'
        }
      };
    });

    // Apply filters
    let filteredData = enrichedData;
    
    if (filterStatus !== 'all') {
      filteredData = filteredData.filter(item => item.status === filterStatus);
    }

    // Apply sorting
    switch (sortBy) {
      case 'recent':
        filteredData.sort((a, b) => new Date(b.contactDate) - new Date(a.contactDate));
        break;
      case 'oldest':
        filteredData.sort((a, b) => new Date(a.contactDate) - new Date(b.contactDate));
        break;
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        filteredData.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
        break;
      case 'status':
        filteredData.sort((a, b) => a.status.localeCompare(b.status));
        break;
      default:
        break;
    }

    setContactedProperties(filteredData);
  }, [sortBy, filterStatus]);

  const handleViewProperty = (propertyId) => {
    addToRecentlyViewed(propertyId);
    navigate(`/property/${propertyId}`);
  };

  const handleToggleFavorite = (propertyId, e) => {
    e.stopPropagation();
    if (favorites.includes(propertyId)) {
      removeFromFavorites(propertyId);
      showNotification('Property removed from favorites', 'info', 2000);
    } else {
      addToFavorites(propertyId);
      showNotification('Property added to favorites', 'success', 2000);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'responded':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <div className="text-6xl mb-4">📞</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Login</h2>
            <p className="text-gray-600 mb-6">You need to be logged in to view your contacted properties</p>
            <button 
              onClick={() => setIsLoginModalOpen(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              Login Now
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-gray-800 transition-colors">Home</Link>
            <span className="mx-2">›</span>
            <Link to="/activity" className="hover:text-gray-800 transition-colors">Activity</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-800 font-medium">Contacted Properties</span>
          </nav>
        </div>
      </div>

      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center">
                <span className="mr-3">📞</span>
                Contacted Properties
              </h1>
              <p className="text-blue-100">
                {contactedProperties.length} {contactedProperties.length === 1 ? 'property' : 'properties'} contacted
              </p>
            </div>
            
            {/* Filters and Sort */}
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-medium border-0 focus:ring-2 focus:ring-blue-300"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="responded">Responded</option>
                <option value="closed">Closed</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-medium border-0 focus:ring-2 focus:ring-blue-300"
              >
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest First</option>
                <option value="priority">By Priority</option>
                <option value="status">By Status</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="text-2xl mr-3">📞</div>
              <div>
                <p className="text-sm text-gray-600">Total Contacted</p>
                <p className="text-xl font-bold text-gray-800">{contactedProperties.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-yellow-500">
            <div className="flex items-center">
              <div className="text-2xl mr-3">⏳</div>
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-xl font-bold text-gray-800">
                  {contactedProperties.filter(p => p.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="text-2xl mr-3">✅</div>
              <div>
                <p className="text-sm text-gray-600">Responded</p>
                <p className="text-xl font-bold text-gray-800">
                  {contactedProperties.filter(p => p.status === 'responded').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-red-500">
            <div className="flex items-center">
              <div className="text-2xl mr-3">🔥</div>
              <div>
                <p className="text-sm text-gray-600">High Priority</p>
                <p className="text-xl font-bold text-gray-800">
                  {contactedProperties.filter(p => p.priority === 'high').length}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Content */}
        {contactedProperties.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-6">📞</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-4">No Contacted Properties</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              You haven't contacted any properties yet. Start exploring and contact property owners to see them here.
            </p>
            <Link 
              to="/properties"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors font-medium inline-block"
            >
              Browse Properties
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {contactedProperties.map((contact) => (
              <div key={contact.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Property Image */}
                    <div className="lg:w-64 flex-shrink-0">
                      <div className="relative overflow-hidden rounded-lg">
                        <img 
                          src={contact.property.image} 
                          alt={contact.property.title}
                          className="w-full h-48 lg:h-40 object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <button
                          onClick={(e) => handleToggleFavorite(contact.propertyId, e)}
                          className="absolute top-3 right-3 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all"
                        >
                          <svg 
                            className={`w-5 h-5 ${favorites.includes(contact.propertyId) ? 'text-red-500 fill-current' : 'text-gray-600'}`} 
                            fill={favorites.includes(contact.propertyId) ? 'currentColor' : 'none'} 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                        <div className="absolute bottom-3 left-3 bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold">
                          {contact.property.type}
                        </div>
                      </div>
                    </div>

                    {/* Property Details */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-600 cursor-pointer"
                              onClick={() => handleViewProperty(contact.propertyId)}>
                            {contact.property.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2 flex items-center">
                            <span className="mr-1">📍</span>
                            {contact.property.location}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <span className="flex items-center">
                              <span className="mr-1">💰</span>
                              {contact.property.price}
                            </span>
                            <span className="flex items-center">
                              <span className="mr-1">📐</span>
                              {contact.property.area}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:items-end gap-2">
                          <div className="flex gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(contact.status)}`}>
                              {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(contact.priority)}`}>
                              {contact.priority.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">
                            Contacted on {formatDate(contact.contactDate)}
                          </p>
                        </div>
                      </div>

                      {/* Contact Details */}
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Contact Details</h4>
                            <p className="text-sm text-gray-600 mb-1">
                              <span className="font-medium">Agent:</span> {contact.agentName}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                              <span className="font-medium">Phone:</span> {contact.agentPhone}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Time:</span> {contact.contactTime}
                            </p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Timeline</h4>
                            {contact.responseTime && (
                              <p className="text-sm text-gray-600 mb-1">
                                <span className="font-medium">Response:</span> {contact.responseTime}
                              </p>
                            )}
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Last Follow-up:</span> {formatDate(contact.lastFollowUp)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Your Message</h4>
                        <p className="text-gray-700 text-sm bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                          "{contact.message}"
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3">
                        <button 
                          onClick={() => handleViewProperty(contact.propertyId)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors font-medium"
                        >
                          View Property
                        </button>
                        
                        <button 
                          onClick={() => showNotification('Follow-up sent successfully', 'success', 2000)}
                          className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-lg text-sm transition-colors font-medium"
                        >
                          Follow Up
                        </button>
                        
                        <button 
                          onClick={() => showNotification(`Calling ${contact.agentName}...`, 'info', 2000)}
                          className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-4 py-2 rounded-lg text-sm transition-colors font-medium flex items-center"
                        >
                          <span className="mr-1">📞</span>
                          Call Agent
                        </button>
                        
                        {contact.status === 'pending' && (
                          <button 
                            onClick={() => showNotification('Reminder sent to agent', 'success', 2000)}
                            className="border border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-4 py-2 rounded-lg text-sm transition-colors font-medium"
                          >
                            Send Reminder
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/properties"
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <span className="text-2xl">🔍</span>
              <div>
                <h4 className="font-medium text-gray-800">Browse Properties</h4>
                <p className="text-gray-600 text-sm">Discover more properties to contact</p>
              </div>
            </Link>
            
            <Link
              to="/shortlisted"
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <span className="text-2xl">❤️</span>
              <div>
                <h4 className="font-medium text-gray-800">Shortlisted</h4>
                <p className="text-gray-600 text-sm">View your favorite properties</p>
              </div>
            </Link>
            
            <Link
              to="/activity"
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <span className="text-2xl">📊</span>
              <div>
                <h4 className="font-medium text-gray-800">Activity</h4>
                <p className="text-gray-600 text-sm">View complete activity history</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactedProperty;