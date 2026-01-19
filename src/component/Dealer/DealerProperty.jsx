import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const DealerProperty = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);

  // Mock data - replace with actual API call
  const mockProperties = [
    {
      id: 1,
      title: "Luxury Villa in Bandra",
      location: "Bandra West, Mumbai",
      price: "₹2.5 Cr",
      type: "Villa",
      status: "active",
      beds: 4,
      baths: 3,
      area: "2500 sq ft",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400",
      postedDate: "2024-01-15",
      views: 245,
      inquiries: 12
    },
    {
      id: 2,
      title: "Modern Apartment in Andheri",
      location: "Andheri East, Mumbai",
      price: "₹1.2 Cr",
      type: "Apartment",
      status: "sold",
      beds: 2,
      baths: 2,
      area: "1200 sq ft",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
      postedDate: "2024-01-10",
      views: 189,
      inquiries: 8
    },
    {
      id: 3,
      title: "Commercial Space in BKC",
      location: "Bandra Kurla Complex, Mumbai",
      price: "₹5.8 Cr",
      type: "Commercial",
      status: "pending",
      beds: null,
      baths: 2,
      area: "3500 sq ft",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400",
      postedDate: "2024-01-20",
      views: 156,
      inquiries: 15
    }
  ];

  useEffect(() => {
    // Simulate API call
    const loadingToast = toast.loading('Loading your properties...');
    
    setTimeout(() => {
      setProperties(mockProperties);
      setFilteredProperties(mockProperties);
      setLoading(false);
      toast.dismiss(loadingToast);
      toast.success(`Loaded ${mockProperties.length} properties successfully!`);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = properties;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(property => property.status === filterStatus);
    }

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(property => property.type.toLowerCase() === filterType.toLowerCase());
    }

    setFilteredProperties(filtered);

    // Show toast for filter results (only if filters are applied and not initial load)
    if (properties.length > 0 && (searchTerm || filterStatus !== 'all' || filterType !== 'all')) {
      if (filtered.length === 0) {
        toast('No properties match your filters', { icon: '🔍' });
      } else if (filtered.length !== properties.length) {
        toast(`Found ${filtered.length} matching properties`, { icon: '✅' });
      }
    }
  }, [searchTerm, filterStatus, filterType, properties]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'sold': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return '✅';
      case 'pending': return '⏳';
      case 'sold': return '✔️';
      default: return '❓';
    }
  };

  const handleDeleteProperty = (property) => {
    setPropertyToDelete(property);
    setShowDeleteModal(true);
    toast('⚠️ Confirm deletion to proceed', {
      style: {
        background: '#fef3c7',
        color: '#92400e',
        border: '1px solid #fbbf24',
      }
    });
  };

  const confirmDelete = () => {
    setProperties(properties.filter(p => p.id !== propertyToDelete.id));
    setShowDeleteModal(false);
    setPropertyToDelete(null);
    toast.success(`Property "${propertyToDelete.title}" deleted successfully!`);
  };

  const handleEditProperty = (propertyId) => {
    toast('Redirecting to edit property...', { icon: '✏️' });
    navigate(`/dealer/edit-property/${propertyId}`);
  };

  const handleViewProperty = (propertyId) => {
    toast('Opening property details...', { icon: '👁️' });
    navigate(`/property/${propertyId}`);
  };

  const handleAddProperty = () => {
    toast('Redirecting to add new property...', { icon: '🏠' });
    navigate('/post-property');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Properties</h1>
          <p className="text-gray-600">Manage your property listings</p>
        </div>
        <button
          onClick={handleAddProperty}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
          </svg>
          Add New Property
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Properties</p>
              <p className="text-2xl font-bold text-gray-900">{properties.length}</p>
            </div>
            <div className="text-2xl">🏢</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Listings</p>
              <p className="text-2xl font-bold text-green-600">
                {properties.filter(p => p.status === 'active').length}
              </p>
            </div>
            <div className="text-2xl">✅</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-blue-600">
                {properties.reduce((sum, p) => sum + p.views, 0)}
              </p>
            </div>
            <div className="text-2xl">👁️</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Inquiries</p>
              <p className="text-2xl font-bold text-purple-600">
                {properties.reduce((sum, p) => sum + p.inquiries, 0)}
              </p>
            </div>
            <div className="text-2xl">📞</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="sold">Sold</option>
          </select>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>
      </div>
      {/* Properties Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <div key={property.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                  {getStatusIcon(property.status)} {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                </span>
              </div>
              <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                {property.type}
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{property.title}</h3>
              <p className="text-gray-600 text-sm mb-3 flex items-center">
                <span className="mr-1">📍</span>
                {property.location}
              </p>

              <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
                {property.beds && <span>🛏️ {property.beds} Beds</span>}
                {property.baths && <span>🚿 {property.baths} Baths</span>}
                <span>📐 {property.area}</span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold text-orange-500">{property.price}</span>
                <div className="text-xs text-gray-500">
                  Posted: {new Date(property.postedDate).toLocaleDateString()}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between mb-4 p-2 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-900">{property.views}</div>
                  <div className="text-xs text-gray-600">Views</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-900">{property.inquiries}</div>
                  <div className="text-xs text-gray-600">Inquiries</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-900">4.5</div>
                  <div className="text-xs text-gray-600">Rating</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleViewProperty(property.id)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm transition-colors"
                >
                  View
                </button>
                <button
                  onClick={() => handleEditProperty(property.id)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProperty(property)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏠</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || filterStatus !== 'all' || filterType !== 'all'
              ? 'Try adjusting your filters to see more properties.'
              : 'Start by adding your first property listing.'}
          </p>
          <button
            onClick={handleAddProperty}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Add Property
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)'
          }}
        >
          <div 
            className="rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <div className="text-center">
              <div className="text-4xl mb-4">⚠️</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Property</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{propertyToDelete?.title}"? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    toast('Deletion cancelled', { icon: '❌' });
                  }}
                  className="flex-1 px-4 py-2 rounded-lg transition-colors"
                  style={{
                    backgroundColor: 'rgba(243, 244, 246, 0.8)',
                    color: '#374151'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(229, 231, 235, 0.8)'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(243, 244, 246, 0.8)'}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2 rounded-lg transition-colors text-white"
                  style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.9)'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(220, 38, 38, 0.9)'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.9)'}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DealerProperty;