import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';

const PropertyEvalution = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    propertyType: 'Residential Apartment',
    location: '',
    area: '',
    bedrooms: '',
    totalFloors: '',
    floorNumber: '',
    coveredParking: '',
    openParking: '',
    propertyAge: '',
    furnishing: '',
    facing: '',
    ownerName: '',
    phone: '',
    email: ''
  });

  const [uploadedImages, setUploadedImages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [estimatedValue, setEstimatedValue] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const propertyTypes = [
    'Residential Apartment',
    'Independent House/Villa',
    'Builder Floor Apartment',
    'Residential Plot',
    'Commercial Office Space',
    'Commercial Shop',
    'Commercial Plot'
  ];

  const bedroomOptions = ['1 RK', '1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK', '5+ BHK'];
  const parkingOptions = ['0', '1', '2', '3', '4', '5+'];
  const furnishingOptions = ['Unfurnished', 'Semi-Furnished', 'Fully Furnished'];
  const facingOptions = ['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEstimateClick = () => {
    if (!formData.location.trim()) {
      alert('Please enter a location');
      return;
    }
    setShowForm(true);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const maxFiles = 5;
    
    if (uploadedImages.length + files.length > maxFiles) {
      alert(`You can upload maximum ${maxFiles} images`);
      return;
    }

    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedImages(prev => [...prev, {
            id: Date.now() + Math.random(),
            file: file,
            preview: e.target.result,
            name: file.name
          }]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (imageId) => {
    setUploadedImages(prev => prev.filter(img => img.id !== imageId));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateEstimate();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateEstimate = () => {
    // Enhanced estimation logic based on property details
    let basePrice = 0;
    
    switch (formData.propertyType) {
      case 'Residential Apartment':
        basePrice = 6000;
        break;
      case 'Independent House/Villa':
        basePrice = 8500;
        break;
      case 'Builder Floor Apartment':
        basePrice = 7000;
        break;
      case 'Residential Plot':
        basePrice = 4000;
        break;
      case 'Commercial Office Space':
        basePrice = 15000;
        break;
      case 'Commercial Shop':
        basePrice = 18000;
        break;
      case 'Commercial Plot':
        basePrice = 8000;
        break;
      default:
        basePrice = 6000;
    }

    const area = parseInt(formData.area) || 1000;
    const bedroomMultiplier = {
      '1 RK': 0.8,
      '1 BHK': 0.9,
      '2 BHK': 1.0,
      '3 BHK': 1.2,
      '4 BHK': 1.4,
      '5 BHK': 1.6,
      '5+ BHK': 1.8
    };

    const furnishingMultiplier = {
      'Unfurnished': 1.0,
      'Semi-Furnished': 1.1,
      'Fully Furnished': 1.2
    };

    const facingMultiplier = {
      'North': 1.05,
      'East': 1.03,
      'South': 1.0,
      'West': 0.98,
      'North-East': 1.08,
      'North-West': 1.02,
      'South-East': 1.01,
      'South-West': 0.99
    };

    const parkingBonus = (parseInt(formData.coveredParking) || 0) * 0.05 + (parseInt(formData.openParking) || 0) * 0.02;
    const floorBonus = Math.max(0, (parseInt(formData.floorNumber) || 1) - 1) * 0.01;
    const ageReduction = (parseInt(formData.propertyAge) || 0) * 0.02;
    const imageBonus = uploadedImages.length * 0.01; // Bonus for providing images

    const finalPrice = basePrice * area * 
      (bedroomMultiplier[formData.bedrooms] || 1) * 
      (furnishingMultiplier[formData.furnishing] || 1) *
      (facingMultiplier[formData.facing] || 1) *
      (1 + parkingBonus + floorBonus + imageBonus - ageReduction);
    
    setEstimatedValue(Math.round(finalPrice));
    setShowResult(true);
  };

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lac`;
    } else {
      return `₹${price.toLocaleString()}`;
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setShowResult(false);
    setEstimatedValue(null);
    setCurrentStep(1);
    setUploadedImages([]);
    setFormData({
      propertyType: 'Residential Apartment',
      location: '',
      area: '',
      bedrooms: '',
      totalFloors: '',
      floorNumber: '',
      coveredParking: '',
      openParking: '',
      propertyAge: '',
      furnishing: '',
      facing: '',
      ownerName: '',
      phone: '',
      email: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />
      
      
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 pt-20 pb-20 relative overflow-hidden">
      
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>
        
       
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 text-white opacity-10 animate-bounce">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
          </div>
          <div className="absolute top-1/3 right-1/4 text-white opacity-10 animate-bounce animation-delay-1000">
            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
        
            <div className="mb-8 relative">
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3v18h18v-2H5V3H3zm4 14h2V9H7v8zm4 0h2V7h-2v10zm4 0h2v-6h-2v6z"/>
                  <path d="M12 2l3 3-3 3-3-3z"/>
                </svg>
              </div>
              <div className="absolute inset-0 w-24 h-24 mx-auto bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-ping opacity-20"></div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              Discover Your Property's
              <span className="block bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                True Value
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              Get AI-powered property valuations with advanced market analysis, 
              <span className="text-yellow-300 font-semibold"> upload photos</span> for better accuracy
            </p>

            {/* Enhanced Search Bar */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-4 border border-white/20">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <select
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleInputChange}
                        className="w-full p-4 border-0 focus:ring-0 text-gray-700 bg-transparent rounded-xl font-medium"
                      >
                        {propertyTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                     
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="relative">
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Enter your property location..."
                        className="w-full p-4 pl-12 border-0 focus:ring-0 text-gray-700 bg-transparent rounded-xl font-medium placeholder-gray-400"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        📍
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleEstimateClick}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    ✨ Get Instant Valuation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {!showForm && !showResult && (
          <div className="text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to discover your property's worth?</h2>
              <p className="text-xl text-gray-600 mb-12">Our AI-powered valuation system analyzes market trends, location data, and property features to give you the most accurate estimate.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="text-5xl mb-4">🎯</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Accurate Pricing</h3>
                  <p className="text-gray-600">AI-powered analysis for precise valuations</p>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="text-5xl mb-4">📸</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Photo Analysis</h3>
                  <p className="text-gray-600">Upload images for enhanced accuracy</p>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="text-5xl mb-4">⚡</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Instant Results</h3>
                  <p className="text-gray-600">Get your valuation in seconds</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {showForm && !showResult && (
          <div className="max-w-5xl mx-auto">
            {/* Progress Steps */}
            <div className="mb-12">
              <div className="flex items-center justify-center mb-8">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                      currentStep >= step 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step}
                    </div>
                    {step < 3 && (
                      <div className={`h-2 w-20 mx-4 rounded-full transition-all ${
                        currentStep > step ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-center text-sm font-medium">
                <div className="flex space-x-24">
                  <span className={currentStep >= 1 ? 'text-purple-600' : 'text-gray-400'}>Property Details</span>
                  <span className={currentStep >= 2 ? 'text-purple-600' : 'text-gray-400'}>Features & Photos</span>
                  <span className={currentStep >= 3 ? 'text-purple-600' : 'text-gray-400'}>Contact Info</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white">
                <h2 className="text-3xl font-bold mb-2">
                  {currentStep === 1 && "Tell us about your property"}
                  {currentStep === 2 && "Property features & photos"}
                  {currentStep === 3 && "Almost done! Contact details"}
                </h2>
                <p className="text-purple-100">
                  {currentStep === 1 && "Basic information about your property"}
                  {currentStep === 2 && "Add photos and additional features for better accuracy"}
                  {currentStep === 3 && "We'll send you a detailed valuation report"}
                </p>
              </div>
              
              <div className="p-8">
                {/* Step 1: Basic Details */}
                {currentStep === 1 && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-3">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Property Type</label>
                        <select
                          name="propertyType"
                          value={formData.propertyType}
                          onChange={handleInputChange}
                          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        >
                          {propertyTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Bedrooms</label>
                        <select
                          name="bedrooms"
                          value={formData.bedrooms}
                          onChange={handleInputChange}
                          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        >
                          <option value="">Select</option>
                          {bedroomOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Area (Sq. Ft.)</label>
                        <input
                          type="number"
                          name="area"
                          value={formData.area}
                          onChange={handleInputChange}
                          placeholder="Enter area"
                          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Property Age (Years)</label>
                        <input
                          type="number"
                          name="propertyAge"
                          value={formData.propertyAge}
                          onChange={handleInputChange}
                          placeholder="Age in years"
                          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Total Floors</label>
                        <input
                          type="number"
                          name="totalFloors"
                          value={formData.totalFloors}
                          onChange={handleInputChange}
                          placeholder="Total floors"
                          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Floor Number</label>
                        <input
                          type="number"
                          name="floorNumber"
                          value={formData.floorNumber}
                          onChange={handleInputChange}
                          placeholder="Floor number"
                          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Features & Photos */}
                {currentStep === 2 && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Furnishing</label>
                        <select
                          name="furnishing"
                          value={formData.furnishing}
                          onChange={handleInputChange}
                          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        >
                          <option value="">Select</option>
                          {furnishingOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Facing Direction</label>
                        <select
                          name="facing"
                          value={formData.facing}
                          onChange={handleInputChange}
                          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        >
                          <option value="">Select</option>
                          {facingOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Covered Parking</label>
                        <select
                          name="coveredParking"
                          value={formData.coveredParking}
                          onChange={handleInputChange}
                          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        >
                          <option value="">Select</option>
                          {parkingOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Image Upload Section */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-dashed border-purple-200">
                      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        📸 Upload Property Photos
                        <span className="ml-2 text-sm font-normal text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                          +1% accuracy boost per photo
                        </span>
                      </h3>
                      <p className="text-gray-600 mb-6">Add up to 5 photos of your property for better valuation accuracy</p>
                      
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        multiple
                        accept="image/*"
                        className="hidden"
                      />
                      
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 mb-6"
                      >
                        📷 Choose Photos
                      </button>

                      {/* Image Preview Grid */}
                      {uploadedImages.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                          {uploadedImages.map((image) => (
                            <div key={image.id} className="relative group">
                              <img
                                src={image.preview}
                                alt={image.name}
                                className="w-full h-24 object-cover rounded-lg shadow-md"
                              />
                              <button
                                onClick={() => removeImage(image.id)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 3: Contact Info */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Full Name</label>
                        <input
                          type="text"
                          name="ownerName"
                          value={formData.ownerName}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter phone number"
                          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter email address"
                          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-12">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`px-8 py-4 rounded-xl font-semibold transition-all ${
                      currentStep === 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-600 text-white hover:bg-gray-700 transform hover:scale-105'
                    }`}
                  >
                    ← Previous
                  </button>
                  
                  <button
                    onClick={nextStep}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    {currentStep === 3 ? '✨ Get My Valuation' : 'Next →'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showResult && (
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="text-center p-12">
                <div className="bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 text-white p-12 rounded-3xl mb-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                  <div className="relative z-10">
                    <div className="text-6xl mb-4">🎉</div>
                    <h2 className="text-4xl font-bold mb-6">Valuation Complete!</h2>
                    <div className="text-7xl font-bold mb-4">{formatPrice(estimatedValue)}</div>
                    <p className="text-xl text-green-100">Estimated Market Value</p>
                    {uploadedImages.length > 0 && (
                      <div className="mt-4 text-sm bg-white/20 rounded-full px-4 py-2 inline-block">
                        📸 Enhanced with {uploadedImages.length} photo{uploadedImages.length > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Property Summary</h3>
                    <div className="space-y-4 text-left">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-semibold">{formData.propertyType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Area:</span>
                        <span className="font-semibold">{formData.area} sq.ft</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bedrooms:</span>
                        <span className="font-semibold">{formData.bedrooms || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Floor:</span>
                        <span className="font-semibold">{formData.floorNumber || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Facing:</span>
                        <span className="font-semibold">{formData.facing || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Valuation Factors</h3>
                    <div className="space-y-3 text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">📍 Location Premium</span>
                        <span className="text-green-600 font-semibold">+5%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">🏠 Property Type</span>
                        <span className="text-blue-600 font-semibold">Base Rate</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">🛏️ Bedroom Config</span>
                        <span className="text-purple-600 font-semibold">+{((formData.bedrooms === '3 BHK' ? 1.2 : 1.0) - 1) * 100}%</span>
                      </div>
                      {uploadedImages.length > 0 && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">📸 Photo Bonus</span>
                          <span className="text-green-600 font-semibold">+{uploadedImages.length}%</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">🧭 Facing Direction</span>
                        <span className="text-indigo-600 font-semibold">+{formData.facing === 'North' ? '5' : '0'}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => navigate('/properties')}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    🔍 Browse Similar Properties
                  </button>
                  <button
                    onClick={() => navigate('/post-property')}
                    className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    📝 List Your Property
                  </button>
                  <button
                    onClick={resetForm}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    🔄 New Valuation
                  </button>
                </div>
              </div>
            </div>

            {/* Enhanced Trends Section */}
            <div className="mt-16 bg-white rounded-3xl shadow-2xl border border-gray-100 p-12">
              <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">📊 Market Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
                  <div className="text-4xl mb-4">📈</div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">Price Trend</h4>
                  <p className="text-green-600 font-bold text-2xl">+12%</p>
                  <p className="text-gray-600 text-sm">vs last year</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl">
                  <div className="text-4xl mb-4">🏘️</div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">Area Demand</h4>
                  <p className="text-blue-600 font-bold text-2xl">High</p>
                  <p className="text-gray-600 text-sm">in your locality</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
                  <div className="text-4xl mb-4">⏱️</div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">Avg. Sale Time</h4>
                  <p className="text-purple-600 font-bold text-2xl">45 days</p>
                  <p className="text-gray-600 text-sm">in this area</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default PropertyEvalution;