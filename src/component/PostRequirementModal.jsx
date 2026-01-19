import React, { useState } from 'react';
import './PostRequirementModal.css';
import api from '../apiServcies/axios';
import toast from 'react-hot-toast';
const PostRequirementModal = ({ isOpen, onClose }) => {
  const [propertyCategory, setPropertyCategory] = useState('Residential');
  const [propertySubType, setPropertySubType] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    propertyType: 'Buy',
    budget: '',
    location: '',
    requirements: ''
  });

  const propertyTypes = {
    Residential: ['FLAT', 'VILLA', 'PLOT', 'HOUSE'],
    Commercial: ['OFFICE', 'SHOP', 'WAREHOUSE', 'SHOWROOM']
  };

  // Function to get coordinates from address
  // const getCoordinatesFromAddress = async (address) => {
  //   try {
  //     // Using a simple geocoding approach - you might want to use Google Maps API
  //     const response = await fetch(
  //       `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
  //     );
  //     const data = await response.json();
      
  //     if (data && data.length > 0) {
  //       return {
  //         latitude: parseFloat(data[0].lat),
  //         longitude: parseFloat(data[0].lon),
  //         placeId: `ChIJ${data[0].place_id || Math.random().toString(36).substr(2, 20)}`
  //       };
  //     }
      
  //     // Default coordinates (Kolkata) if geocoding fails
  //     return {
  //       latitude: 22.5726,
  //       longitude: 88.3639,
  //       placeId: 'ChIJrTLr-GyuEmsRBfy61i59si0'
  //     };
  //   } catch (error) {
  //     console.error('Geocoding error:', error);
  //     return {
  //       latitude: 22.5726,
  //       longitude: 88.3639,
  //       placeId: 'ChIJrTLr-GyuEmsRBfy61i59si0'
  //     };
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!propertySubType) {
      toast.error('Please select a property sub-type');
      return;
    }

    setLoading(true);
    
    try {
      // Get coordinates from location
      // const coordinates = await getCoordinatesFromAddress(formData.location);
      
      // Prepare payload according to API structure
      const payload = {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        listingType: formData.propertyType.toUpperCase(), // BUY or RENT
        propertyType: propertySubType, // FLAT, VILLA, etc.
        budget: parseInt(formData.budget) || 0,
        // latitude: coordinates.latitude,
        // longitude: coordinates.longitude,
        address: formData.location,
        // placeId: coordinates.placeId,
        description: formData.requirements
      };

      console.log('Submitting requirement:', payload);
      console.log('API Path:', `${api.defaults.baseURL}/requirements/post-requirement`);
      console.log('Payload JSON:', JSON.stringify(payload, null, 2));
      
      const response = await api.post('/requirements/post-requirement', payload);
      
      if (response.data) {
        toast.success('Your requirement has been submitted successfully!');
        onClose();
        // Reset form
        setFormData({
          name: '',
          email: '',
          mobile: '',
          propertyType: 'Buy',
          budget: '',
          location: '',
          requirements: ''
        });
        setPropertyCategory('Residential');
        setPropertySubType('');
      }
    } catch (error) {
      console.error('Error submitting requirement:', error);
      console.error('Error response data:', error.response?.data);
      console.error('Error response status:', error.response?.status);
      console.error('Error response headers:', error.response?.headers);
      
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to submit requirement. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  if (!isOpen) return null;
  return (
    <div className="requirement-modal-overlay" onClick={onClose}>
      <div className="requirement-modal" onClick={(e) => e.stopPropagation()}>
        <button className="requirement-modal-close" onClick={onClose}>
          ×
        </button>
        <h2 className="requirement-title">Post Your Requirement</h2>
        <form onSubmit={handleSubmit} className="requirement-form">
          <div className="form-row">
            <div className="input-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
              <span className="input-icon">👤</span>
            </div>
          
            <div className="input-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email address"
                required
              />
              <span className="input-icon">✉️</span>
            </div>
          </div>
          <div className="input-group full-width">
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
              required
            />
            <span className="input-icon">📱</span>
          </div>

          <div className="property-type-section">
            <label className="section-label">
              Property Type
              <span className="dropdown-arrow">▼</span>
            </label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="propertyType"
                  value="Buy"
                  checked={formData.propertyType === 'Buy'}
                  onChange={handleChange}
                />
                <span className="radio-custom"></span>
                Buy
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="propertyType"
                  value="Rent"
                  checked={formData.propertyType === 'Rent'}
                  onChange={handleChange}
                />
                <span className="radio-custom"></span>
                Rent
              </label>
            </div>
          </div>

          <div className="property-type-section">
            <label className="section-label">
              Property Category
              <span className="dropdown-arrow">▼</span>
            </label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="propertyCategory"
                  value="Residential"
                  checked={propertyCategory === 'Residential'}
                  onChange={(e) => {
                    setPropertyCategory(e.target.value);
                    setPropertySubType(''); // Reset sub-type when category changes
                  }}
                />
                <span className="radio-custom"></span>
                Residential
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="propertyCategory"
                  value="Commercial"
                  checked={propertyCategory === 'Commercial'}
                  onChange={(e) => {
                    setPropertyCategory(e.target.value);
                    setPropertySubType(''); // Reset sub-type when category changes
                  }}
                />
                <span className="radio-custom"></span>
                Commercial
              </label>
            </div>
          </div>

          <div className="input-group full-width">
            <select
              name="propertySubType"
              value={propertySubType}
              onChange={(e) => setPropertySubType(e.target.value)}
              required
              className="property-subtype-select"
            >
              <option value="">Select Property Sub-Type</option>
              {propertyTypes[propertyCategory]?.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <span className="input-icon">🏠</span>
          </div>
          <div className="form-row">
            <div className="input-group">
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="Enter Budget"
                required
              />
              <span className="input-icon">💰</span>
            </div>
            
            <div className="input-group">
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter Location"
                required
              />
              <span className="input-icon">📍</span>
            </div>
          </div>

          <div className="textarea-group">
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              placeholder="Requirements"
              rows="4"
              required
            />
            <span className="textarea-icon">✏️</span>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'SUBMITTING...' : 'SUBMIT'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostRequirementModal;