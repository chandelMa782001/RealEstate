import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import toast from 'react-hot-toast';
import { saveUserDetails, saveBasicInfo, uploadPropertyImages, saveLocationDetails } from '../apiServcies/propertyApi';
import './PostProperty.css';
const PostProperty = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [propertyId, setPropertyId] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    userType: 'Owner',
    propertyType: '',
    propertyCategory: '',
    bedrooms: '',
    price: '',
    area: '',
    description: '',
    goldOffer: {
      enabled: false,
      goldAmount: '',
      goldDescription: ''
    },
    images: {
      exterior: [],
      interior: [],
      floorPlan: [],
      masterPlan: [],
      locationMap: []
    },
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [uploadPreviews, setUploadPreviews] = useState({
    exterior: [],
    interior: [],
    floorPlan: [],
    masterPlan: [],
    locationMap: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('📝 Form field changed:', { name, value });
    setFormData({ ...formData, [name]: value });
  };

  const handleGoldOfferChange = (field, value) => {
    console.log('🏆 Gold offer changed:', { field, value });
    setFormData(prev => ({
      ...prev,
      goldOffer: {
        ...prev.goldOffer,
        [field]: value
      }
    }));
  };

  // Calculate effective property price after gold deduction
  const getEffectivePrice = () => {
    const basePrice = parseFloat(formData.price) || 0;
    const goldAmount = formData.goldOffer.enabled ? (parseFloat(formData.goldOffer.goldAmount) || 0) : 0;
    return Math.max(0, basePrice - goldAmount);
  };

  const handleNext = async () => {
    if (loading) return;

    try {
      setLoading(true);
      console.log('➡️ Moving to next step. Current step:', currentStep);
      console.log('📋 Current form data:', formData);

      // Step 1: Save user details and get propertyId
      if (currentStep === 1) {
        if (!formData.fullName || !formData.mobile || !formData.email) {
          toast.error('Please fill all required fields');
          setLoading(false);
          return;
        }

        const userPayload = {
          fullName: formData.fullName,
          mobile: formData.mobile,
          email: formData.email,
          userType: formData.userType.toUpperCase()
        };

        console.log('🚀 Sending user details payload:', userPayload);
        const response = await saveUserDetails(userPayload);
        console.log('✅ User details response:', response);
        
        if (response.success && response.data.propertyId) {
          setPropertyId(response.data.propertyId);
          console.log('🆔 Property ID set:', response.data.propertyId);
          toast.success(response.data.message || 'User details saved successfully');
          setCurrentStep(2);
        }
      }
      
      // Step 2: Save basic info
      else if (currentStep === 2) {
        if (!propertyId) {
          toast.error('Property ID not found. Please restart the process.');
          setLoading(false);
          return;
        }

        if (!formData.propertyType || !formData.propertyCategory || !formData.bedrooms || !formData.price || !formData.area) {
          toast.error('Please fill all required fields');
          setLoading(false);
          return;
        }

        const basicInfoPayload = {
          propertyType: formData.propertyType.toUpperCase(),
          propertyCategory: formData.propertyCategory.toUpperCase(),
          rentalOption: 'BUY',
          bedrooms: `BHK_${formData.bedrooms}`,
          price: parseFloat(formData.price),
          areaSqft: parseFloat(formData.area),
          description: formData.description,
          hasGoldOffer: formData.goldOffer.enabled,
          goldWeight: formData.goldOffer.enabled ? parseFloat(formData.goldOffer.goldAmount) / 6000 : 0,
          goldPurity: formData.goldOffer.enabled ? 'K24' : null,
          estimatedGoldValue: formData.goldOffer.enabled ? parseFloat(formData.goldOffer.goldAmount) : 0,
          goldItemDesc: formData.goldOffer.enabled ? formData.goldOffer.goldDescription : null
        };

        console.log('🚀 Sending basic info payload:', basicInfoPayload);
        console.log('🆔 Property ID:', propertyId);
        const response = await saveBasicInfo(propertyId, basicInfoPayload);
        console.log('✅ Basic info response:', response);
        
        if (response.success) {
          toast.success(response.data.message || 'Basic info saved successfully');
          setCurrentStep(3);
        }
      }
      
      // Step 3: Move to location (images will be uploaded on final submit)
      else if (currentStep === 3) {
        setCurrentStep(4);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error in handleNext:', error);
      toast.error(error.response?.data?.message || 'Failed to save data. Please try again.');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleFileUpload = (category, files) => {
    const fileArray = Array.from(files);
    console.log('📸 Uploading files:', { 
      category, 
      fileCount: fileArray.length, 
      files: fileArray.map(f => ({ name: f.name, size: f.size, type: f.type }))
    });
    const newPreviews = fileArray.map(file => URL.createObjectURL(file));
    
    setUploadPreviews(prev => ({
      ...prev,
      [category]: [...prev[category], ...newPreviews]
    }));

    setFormData(prev => {
      const updated = {
        ...prev,
        images: {
          ...prev.images,
          [category]: [...prev.images[category], ...fileArray]
        }
      };
      console.log('📸 Updated images state:', {
        [category]: updated.images[category].length,
        allImages: Object.keys(updated.images).map(key => ({ [key]: updated.images[key].length }))
      });
      return updated;
    });
  };

  const removeImage = (category, index) => {
    setUploadPreviews(prev => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index)
    }));

    setFormData(prev => ({
      ...prev,
      images: {
        ...prev.images,
        [category]: prev.images[category].filter((_, i) => i !== index)
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (loading) return;

    try {
      setLoading(true);
      console.log('🎯 Final submit triggered');
      console.log('📋 Complete form data:', formData);
      console.log('🆔 Property ID:', propertyId);

      if (!propertyId) {
        toast.error('Property ID not found. Please restart the process.');
        setLoading(false);
        return;
      }

      // Step 3: Upload images (if any)
      const hasImages = Object.values(formData.images).some(arr => arr.length > 0);
      console.log('📸 Has images:', hasImages);
      console.log('📸 Images summary:', Object.keys(formData.images).map(key => ({ 
        [key]: formData.images[key].length 
      })));
      
      if (hasImages) {
        console.log('🚀 Uploading images...');
        console.log('📸 Images data:', formData.images);
        await uploadPropertyImages(propertyId, formData.images);
        console.log('✅ Images uploaded successfully');
        toast.success('Images uploaded successfully');
      }

      // Step 4: Save location details
      if (!formData.address || !formData.city || !formData.state || !formData.pincode) {
        toast.error('Please fill all location fields');
        setLoading(false);
        return;
      }

      const locationPayload = {
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode
      };

      console.log('🚀 Sending location payload:', locationPayload);
      const response = await saveLocationDetails(propertyId, locationPayload);
      console.log('✅ Location details response:', response);
      
      if (response.success) {
        toast.success('Property posted successfully! 🎉');
        console.log('🎉 Property posted successfully! Redirecting...');
        
        // Reset form and redirect after a short delay
        setTimeout(() => {
          navigate('/properties');
        }, 2000);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('❌ Error submitting property:', error);
      console.error('❌ Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      toast.error(error.response?.data?.message || 'Failed to submit property. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="post-property-page">
        <div className="post-property-header">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="post-property-title">Post Your Property</h1>
            <div className="breadcrumb">
              <Link to="/" className="breadcrumb-link">🏠 Home</Link>
              <span className="breadcrumb-separator">›</span>
              <span className="breadcrumb-current">Post Your Property</span>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
       
          <div className="steps-container">
            <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
              <div className="step-number">1</div>
              <div className="step-label">User Details</div>
            </div>
            <div className={`step-line ${currentStep >= 2 ? 'active' : ''}`}></div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
              <div className="step-number">2</div>
              <div className="step-label">Basic Information</div>
            </div>
            <div className={`step-line ${currentStep >= 3 ? 'active' : ''}`}></div>
            <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
              <div className="step-number">3</div>
              <div className="step-label">Media</div>
            </div>
            <div className={`step-line ${currentStep >= 4 ? 'active' : ''}`}></div>
            <div className={`step ${currentStep >= 4 ? 'active' : ''}`}>
              <div className="step-number">4</div>
              <div className="step-label">Location</div>
            </div>
          </div>

          <div className="form-card">
            <form onSubmit={handleSubmit}>
            
              {currentStep === 1 && (
                <div className="form-step">
                  <h2 className="form-step-title">User Details</h2>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Your Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Mobile Number</label>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="Enter mobile number"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>User Type</label>
                    <div className="user-type-buttons">
                      {['Owner', 'Agent', 'Builder'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          className={`user-type-btn ${formData.userType === type ? 'active' : ''}`}
                          onClick={() => setFormData({ ...formData, userType: type })}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

         
              {currentStep === 2 && (
                <div className="form-step">
                  <h2 className="form-step-title">Basic Information</h2>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Property Type</label>
                      <select name="propertyType" value={formData.propertyType} onChange={handleChange} required>
                        <option value="">Select Type</option>
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Plot">Plot/Land</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Property Category</label>
                      <select name="propertyCategory" value={formData.propertyCategory} onChange={handleChange} required>
                        <option value="">Select Category</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Villa">Villa</option>
                        <option value="House">Independent House</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Bedrooms</label>
                      <select name="bedrooms" value={formData.bedrooms} onChange={handleChange} required>
                        <option value="">Select</option>
                        <option value="1">1 BHK</option>
                        <option value="2">2 BHK</option>
                        <option value="3">3 BHK</option>
                        <option value="4">4 BHK</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Price (₹)</label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Enter price"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Area (sq ft)</label>
                    <input
                      type="number"
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      placeholder="Enter area"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe your property"
                      rows="4"
                      required
                    />
                  </div>

                  {/* Gold Offer Section */}
                  <div className="gold-offer-section">
                    <div className="gold-offer-header">
                      <div className="gold-offer-toggle">
                        <input
                          type="checkbox"
                          id="goldOfferEnabled"
                          checked={formData.goldOffer.enabled}
                          onChange={(e) => handleGoldOfferChange('enabled', e.target.checked)}
                          className="gold-checkbox"
                        />
                        <label htmlFor="goldOfferEnabled" className="gold-offer-label">
                          <span className="gold-icon">🏆</span>
                          <div className="gold-offer-text">
                            <h3>Include Gold Offer with Property</h3>
                            <p>Attract buyers by offering gold jewelry/coins that will reduce the property price</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    {formData.goldOffer.enabled && (
                      <div className="gold-offer-details">
                        <div className="gold-offer-card">
                          <h4 className="gold-details-title">Gold Offer Details</h4>
                          
                          <div className="form-group">
                            <label>Gold Offer Amount (₹)</label>
                            <input
                              type="number"
                              value={formData.goldOffer.goldAmount}
                              onChange={(e) => handleGoldOfferChange('goldAmount', e.target.value)}
                              placeholder="Enter gold offer amount (e.g., 5000)"
                              min="0"
                              className="gold-value-input"
                            />
                            <small className="gold-rate-info">
                              Enter the total value of gold you want to offer with this property
                            </small>
                          </div>

                          <div className="form-group">
                            <label>Gold Item Description</label>
                            <textarea
                              value={formData.goldOffer.goldDescription}
                              onChange={(e) => handleGoldOfferChange('goldDescription', e.target.value)}
                              placeholder="Describe the gold items (e.g., ₹5000 worth of 22K gold jewelry, gold coins worth ₹10000, etc.)"
                              rows="3"
                            />
                          </div>

                          {/* Price Summary */}
                          <div className="price-summary">
                            <div className="price-breakdown">
                              <div className="price-row">
                                <span>Original Property Price:</span>
                                <span className="price-amount">₹{formData.price ? parseFloat(formData.price).toLocaleString('en-IN') : '0'}</span>
                              </div>
                              <div className="price-row gold-deduction">
                                <span>Gold Offer Value:</span>
                                <span className="price-amount">- ₹{formData.goldOffer.goldAmount ? parseFloat(formData.goldOffer.goldAmount).toLocaleString('en-IN') : '0'}</span>
                              </div>
                              <div className="price-row total-price">
                                <span>Effective Property Price:</span>
                                <span className="price-amount">₹{getEffectivePrice().toLocaleString('en-IN')}</span>
                              </div>
                            </div>
                            <div className="gold-offer-benefits">
                              <h5>Benefits of Gold Offer:</h5>
                              <ul>
                                <li>✨ Attracts more buyers</li>
                                <li>💰 Reduces effective property cost</li>
                                <li>🏆 Premium listing feature</li>
                                <li>⚡ Faster property sale</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="form-step">
                  <h2 className="form-step-title">Upload Property Images</h2>
                  <p className="media-subtitle">Upload images for different views of your property</p>
                  
              
                  <div className="media-category">
                    <h3 className="media-category-title">🏠 Exterior View</h3>
                    <div className="upload-box">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleFileUpload('exterior', e.target.files)}
                        className="file-input-hidden"
                        id="exterior-upload"
                      />
                      <label htmlFor="exterior-upload" className="upload-label">
                        <div className="upload-icon-small">📷</div>
                        <span>Click to upload exterior images</span>
                      </label>
                      <div className="image-preview-grid">
                        {uploadPreviews.exterior.map((preview, index) => (
                          <div key={index} className="image-preview-item">
                            <img src={preview} alt={`Exterior ${index + 1}`} />
                            <button
                              type="button"
                              onClick={() => removeImage('exterior', index)}
                              className="remove-image-btn"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="media-category">
                    <h3 className="media-category-title">🛋️ Interior View</h3>
                    <div className="upload-box">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleFileUpload('interior', e.target.files)}
                        className="file-input-hidden"
                        id="interior-upload"
                      />
                      <label htmlFor="interior-upload" className="upload-label">
                        <div className="upload-icon-small">📷</div>
                        <span>Click to upload interior images</span>
                      </label>
                      <div className="image-preview-grid">
                        {uploadPreviews.interior.map((preview, index) => (
                          <div key={index} className="image-preview-item">
                            <img src={preview} alt={`Interior ${index + 1}`} />
                            <button
                              type="button"
                              onClick={() => removeImage('interior', index)}
                              className="remove-image-btn"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                 
                  <div className="media-category">
                    <h3 className="media-category-title">📐 Floor Plan</h3>
                    <div className="upload-box">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleFileUpload('floorPlan', e.target.files)}
                        className="file-input-hidden"
                        id="floorplan-upload"
                      />
                      <label htmlFor="floorplan-upload" className="upload-label">
                        <div className="upload-icon-small">📷</div>
                        <span>Click to upload floor plan</span>
                      </label>
                      <div className="image-preview-grid">
                        {uploadPreviews.floorPlan.map((preview, index) => (
                          <div key={index} className="image-preview-item">
                            <img src={preview} alt={`Floor Plan ${index + 1}`} />
                            <button
                              type="button"
                              onClick={() => removeImage('floorPlan', index)}
                              className="remove-image-btn"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

             
                  <div className="media-category">
                    <h3 className="media-category-title">🗺️ Master Plan</h3>
                    <div className="upload-box">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleFileUpload('masterPlan', e.target.files)}
                        className="file-input-hidden"
                        id="masterplan-upload"
                      />
                      <label htmlFor="masterplan-upload" className="upload-label">
                        <div className="upload-icon-small">📷</div>
                        <span>Click to upload master plan</span>
                      </label>
                      <div className="image-preview-grid">
                        {uploadPreviews.masterPlan.map((preview, index) => (
                          <div key={index} className="image-preview-item">
                            <img src={preview} alt={`Master Plan ${index + 1}`} />
                            <button
                              type="button"
                              onClick={() => removeImage('masterPlan', index)}
                              className="remove-image-btn"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                 
                  <div className="media-category">
                    <h3 className="media-category-title">📍 Location Map</h3>
                    <div className="upload-box">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleFileUpload('locationMap', e.target.files)}
                        className="file-input-hidden"
                        id="locationmap-upload"
                      />
                      <label htmlFor="locationmap-upload" className="upload-label">
                        <div className="upload-icon-small">📷</div>
                        <span>Click to upload location map</span>
                      </label>
                      <div className="image-preview-grid">
                        {uploadPreviews.locationMap.map((preview, index) => (
                          <div key={index} className="image-preview-item">
                            <img src={preview} alt={`Location Map ${index + 1}`} />
                            <button
                              type="button"
                              onClick={() => removeImage('locationMap', index)}
                              className="remove-image-btn"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="form-step">
                  <h2 className="form-step-title">Location Details</h2>
                  <div className="form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter full address"
                      required
                    />
                  </div>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Enter city"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="Enter state"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="Enter pincode"
                      required
                    />
                  </div>
                </div>
              )}
              <div className="form-navigation">
                {currentStep > 1 && (
                  <button type="button" onClick={handlePrevious} className="btn-secondary" disabled={loading}>
                    Previous
                  </button>
                )}
                {currentStep < 4 ? (
                  <button type="button" onClick={handleNext} className="btn-primary" disabled={loading}>
                    {loading ? 'Saving...' : 'Next'}
                  </button>
                ) : (
                  <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Property'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default PostProperty;