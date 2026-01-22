import React from 'react';

const WarehouseForm = ({ formData, setFormData, handleChange }) => {
  return (
    <>
      {/* Electricity Charge */}
      <div className="form-section">
        <div className="form-group">
          <label>Electricity Charge Included</label>
          <div className="button-group">
            {['Yes', 'No'].map((option) => (
              <button
                key={option}
                type="button"
                className={`option-btn ${formData.electricityChargeIncluded === option ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, electricityChargeIncluded: option }))}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Facilities */}
      <div className="form-section">
        <h4 className="subsection-title">Facilities</h4>
        <div className="form-grid">
          <div className="form-group">
            <label>Private Washroom</label>
            <input
              type="text"
              name="privateWashroom"
              value={formData.privateWashroom}
              onChange={handleChange}
              placeholder="Private Washroom"
            />
          </div>
          <div className="form-group">
            <label>Public Washroom</label>
            <input
              type="text"
              name="publicWashroom"
              value={formData.publicWashroom}
              onChange={handleChange}
              placeholder="Public Washroom"
            />
          </div>
        </div>
      </div>

      {/* Society Amenities */}
      <div className="form-section">
        <h4 className="subsection-title">Society Amenities</h4>
        <div className="amenities-grid">
          {[
            'Parking', 'Visitor Car Parking', 'Yoga Area', 'Medical',
            'Swimming Pool', 'Club House', 'Gym', 'Power Backup',
            'Sports Area', 'Security', 'Lift', 'Rain-water Harvesting',
            'Cafeteria', 'Canteen', 'Fire', 'Tennis'
          ].map((amenity) => (
            <label key={amenity} className="amenity-checkbox">
              <input
                type="checkbox"
                checked={formData.societyAmenities?.includes(amenity) || false}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setFormData(prev => ({
                    ...prev,
                    societyAmenities: isChecked
                      ? [...(prev.societyAmenities || []), amenity]
                      : (prev.societyAmenities || []).filter(item => item !== amenity)
                  }));
                }}
              />
              <span className="checkmark"></span>
              {amenity}
            </label>
          ))}
        </div>
      </div>

      {/* Commercial Property Details */}
      <div className="form-section">
        <h4 className="subsection-title">Commercial Property Details</h4>
        
        {/* Furnished */}
        <div className="form-group">
          <label>Furnished</label>
          <div className="button-group">
            {['Fully Furnished', 'Semi Furnished', 'Un-Furnished'].map((option) => (
              <button
                key={option}
                type="button"
                className={`option-btn ${formData.furnished === option ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, furnished: option }))}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Location HUB */}
        <div className="form-group">
          <label>Location HUB</label>
          <div className="button-group">
            {['IT Park', 'Business Park', 'Others'].map((option) => (
              <button
                key={option}
                type="button"
                className={`option-btn ${formData.locationHUB === option ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, locationHUB: option }))}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Zone Type */}
        <div className="form-group">
          <label>Zone Type</label>
          <div className="button-group">
            {['Industrial', 'Commercial', 'Residential', 'Special ECO Zone', 'Open Space', 'Agriculture Land'].map((option) => (
              <button
                key={option}
                type="button"
                className={`option-btn ${formData.zoneType === option ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, zoneType: option }))}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Ownership */}
        <div className="form-group">
          <label>Ownership</label>
          <div className="button-group">
            {['Freehold', 'Leasehold', 'Co-operative Society', 'Power Of Attorney'].map((option) => (
              <button
                key={option}
                type="button"
                className={`option-btn ${formData.ownership === option ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, ownership: option }))}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Available From and Built-up Area */}
        <div className="form-grid">
          <div className="form-group">
            <label>Available From</label>
            <input
              type="date"
              name="availableFrom"
              value={formData.availableFrom}
              onChange={handleChange}
              placeholder="dd-mm-yyyy"
            />
          </div>
          <div className="form-group">
            <label>Builtup Area</label>
            <input
              type="number"
              name="builtupArea"
              value={formData.builtupArea}
              onChange={handleChange}
              placeholder="Builtup Area"
            />
          </div>
        </div>

        {/* Expected Rent and Security Deposit */}
        <div className="form-grid">
          <div className="form-group">
            <label>Expected Rent</label>
            <input
              type="number"
              name="expectedRent"
              value={formData.expectedRent}
              onChange={handleChange}
              placeholder="Expected Rent"
            />
          </div>
          <div className="form-group">
            <label>Security Deposit</label>
            <input
              type="number"
              name="securityDeposit"
              value={formData.securityDeposit}
              onChange={handleChange}
              placeholder="Security Deposit"
            />
          </div>
        </div>

        {/* Lock in Period and Expected Rent Increase */}
        <div className="form-grid">
          <div className="form-group">
            <label>Lock in Period</label>
            <input
              type="text"
              name="lockInPeriod"
              value={formData.lockInPeriod}
              onChange={handleChange}
              placeholder="Lock in Period"
            />
          </div>
          <div className="form-group">
            <label>Expected Rent Increase</label>
            <input
              type="text"
              name="expectedRentIncrease"
              value={formData.expectedRentIncrease}
              onChange={handleChange}
              placeholder="Expected Rent Increase"
            />
          </div>
        </div>
      </div>

      {/* Internal Amenities */}
      <div className="form-section">
        <h4 className="subsection-title">Internal Amenities</h4>
        <div className="amenities-grid">
          {[
            'TV', 'Fridge', 'Cup-Board', 'Wi-Fi',
            'Kitchen', 'Bed', 'Water Purifier', 'Power Backup',
            'Intercom', 'AC', 'Bathroom', 'Gyser',
            'Vetrified Tiles'
          ].map((amenity) => (
            <label key={amenity} className="amenity-checkbox">
              <input
                type="checkbox"
                checked={formData.internalAmenities?.includes(amenity) || false}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setFormData(prev => ({
                    ...prev,
                    internalAmenities: isChecked
                      ? [...(prev.internalAmenities || []), amenity]
                      : (prev.internalAmenities || []).filter(item => item !== amenity)
                  }));
                }}
              />
              <span className="checkmark"></span>
              {amenity}
            </label>
          ))}
        </div>
      </div>

      {/* Property Description */}
      <div className="form-section">
        <h4 className="subsection-title">Property Description</h4>
        <div className="form-grid">
          <div className="form-group">
            <label>Project Title (mandatory)</label>
            <input
              type="text"
              name="projectTitle"
              value={formData.projectTitle}
              onChange={handleChange}
              placeholder="Project Title (mandatory)"
              required
            />
          </div>
          <div className="form-group">
            <label>Project Name (Optional)</label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              placeholder="Project Name (Optional)"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>Offer / Property Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Offer / Property Description"
            rows="4"
            required
          />
        </div>
      </div>
    </>
  );
};

export default WarehouseForm;