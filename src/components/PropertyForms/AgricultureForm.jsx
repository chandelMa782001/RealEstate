import React from 'react';

const AgricultureForm = ({ formData, setFormData, handleChange }) => {
  return (
    <>
      {/* 1. Basic Property Details */}
      <div className="form-section">
        <h4 className="subsection-title">📋 Basic Property Details</h4>
        
        <div className="form-group">
          <label>Property Title *</label>
          <input
            type="text"
            name="projectTitle"
            value={formData.projectTitle}
            onChange={handleChange}
            placeholder="e.g. Fertile Agriculture Land for Sale"
            required
          />
        </div>

        <div className="form-group">
          <label>Property Type *</label>
          <div className="button-group">
            {['Agriculture Land', 'Farm Land', 'Orchard / Bagicha', 'Plantation Land'].map((type) => (
              <button
                key={type}
                type="button"
                className={`option-btn ${formData.agriculturePropertyType === type ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, agriculturePropertyType: type }))}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Purpose *</label>
          <div className="button-group">
            {['Sale', 'Lease'].map((purpose) => (
              <button
                key={purpose}
                type="button"
                className={`option-btn ${formData.lookingTo === purpose ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, lookingTo: purpose }))}
              >
                {purpose}
              </button>
            ))}
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Total Area *</label>
            <input
              type="number"
              name="plotArea"
              value={formData.plotArea || ''}
              onChange={handleChange}
              placeholder="Enter area"
              required
            />
          </div>
          <div className="form-group">
            <label>Unit *</label>
            <select
              name="areaUnit"
              value={formData.areaUnit || 'Acre'}
              onChange={handleChange}
              className="form-select"
            >
              <option value="Acre">Acre</option>
              <option value="Bigha">Bigha</option>
              <option value="Kanal">Kanal</option>
              <option value="Hectare">Hectare</option>
            </select>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Price *</label>
            <input
              type="number"
              name="totalCost"
              value={formData.totalCost}
              onChange={handleChange}
              placeholder="Total Price"
              required
            />
          </div>
          <div className="form-group">
            <label>Price per Unit (Optional)</label>
            <input
              type="number"
              name="pricePerUnit"
              value={formData.pricePerUnit || ''}
              onChange={handleChange}
              placeholder="Price per unit"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Negotiable</label>
          <div className="button-group">
            {['Yes', 'No'].map((option) => (
              <button
                key={option}
                type="button"
                className={`option-btn ${formData.negotiable === option ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, negotiable: option }))}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Location Details */}
      <div className="form-section">
        <h4 className="subsection-title">📍 Location Details</h4>
        
        <div className="form-grid">
          <div className="form-group">
            <label>State *</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter state"
              required
            />
          </div>
          <div className="form-group">
            <label>District *</label>
            <input
              type="text"
              name="district"
              value={formData.district || ''}
              onChange={handleChange}
              placeholder="Enter district"
              required
            />
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Tehsil / Taluka *</label>
            <input
              type="text"
              name="tehsil"
              value={formData.tehsil || ''}
              onChange={handleChange}
              placeholder="Enter tehsil/taluka"
              required
            />
          </div>
          <div className="form-group">
            <label>Village Name *</label>
            <input
              type="text"
              name="villageName"
              value={formData.villageName || ''}
              onChange={handleChange}
              placeholder="Enter village name"
              required
            />
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Landmark</label>
            <input
              type="text"
              name="landmark"
              value={formData.landmark || ''}
              onChange={handleChange}
              placeholder="Enter landmark"
            />
          </div>
          <div className="form-group">
            <label>Pin Code *</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Enter pin code"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Google Map Location (Pin)</label>
          <input
            type="text"
            name="mapLocation"
            value={formData.mapLocation || ''}
            onChange={handleChange}
            placeholder="Paste Google Maps link or coordinates"
          />
        </div>
      </div>

      {/* 3. Land & Soil Information */}
      <div className="form-section">
        <h4 className="subsection-title">🌱 Land & Soil Information</h4>
        
        <div className="form-group">
          <label>Soil Type *</label>
          <div className="button-group">
            {['Black', 'Red', 'Sandy', 'Clay', 'Loam'].map((type) => (
              <button
                key={type}
                type="button"
                className={`option-btn ${formData.soilType === type ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, soilType: type }))}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Soil Fertility *</label>
          <div className="button-group">
            {['High', 'Medium', 'Low'].map((fertility) => (
              <button
                key={fertility}
                type="button"
                className={`option-btn ${formData.soilFertility === fertility ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, soilFertility: fertility }))}
              >
                {fertility}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Land Use Type *</label>
          <div className="button-group">
            {['Single Crop', 'Double Crop', 'Multi Crop'].map((useType) => (
              <button
                key={useType}
                type="button"
                className={`option-btn ${formData.landUseType === useType ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, landUseType: useType }))}
              >
                {useType}
              </button>
            ))}
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Current Crop</label>
            <input
              type="text"
              name="currentCrop"
              value={formData.currentCrop || ''}
              onChange={handleChange}
              placeholder="Enter current crop"
            />
          </div>
          <div className="form-group">
            <label>Last Crop Taken</label>
            <input
              type="text"
              name="lastCrop"
              value={formData.lastCrop || ''}
              onChange={handleChange}
              placeholder="Enter last crop"
            />
          </div>
        </div>
      </div>

      {/* 4. Water Availability */}
      <div className="form-section">
        <h4 className="subsection-title">💧 Water Availability</h4>
        
        <div className="form-group">
          <label>Water Source *</label>
          <div className="button-group">
            {['Borewell', 'Open Well', 'Canal', 'River', 'Rainfed'].map((source) => (
              <button
                key={source}
                type="button"
                className={`option-btn ${formData.waterSource === source ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, waterSource: source }))}
              >
                {source}
              </button>
            ))}
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Number of Borewells</label>
            <input
              type="number"
              name="numberOfBorewells"
              value={formData.numberOfBorewells || ''}
              onChange={handleChange}
              placeholder="Enter number"
            />
          </div>
          <div className="form-group">
            <label>Water Level (Optional)</label>
            <input
              type="text"
              name="waterLevel"
              value={formData.waterLevel || ''}
              onChange={handleChange}
              placeholder="e.g. 50 feet"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Electricity Connection for Pump</label>
          <div className="button-group">
            {['Yes', 'No'].map((option) => (
              <button
                key={option}
                type="button"
                className={`option-btn ${formData.electricityConnection === option ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, electricityConnection: option }))}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Road & Access */}
      <div className="form-section">
        <h4 className="subsection-title">🚜 Road & Access</h4>
        
        <div className="form-group">
          <label>Road Connectivity *</label>
          <div className="button-group">
            {['Kachcha', 'Pakka'].map((type) => (
              <button
                key={type}
                type="button"
                className={`option-btn ${formData.roadConnectivity === type ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, roadConnectivity: type }))}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Road Width (Feet)</label>
            <input
              type="number"
              name="roadWidth"
              value={formData.roadWidth || ''}
              onChange={handleChange}
              placeholder="Enter width in feet"
            />
          </div>
          <div className="form-group">
            <label>Distance from Main Road (km)</label>
            <input
              type="number"
              name="distanceFromMainRoad"
              value={formData.distanceFromMainRoad || ''}
              onChange={handleChange}
              placeholder="Enter distance"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Tractor Access</label>
          <div className="button-group">
            {['Yes', 'No'].map((option) => (
              <button
                key={option}
                type="button"
                className={`option-btn ${formData.tractorAccess === option ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, tractorAccess: option }))}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Legal & Ownership Details */}
      <div className="form-section">
        <h4 className="subsection-title">🧾 Legal & Ownership Details</h4>
        
        <div className="form-group">
          <label>Ownership Type *</label>
          <div className="button-group">
            {['Single Owner', 'Joint'].map((type) => (
              <button
                key={type}
                type="button"
                className={`option-btn ${formData.ownershipType === type ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, ownershipType: type }))}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Land Record Available (Jamabandi / 7-12 / RTC)</label>
          <div className="button-group">
            {['Yes', 'No'].map((option) => (
              <button
                key={option}
                type="button"
                className={`option-btn ${formData.landRecordAvailable === option ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, landRecordAvailable: option }))}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Clear Title</label>
          <div className="button-group">
            {['Yes', 'No'].map((option) => (
              <button
                key={option}
                type="button"
                className={`option-btn ${formData.clearTitle === option ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, clearTitle: option }))}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Dispute Free</label>
          <div className="button-group">
            {['Yes', 'No'].map((option) => (
              <button
                key={option}
                type="button"
                className={`option-btn ${formData.disputeFree === option ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, disputeFree: option }))}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Conversion Status</label>
          <div className="button-group">
            {['Agriculture', 'NA / CLU Applied'].map((status) => (
              <button
                key={status}
                type="button"
                className={`option-btn ${formData.conversionStatus === status ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, conversionStatus: status }))}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Registry Available</label>
          <div className="button-group">
            {['Yes', 'No'].map((option) => (
              <button
                key={option}
                type="button"
                className={`option-btn ${formData.registryAvailable === option ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, registryAvailable: option }))}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Property Description */}
      <div className="form-section">
        <h4 className="subsection-title">📝 Property Description</h4>
        <div className="form-group">
          <label>Offer / Property Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your agriculture land, its features, benefits, and any additional information..."
            rows="5"
            required
          />
        </div>
      </div>
    </>
  );
};

export default AgricultureForm;
