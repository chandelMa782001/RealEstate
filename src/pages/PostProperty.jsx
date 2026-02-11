import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import PropertyFormRenderer from '../components/PropertyForms/PropertyFormRenderer';
import toast from 'react-hot-toast';
import './PostProperty.css';
const PostProperty = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [step2Progress, setStep2Progress] = useState(1); // Track progress within step 2
  
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    userType: 'Owner',
    propertyType: '', // Residential/Commercial/Agriculture
    lookingTo: '', // Sell/Rent
    propertyCategory: '', // Plot/Apartment/etc
    plotType: '', // For plot subcategories
    projectTitle: '',
    reraNo: '',
    projectName: '',
    builderName: '',
    description: '',
    stage: 'Fresh Booking',
    possessionStatus: 'Ready to Move',
    ownership: 'Freehold',
    ageOfProperty: '',
    possessionFrom: '',
    totalCost: '',
    maintenanceCharges: '',
    builtupArea: '',
    carpetArea: '',
    plotNo: '',
    plotArea: '',
    plotLength: '',
    plotWidth: '',
    loanAvailability: 'No',
    totalFloors: '',
    yourFloor: '',
    brokerage: 'No',
    bhk: '',
    bathrooms: '',
    balcony: '0',
    furnished: 'Un-Furnished',
    facing: '',
    coveredParking: '0',
    openParking: '0',
    societyAmenities: [],
    internalAmenities: [],
    // Retail Shop specific fields
    taxGovtChargeIncluded: 'No',
    maintenanceChargeIncluded: 'No',
    privateWashroom: '',
    publicWashroom: '',
    privateParking: '',
    publicParking: '',
    locationHUB: '',
    zoneType: '',
    suitableFor: [],
    availableFrom: '',
    entranceWidth: '',
    ceilingHeight: '',
    securityDeposit: '',
    expectedRent: '',
    lockInPeriod: '',
    // Office specific fields
    negotiable: 'No',
    dgUpsChargeIncluded: 'No',
    waterChargeIncluded: 'No',
    noOfStairs: '',
    passengersLift: '',
    serviceLift: '',
    noOfSeats: '',
    noOfCabin: '',
    conferenceRoom: '',
    reception: '',
    // Agriculture specific fields
    agriculturePropertyType: '',
    areaUnit: 'Acre',
    pricePerUnit: '',
    district: '',
    tehsil: '',
    villageName: '',
    landmark: '',
    mapLocation: '',
    soilType: '',
    soilFertility: '',
    landUseType: '',
    currentCrop: '',
    lastCrop: '',
    waterSource: '',
    numberOfBorewells: '',
    waterLevel: '',
    electricityConnection: 'No',
    roadConnectivity: '',
    roadWidth: '',
    distanceFromMainRoad: '',
    tractorAccess: 'No',
    ownershipType: '',
    landRecordAvailable: 'No',
    clearTitle: 'No',
    disputeFree: 'No',
    conversionStatus: 'Agriculture',
    registryAvailable: 'No',
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

  // Log form data changes
  useEffect(() => {
    console.log('Form data updated:', formData);
  }, [formData]);

  // Property categories based on main type
  const propertyCategories = {
    'Residential': [
  "Flat/Apartment",
  "Independent/Builder Floor",
  "Independent House/Villa",
  "Residential Land/plot",
  "1 RK/ Studio Apartment",
  "Farm House",
  "Serviced Apartments",
  "Penthouse",
  "Duplex/Triples",
  "Row House",
  "Bungalow",
  "Gated Community Home",
  "service apartment",
  "Co-living Space",
  "PG / Hostel",
  "Luxury Residential Property",
  "Under Construction Property",
  "Other",
  "Plot",
  "Apartment",
  "Independent Floor",
  "Independent House",
  "Villa"
]
,
    'Commercial': ['Plot', 'Office', 'Retail Shop', 'Warehouse'],
    'Agriculture':['Agriculture Land']
  };
  // Plot types when Plot is selected
  const plotTypes = {
    'Residential': ['Residential Plot', 'Kisan Kota Plot', 'Farm House', 'Agriculture Land'],
    'Commercial': ['Commercial Plot', 'Industrial Plot']
  };
  const handlePropertyTypeSelect = (type) => {
    console.log('Property type selected:', type);
    setFormData(prev => ({ ...prev, propertyType: type, propertyCategory: '', plotType: '' }));
    setStep2Progress(2); // Move to looking to selection
  };

  const handleLookingToSelect = (option) => {
    console.log('Looking to selected:', option);
    setFormData(prev => ({ ...prev, lookingTo: option }));
    setStep2Progress(3); 
  };
  const handlePropertyCategorySelect = (category) => {
    console.log('Property category selected:', category);
    setFormData(prev => ({ ...prev, propertyCategory: category, plotType: '' }));
    if (category === 'Plot') {
      setStep2Progress(4); // Move to plot type selection
    } else {
      setStep2Progress(5); // Move to form fields
    }
  };
  const handlePlotTypeSelect = (plotType) => {
    console.log('Plot type selected:', plotType);
    setFormData(prev => ({ ...prev, plotType }));
    setStep2Progress(5); // Move to form fields
  };

  const [uploadPreviews, setUploadPreviews] = useState({
    exterior: [],
    interior: [],
    floorPlan: [],
    masterPlan: [],
    locationMap: []
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Form field changed: ${name} = ${value}`);
    setFormData({ ...formData, [name]: value });
  };
  const handleGoldOfferChange = (field, value) => {
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
    const basePrice = parseFloat(formData.totalCost) || 0;
    const goldAmount = formData.goldOffer.enabled ? (parseFloat(formData.goldOffer.goldAmount) || 0) : 0;
    return Math.max(0, basePrice - goldAmount);
  };
  const handleNext = () => {
    console.log(`Current step: ${currentStep}, Step 2 progress: ${step2Progress}`);
    console.log('Current form data at step navigation:', formData);
    // Simple validation for required fields
    if (currentStep === 1) {
      if (!formData.fullName || !formData.mobile || !formData.email) {
        toast.error('Please fill all required fields');
        return;
      }
      console.log('Step 1 completed - User details saved');
      toast.success('User details saved');
      setCurrentStep(2);
    }
    else if (currentStep === 2) {
      // Check if we've completed the step 2 workflow
      if (step2Progress < 5) {
        toast.error('Please complete all property selections');
        return;
      }
      // Validate based on property type
      if (formData.propertyCategory === 'Plot') {
        if (!formData.plotType) {
          toast.error('Please select plot type');
          return;
        }
      } else {
        if (!formData.bhk) {
          toast.error('Please select BHK');
          return;
        }
      }
      
      if (!formData.totalCost || !formData.description) {
        toast.error('Please fill all required fields');
        return;
      }
      
      console.log('Step 2 completed - Basic info saved');
      toast.success('Basic info saved');
      setCurrentStep(3);
    }
    else if (currentStep === 3) {
      console.log('Step 3 completed - Moving to location step');
      setCurrentStep(4);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleFileUpload = (category, files) => {
    const fileArray = Array.from(files);
    console.log(`Files uploaded for ${category}:`, fileArray.map(f => f.name));
    const newPreviews = fileArray.map(file => URL.createObjectURL(file));
    
    setUploadPreviews(prev => ({
      ...prev,
      [category]: [...prev[category], ...newPreviews]
    }));

    setFormData(prev => ({
      ...prev,
      images: {
        ...prev.images,
        [category]: [...prev.images[category], ...fileArray]
      }
    }));
    
    console.log(`Total ${category} images:`, fileArray.length + (formData.images[category]?.length || 0));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Console log the complete form data with enhanced formatting
    console.log('\n🏠 ===== POST PROPERTY FORM SUBMISSION =====');
    console.log('📅 Timestamp:', new Date().toLocaleString());
    console.log('\n📋 COMPLETE FORM DATA:');
    console.table(formData);
    
    console.log('\n👤 USER DETAILS:');
    console.table({
      'Full Name': formData.fullName,
      'Mobile': formData.mobile,
      'Email': formData.email,
      'User Type': formData.userType
    });
    
    console.log('\n🏢 PROPERTY INFORMATION:');
    console.table({
      'Property Type': formData.propertyType,
      'Looking To': formData.lookingTo,
      'Property Category': formData.propertyCategory,
      'Plot Type': formData.plotType || 'N/A',
      'BHK': formData.bhk || 'N/A',
      'Furnished': formData.furnished,
      'Facing': formData.facing || 'N/A'
    });
    
    console.log('\n💰 PRICING & FINANCIAL:');
    console.table({
      'Total Cost/Rent': formData.totalCost,
      'Maintenance Charges': formData.maintenanceCharges,
      'Security Deposit': formData.securityDeposit || 'N/A',
      'Expected Rent': formData.expectedRent || 'N/A',
      'Gold Offer Enabled': formData.goldOffer.enabled,
      'Gold Amount': formData.goldOffer.goldAmount || 'N/A',
      'Effective Price': formData.goldOffer.enabled ? getEffectivePrice() : formData.totalCost
    });
    
    console.log('\n📐 PROPERTY SPECIFICATIONS:');
    console.table({
      'Built-up Area': formData.builtupArea,
      'Carpet Area': formData.carpetArea || 'N/A',
      'Plot Area': formData.plotArea || 'N/A',
      'Plot Length': formData.plotLength || 'N/A',
      'Plot Width': formData.plotWidth || 'N/A',
      'Total Floors': formData.totalFloors,
      'Your Floor': formData.yourFloor,
      'Bathrooms': formData.bathrooms,
      'Balcony': formData.balcony,
      'Covered Parking': formData.coveredParking,
      'Open Parking': formData.openParking
    });
    
    console.log('\n🏗️ PROPERTY STATUS:');
    console.table({
      'Stage': formData.stage,
      'Possession Status': formData.possessionStatus,
      'Ownership': formData.ownership,
      'Age of Property': formData.ageOfProperty || 'N/A',
      'Possession From': formData.possessionFrom || 'N/A',
      'Available From': formData.availableFrom || 'N/A'
    });
    
    console.log('\n🏢 PROJECT DETAILS:');
    console.table({
      'Project Title': formData.projectTitle,
      'RERA No': formData.reraNo || 'N/A',
      'Project Name': formData.projectName || 'N/A',
      'Builder Name': formData.builderName || 'N/A'
    });
    
    console.log('\n✨ AMENITIES:');
    console.log('🏘️ Society Amenities:', formData.societyAmenities);
    console.log('🏠 Internal Amenities:', formData.internalAmenities);
    console.log('🛍️ Suitable For:', formData.suitableFor || []);
    
    console.log('\n📸 UPLOADED IMAGES:');
    Object.entries(formData.images).forEach(([category, files]) => {
      console.log(`${category.toUpperCase()}:`, files.length, 'files');
      if (files.length > 0) {
        console.log(`  - File names:`, files.map(f => f.name || 'Unknown'));
      }
    });
    
    console.log('\n🏆 GOLD OFFER DETAILS:');
    if (formData.goldOffer.enabled) {
      console.table({
        'Gold Amount': formData.goldOffer.goldAmount,
        'Gold Description': formData.goldOffer.goldDescription,
        'Original Price': formData.totalCost,
        'Effective Price': getEffectivePrice(),
        'Savings': formData.goldOffer.goldAmount
      });
    } else {
      console.log('Gold offer is disabled');
    }
    
    console.log('\n📍 LOCATION DETAILS:');
    console.table({
      'Address': formData.address,
      'City': formData.city,
      'State': formData.state,
      'Pincode': formData.pincode
    });
    
    console.log('\n🔧 ADDITIONAL SETTINGS:');
    console.table({
      'Brokerage': formData.brokerage,
      'Loan Availability': formData.loanAvailability,
      'Negotiable': formData.negotiable || 'N/A',
      'Location HUB': formData.locationHUB || 'N/A',
      'Zone Type': formData.zoneType || 'N/A'
    });
    
    console.log('\n📝 DESCRIPTION:');
    console.log(formData.description);
    
    console.log('\n🔍 FORM DATA SUMMARY:');
    const filledFields = Object.entries(formData).filter(([key, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === 'object' && value !== null) {
        return Object.values(value).some(v => v !== '' && v !== false && (Array.isArray(v) ? v.length > 0 : true));
      }
      return value !== '' && value !== null && value !== undefined;
    }).length;
    
    console.table({
      'Total Fields': Object.keys(formData).length,
      'Filled Fields': filledFields,
      'Completion Rate': `${Math.round((filledFields / Object.keys(formData).length) * 100)}%`,
      'Society Amenities Count': formData.societyAmenities.length,
      'Internal Amenities Count': formData.internalAmenities.length,
      'Total Images': Object.values(formData.images).reduce((total, files) => total + files.length, 0)
    });
    
    console.log('\n🏠 ===== END FORM SUBMISSION =====\n');
    
    // Simple validation for location fields
    if (!formData.address || !formData.city || !formData.state || !formData.pincode) {
      toast.error('Please fill all location fields');
      return;
    }

    // Show success message and redirect
    toast.success('Property posted successfully! 🎉');
    
    // Reset form and redirect after a short delay
    setTimeout(() => {
      navigate('/properties');
    }, 2000);
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
              {/* Step 1: User Details */}
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

              {/* Step 2: Property Information */}
              {currentStep === 2 && (
                <div className="form-step">
                  <h2 className="form-step-title">Property Information</h2>
                  
                  {/* Step 1: Choose Property Type (Residential/Commercial) */}
                  {step2Progress >= 1 && (
                    <div className="selection-section">
                      <h3 className="selection-title">Choose Property Type *</h3>
                      <div className="selection-buttons">
                        <button
                          type="button"
                          className={`selection-btn ${formData.propertyType === 'Residential' ? 'active' : ''}`}
                          onClick={() => handlePropertyTypeSelect('Residential')}
                        >
                          🏠 Residential
                        </button>
                        <button
                          type="button"
                          className={`selection-btn ${formData.propertyType === 'Commercial' ? 'active' : ''}`}
                          onClick={() => handlePropertyTypeSelect('Commercial')}
                        >
                          🏢 Commercial
                        </button>
                          <button
                          type="button"
                          className={`selection-btn ${formData.propertyType === 'Agriculture' ? 'active' : ''}`}
                          onClick={() => handlePropertyTypeSelect('Agriculture')}
                        >
                          Agriculture
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Select Looking to */}
                  {step2Progress >= 2 && formData.propertyType && (
                    <div className="selection-section">
                      <h3 className="selection-title">Select Looking to *</h3>
                      <div className="selection-buttons">
                        <button
                          type="button"
                          className={`selection-btn ${formData.lookingTo === 'Sell' ? 'active' : ''}`}
                          onClick={() => handleLookingToSelect('Sell')}
                        >
                          💰 Sell
                        </button>
                        <button
                          type="button"
                          className={`selection-btn ${formData.lookingTo === 'Rent' ? 'active' : ''}`}
                          onClick={() => handleLookingToSelect('Rent')}
                        >
                          🏠 Rent
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Choose Property Category */}
                  {step2Progress >= 3 && formData.lookingTo && (
                    <div className="selection-section">
                      <h3 className="selection-title">Choose Property Type *</h3>
                      <div className="property-category-grid">
                        {propertyCategories[formData.propertyType]?.map((category) => (
                          <button
                            key={category}
                            type="button"
                            className={`property-category-btn ${formData.propertyCategory === category ? 'active' : ''}`}
                            onClick={() => handlePropertyCategorySelect(category)}
                          >
                            <span className="category-icon">
                              {category === 'Plot' && '🏞️'}
                              {category === 'Apartment' && '🏢'}
                              {category === 'Independent Floor' && '🏠'}
                              {category === 'Independent House' && '🏡'}
                              {category === 'Villa' && '🏰'}
                              {category === 'Office' && '🏢'}
                              {category === 'Retail Shop' && '🏪'}
                              {category === 'Warehouse' && '🏭'}
                            </span>
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 4: Plot Type (only if Plot is selected) */}
                  {step2Progress >= 4 && formData.propertyCategory === 'Plot' && (
                    <div className="selection-section">
                      <h3 className="selection-title">Plot Type *</h3>
                      <div className="property-category-grid">
                        {plotTypes[formData.propertyType]?.map((plotType) => (
                          <button
                            key={plotType}
                            type="button"
                            className={`property-category-btn ${formData.plotType === plotType ? 'active' : ''}`}
                            onClick={() => handlePlotTypeSelect(plotType)}
                          >
                            <span className="category-icon">
                              {plotType === 'Residential Plot' && '🏠'}
                              {plotType === 'Kisan Kota Plot' && '🌾'}
                              {plotType === 'Farm House' && '🏡'}
                              {plotType === 'Agriculture Land' && '🌾'}
                              {plotType === 'Commercial Plot' && '🏢'}
                              {plotType === 'Industrial Plot' && '🏭'}
                            </span>
                            {plotType}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 5: Form Fields (after all selections are made) */}
                  {step2Progress >= 5 && (
                    <PropertyFormRenderer 
                      formData={formData}
                      setFormData={setFormData}
                      handleChange={handleChange}
                      handleGoldOfferChange={handleGoldOfferChange}
                      getEffectivePrice={getEffectivePrice}
                    />
                  )}
                </div>
              )}

              {/* Step 3: Media Upload */}
              {currentStep === 3 && (
                <div className="form-step">
                  <h2 className="form-step-title">Upload Property Images</h2>
                  <p className="media-subtitle">Upload images for different views of your property</p>
                  
                  {/* Exterior View */}
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

                  {/* Interior View */}
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

                  {/* Floor Plan */}
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
                        <span>Click to upload floor plan images</span>
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

                  {/* Master Plan */}
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
                        <span>Click to upload master plan images</span>
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

                  {/* Location Map */}
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
                        <span>Click to upload location map images</span>
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

              {/* Step 4: Location Details */}
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

              {/* Navigation Buttons */}
              <div className="form-navigation">
                {currentStep > 1 && (
                  <button type="button" onClick={handlePrevious} className="btn-secondary">
                    Previous
                  </button>
                )}
                {currentStep < 4 ? (
                  <button type="button" onClick={handleNext} className="btn-primary">
                    Next
                  </button>
                ) : (
                  <button type="submit" className="btn-primary">
                    Submit Property
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