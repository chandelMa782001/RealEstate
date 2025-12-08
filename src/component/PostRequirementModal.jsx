import React, { useState } from 'react';
import './PostRequirementModal.css';
const PostRequirementModal = ({ isOpen, onClose }) => {
  const [propertyCategory, setPropertyCategory] = useState('Residential');
  const [propertySubType, setPropertySubType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    propertyType: 'Buy',
    budget: '',
    location: '',
    requirements: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Requirement submitted:', { ...formData, propertyCategory, propertySubType });
    alert('Your requirement has been submitted successfully!');
    onClose();
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
                placeholder="Enter Email number"
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

          <button type="submit" className="submit-btn">
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostRequirementModal;