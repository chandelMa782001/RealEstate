import React from 'react';

const ResidentialForm = ({ formData, setFormData, handleChange, handleGoldOfferChange, getEffectivePrice }) => {
  return (
    <>
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
        
        {/* Brokerage */}
        <div className="form-group">
          <label>Do You Choose Brokerage</label>
          <div className="button-group">
            {['Yes', 'No'].map((brokerageOption) => (
              <button
                key={brokerageOption}
                type="button"
                className={`option-btn ${formData.brokerage === brokerageOption ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, brokerage: brokerageOption }))}
              >
                {brokerageOption}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Property Feature */}
      <div className="form-section">
        <h4 className="subsection-title">Property Feature</h4>
        
        {/* BHK */}
        <div className="form-group">
          <label>BHK</label>
          <div className="button-group">
            {['1 RK / Studio', '1', '2', '3', '3+'].map((bhkOption) => (
              <button
                key={bhkOption}
                type="button"
                className={`option-btn ${formData.bhk === bhkOption ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, bhk: bhkOption }))}
              >
                {bhkOption}
              </button>
            ))}
          </div>
        </div>

        {/* Bathroom */}
        <div className="form-group">
          <label>Bathroom</label>
          <div className="button-group">
            {['1', '2', '3', '3+'].map((bathroomOption) => (
              <button
                key={bathroomOption}
                type="button"
                className={`option-btn ${formData.bathrooms === bathroomOption ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, bathrooms: bathroomOption }))}
              >
                {bathroomOption}
              </button>
            ))}
          </div>
        </div>

        {/* Balcony */}
        <div className="form-group">
          <label>Balcony</label>
          <div className="button-group">
            {['0', '1', '2', '3', '3+'].map((balconyOption) => (
              <button
                key={balconyOption}
                type="button"
                className={`option-btn ${formData.balcony === balconyOption ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, balcony: balconyOption }))}
              >
                {balconyOption}
              </button>
            ))}
          </div>
        </div>

        {/* Furnished */}
        <div className="form-group">
          <label>Furnished</label>
          <div className="button-group">
            {['Fully Furnished', 'Semi Furnished', 'Un-Furnished'].map((furnishedOption) => (
              <button
                key={furnishedOption}
                type="button"
                className={`option-btn ${formData.furnished === furnishedOption ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, furnished: furnishedOption }))}
              >
                {furnishedOption}
              </button>
            ))}
          </div>
        </div>

        {/* Facing */}
        <div className="form-group">
          <label>Facing</label>
          <div className="button-group facing-buttons">
            {['East', 'West', 'North', 'South', 'North East', 'North West', 'South East', 'South West'].map((facingOption) => (
              <button
                key={facingOption}
                type="button"
                className={`option-btn ${formData.facing === facingOption ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, facing: facingOption }))}
              >
                {facingOption}
              </button>
            ))}
          </div>
        </div>

        {/* Parking */}
        <div className="form-grid">
          <div className="form-group">
            <label>Covered Parking</label>
            <div className="button-group">
              {['1', '2', '3', '3+'].map((parkingOption) => (
                <button
                  key={parkingOption}
                  type="button"
                  className={`option-btn ${formData.coveredParking === parkingOption ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, coveredParking: parkingOption }))}
                >
                  {parkingOption}
                </button>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Open Parking</label>
            <div className="button-group">
              {['1', '2', '3', '3+'].map((parkingOption) => (
                <button
                  key={parkingOption}
                  type="button"
                  className={`option-btn ${formData.openParking === parkingOption ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, openParking: parkingOption }))}
                >
                  {parkingOption}
                </button>
              ))}
            </div>
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

      {/* Residential Property Details */}
      <div className="form-section">
        <h4 className="subsection-title">Residential {formData.lookingTo} Property Details</h4>
        
        {/* Stage and Possession Status */}
        <div className="form-grid">
          <div className="form-group">
            <label>Stage</label>
            <div className="button-group">
              {['Fresh Booking', 'Resale'].map((stageOption) => (
                <button
                  key={stageOption}
                  type="button"
                  className={`option-btn ${formData.stage === stageOption ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, stage: stageOption }))}
                >
                  {stageOption}
                </button>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Possession Status</label>
            <div className="button-group">
              {['Ready to Move', 'Under Construction'].map((possessionOption) => (
                <button
                  key={possessionOption}
                  type="button"
                  className={`option-btn ${formData.possessionStatus === possessionOption ? 'active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, possessionStatus: possessionOption }))}
                >
                  {possessionOption}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Ownership */}
        <div className="form-group">
          <label>Ownership</label>
          <div className="button-group">
            {['Freehold', 'Leasehold', 'Co-operative Society', 'Power Of Attorney'].map((ownershipOption) => (
              <button
                key={ownershipOption}
                type="button"
                className={`option-btn ${formData.ownership === ownershipOption ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, ownership: ownershipOption }))}
              >
                {ownershipOption}
              </button>
            ))}
          </div>
        </div>

        {/* Age of Property and Possession From */}
        <div className="form-grid">
          <div className="form-group">
            <label>Age of Property</label>
            <input
              type="text"
              name="ageOfProperty"
              value={formData.ageOfProperty}
              onChange={handleChange}
              placeholder="Age of Property"
            />
          </div>
          <div className="form-group">
            <label>Possession From</label>
            <input
              type="date"
              name="possessionFrom"
              value={formData.possessionFrom}
              onChange={handleChange}
              placeholder="dd-mm-yyyy"
            />
          </div>
        </div>

        {/* Cost and Maintenance */}
        <div className="form-grid">
          <div className="form-group">
            <label>{formData.lookingTo === 'Sell' ? 'Total Cost *' : 'Monthly Rent *'}</label>
            <input
              type="number"
              name="totalCost"
              value={formData.totalCost}
              onChange={handleChange}
              placeholder={formData.lookingTo === 'Sell' ? 'Cost' : 'Monthly Rent'}
              required
            />
          </div>
          <div className="form-group">
            <label>Total Maintenance Charge</label>
            <input
              type="number"
              name="maintenanceCharges"
              value={formData.maintenanceCharges}
              onChange={handleChange}
              placeholder="Maintenance Charges"
            />
          </div>
        </div>

        {/* Built-up Area and Carpet Area */}
        <div className="form-grid">
          <div className="form-group">
            <label>Builtup Area *</label>
            <input
              type="number"
              name="builtupArea"
              value={formData.builtupArea}
              onChange={handleChange}
              placeholder="Builtup Area"
              required
            />
          </div>
          <div className="form-group">
            <label>Carpet Area</label>
            <input
              type="number"
              name="carpetArea"
              value={formData.carpetArea}
              onChange={handleChange}
              placeholder="Carpet Area"
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
            <label>RERA No.</label>
            <input
              type="text"
              name="reraNo"
              value={formData.reraNo}
              onChange={handleChange}
              placeholder="RERA No."
            />
          </div>
        </div>
        <div className="form-grid">
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
          <div className="form-group">
            <label>Builder Name (Optional)</label>
            <input
              type="text"
              name="builderName"
              value={formData.builderName}
              onChange={handleChange}
              placeholder="Builder Name (Optional)"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>Offer / Property Description *</label>
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

export default ResidentialForm;