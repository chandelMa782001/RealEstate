import { useState, useEffect } from 'react';
import { useAppContext } from '../../Context/AppContext';
const DealerProfile = ({ dealerData }) => {
  const { showNotification } = useAppContext();
  // State for profile data
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    mobile: '',
    company: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    experience: '',
    specialization: '',
    description: '',
    website: '',
    linkedIn: '',
    profileImage: null
  });

  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // Initialize profile data from dealerData (signup data)
  useEffect(() => {
    if (dealerData) {
      setProfileData(prev => ({
        ...prev,
        name: dealerData.name || '',
        email: dealerData.email || '',
        mobile: dealerData.mobile || '',
        // Load additional data from localStorage if exists
        ...JSON.parse(localStorage.getItem(`dealerProfile_${dealerData.id}`) || '{}')
      }));
    }
  }, [dealerData]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        showNotification('Image size should be less than 5MB', 'error');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setProfileData(prev => ({
          ...prev,
          profileImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Save profile data
  const handleSaveProfile = () => {
    // Validation
    if (!profileData.name || !profileData.email || !profileData.mobile) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }

    // Save to localStorage
    localStorage.setItem(`dealerProfile_${dealerData.id}`, JSON.stringify(profileData));
    
    // Update dealer data in main storage
    const storedDealers = JSON.parse(localStorage.getItem('dealerUsers') || '[]');
    const updatedDealers = storedDealers.map(dealer => 
      dealer.id === dealerData.id 
        ? { ...dealer, ...profileData }
        : dealer
    );
    localStorage.setItem('dealerUsers', JSON.stringify(updatedDealers));
    
    // Update current dealer session
    localStorage.setItem('currentDealer', JSON.stringify({ ...dealerData, ...profileData }));
    
    setIsEditing(false);
    showNotification('Profile updated successfully!', 'success');
  };

  // Cancel editing
  const handleCancelEdit = () => {
    // Reset to original data
    setProfileData(prev => ({
      ...prev,
      name: dealerData.name || '',
      email: dealerData.email || '',
      mobile: dealerData.mobile || '',
      ...JSON.parse(localStorage.getItem(`dealerProfile_${dealerData.id}`) || '{}')
    }));
    setIsEditing(false);
    setImagePreview(profileData.profileImage);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          {/* Profile Image */}
          <div className="relative">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
              {imagePreview || profileData.profileImage ? (
                <img 
                  src={imagePreview || profileData.profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl md:text-5xl font-bold">
                  {profileData.name?.charAt(0) || dealerData?.name?.charAt(0) || 'D'}
                </span>
              )}
            </div>
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full cursor-pointer transition duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                </svg>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
          
          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {profileData.name || dealerData?.name || 'Dealer Name'}
            </h1>
            <p className="text-blue-100 mb-2">
              {profileData.company || 'Real Estate Professional'}
            </p>
            <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4 text-sm">
              <span className="flex items-center justify-center md:justify-start">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                {profileData.email || dealerData?.email}
              </span>
              <span className="flex items-center justify-center md:justify-start">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                {profileData.mobile || dealerData?.mobile}
              </span>
            </div>
          </div>
          
          {/* Edit Button */}
          <div className="flex space-x-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                </svg>
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleSaveProfile}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
              </svg>
              Personal Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{profileData.name || 'Not provided'}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{profileData.email || 'Not provided'}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="mobile"
                    value={profileData.mobile}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your mobile number"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{profileData.mobile || 'Not provided'}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="company"
                    value={profileData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your company name"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{profileData.company || 'Not provided'}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience (Years)</label>
                {isEditing ? (
                  <select
                    name="experience"
                    value={profileData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select experience</option>
                    <option value="0-1">0-1 years</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                ) : (
                  <p className="text-gray-900 py-2">{profileData.experience || 'Not provided'}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                {isEditing ? (
                  <select
                    name="specialization"
                    value={profileData.specialization}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select specialization</option>
                    <option value="Residential">Residential Properties</option>
                    <option value="Commercial">Commercial Properties</option>
                    <option value="Industrial">Industrial Properties</option>
                    <option value="Luxury">Luxury Properties</option>
                    <option value="Investment">Investment Properties</option>
                    <option value="All">All Property Types</option>
                  </select>
                ) : (
                  <p className="text-gray-900 py-2">{profileData.specialization || 'Not provided'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
              </svg>
              Address Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={profileData.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your complete address"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{profileData.address || 'Not provided'}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="city"
                      value={profileData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter city"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{profileData.city || 'Not provided'}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="state"
                      value={profileData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter state"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{profileData.state || 'Not provided'}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="pincode"
                      value={profileData.pincode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter pincode"
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{profileData.pincode || 'Not provided'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
              </svg>
              About Me
            </h2>
            
            {isEditing ? (
              <textarea
                name="description"
                value={profileData.description}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell us about yourself, your experience, and what makes you unique as a real estate professional..."
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">
                {profileData.description || 'No description provided yet. Click edit to add information about yourself.'}
              </p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Member Since</span>
                <span className="font-medium text-gray-900">
                  {dealerData?.createdAt ? new Date(dealerData.createdAt).toLocaleDateString() : 'Recently'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Profile Completion</span>
                <span className="font-medium text-blue-600">
                  {Math.round(Object.values(profileData).filter(val => val && val !== '').length / Object.keys(profileData).length * 100)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Account Status</span>
                <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-1a1 1 0 10-2 0v1H5V7h1a1 1 0 000-2H5z"/>
              </svg>
              Professional Links
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                {isEditing ? (
                  <input
                    type="url"
                    name="website"
                    value={profileData.website}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://yourwebsite.com"
                  />
                ) : (
                  <p className="text-gray-900 py-2">
                    {profileData.website ? (
                      <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {profileData.website}
                      </a>
                    ) : (
                      'Not provided'
                    )}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                {isEditing ? (
                  <input
                    type="url"
                    name="linkedIn"
                    value={profileData.linkedIn}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                ) : (
                  <p className="text-gray-900 py-2">
                    {profileData.linkedIn ? (
                      <a href={profileData.linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        LinkedIn Profile
                      </a>
                    ) : (
                      'Not provided'
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Profile Tips */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200">
            <h3 className="text-lg font-semibold text-orange-800 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
              </svg>
              Profile Tips
            </h3>
            <ul className="text-sm text-orange-700 space-y-2">
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                Complete your profile to build trust with clients
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                Add a professional photo to increase credibility
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                Include your specialization and experience
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                Keep your contact information up to date
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealerProfile;