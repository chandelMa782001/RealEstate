import React from 'react';

const OfficeForm = ({ formData, setFormData, handleChange }) => {
  return (
    <>
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

      {/* Negotiable and Charges */}
      <div className="form-grid">
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
        <div className="form-group">
          <label>DG & UPS Charge Included</label>
          <div className="button-group">
            {['Yes', 'No'].map((option) => (
              <button
                key={option}
                type="button"
                className={`option-btn ${formData.dgUpsChargeIncluded === option ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, dgUpsChargeIncluded: option }))}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Electricity and Water Charges */}
      <div className="form-grid">
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
        <div className="form-group">
          <label>Water Charge Included</label>
          <div className="button-group">
            {['Yes', 'No'].map((option) => (
              <button
                key={option}
                type="button"
                className={`option-btn ${formData.waterChargeIncluded === option ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, waterChargeIncluded: option }))}
              >
                {option}
              </button>
            ))}
          </div>
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

      {/* Floor Available */}
      <div className="form-section">
        <h4 className="subsection-title">Floor Available</h4>
        <div className="form-grid">
          <div className="form-group">
            <label>Total Floors</label>
            <input
              type="text"
              name="totalFloors"
              value={formData.totalFloors}
              onChange={handleChange}
              placeholder="Total Floor"
            />
          </div>
          <div className="form-group">
            <label>Your Floor</label>
            <input
              type="text"
              name="yourFloor"
              value={formData.yourFloor}
              onChange={handleChange}
              placeholder="Your Floor"
            />
          </div>
        </div>
      </div>

      {/* Lift & Stairs */}
      <div className="form-section">
        <h4 className="subsection-title">Lift & Stairs</h4>
        <div className="form-grid">
          <div className="form-group">
            <label>No of Stairs</label>
            <input
              type="number"
              name="noOfStairs"
              value={formData.noOfStairs || ''}
              onChange={handleChange}
              placeholder="No. of Stairs"
            />
          </div>
          <div className="form-group">
            <label>Passengers Lift</label>
            <input
              type="text"
              name="passengersLift"
              value={formData.passengersLift || ''}
              onChange={handleChange}
              placeholder="Passengers Lift"
            />
          </div>
        </div>
        <div className="form-group">
          <label>Service Lift</label>
          <input
            type="text"
            name="serviceLift"
            value={formData.serviceLift || ''}
            onChange={handleChange}
            placeholder="Service Lift"
          />
        </div>
      </div>

      {/* Parking */}
      <div className="form-section">
        <h4 className="subsection-title">Parking</h4>
        <div className="form-grid">
          <div className="form-group">
            <label>Private Parking</label>
            <input
              type="text"
              name="privateParking"
              value={formData.privateParking}
              onChange={handleChange}
              placeholder="Private Parking"
            />
          </div>
          <div className="form-group">
            <label>Public Parking</label>
            <input
              type="text"
              name="publicParking"
              value={formData.publicParking}
              onChange={handleChange}
              placeholder="Public Parking"
            />
          </div>
        </div>
      </div>

      {/* Facilities */}
      <div className="form-section">
        <h4 className="subsection-title">Facilities</h4>
        <div className="form-grid">
          <div className="form-group">
            <label>No. of Seats</label>
            <input
              type="number"
              name="noOfSeats"
              value={formData.noOfSeats || ''}
              onChange={handleChange}
              placeholder="No. of Seats"
            />
          </div>
          <div className="form-group">
            <label>No. of Cabin</label>
            <input
              type="number"
              name="noOfCabin"
              value={formData.noOfCabin || ''}
              onChange={handleChange}
              placeholder="No. of Cabin"
            />
          </div>
        </div>
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
        <div className="form-grid">
          <div className="form-group">
            <label>Conference Room</label>
            <input
              type="text"
              name="conferenceRoom"
              value={formData.conferenceRoom || ''}
              onChange={handleChange}
              placeholder="Conference Room"
            />
          </div>
          <div className="form-group">
            <label>Reception</label>
            <input
              type="text"
              name="reception"
              value={formData.reception || ''}
              onChange={handleChange}
              placeholder="Reception"
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
            'Cafeteria', 'Canteen', 'Fire', 'Tennis',
            'Kids-play Area', 'Shopping Mall', 'Vastu', 'CCTV'
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

      {/* Internal Amenities */}
      <div className="form-section">
        <h4 className="subsection-title">Internal Amenities</h4>
        <div className="amenities-grid">
          {[
            'Fridge', 'Table', 'AC', 'Workstation',
            'Cabin', 'Sofa', 'Wi-Fi', 'Pantry'
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

export default OfficeForm;