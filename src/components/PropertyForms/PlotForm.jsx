import React from 'react';

const PlotForm = ({ formData, setFormData, handleChange, handleGoldOfferChange, getEffectivePrice }) => {
  return (
    <>
      {/* Stage Selection */}
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

      {/* Ownership Selection */}
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

      {/* Plot Details */}
      <div className="form-grid">
        <div className="form-group">
          <label>Plot No.</label>
          <input
            type="text"
            name="plotNo"
            value={formData.plotNo || ''}
            onChange={handleChange}
            placeholder="Plot No."
          />
        </div>
        <div className="form-group">
          <label>Plot Area</label>
          <div className="input-with-unit">
            <input
              type="number"
              name="plotArea"
              value={formData.plotArea || ''}
              onChange={handleChange}
              placeholder="Plot Area"
            />
            <span className="unit">Sq.ft</span>
          </div>
        </div>
      </div>

      {/* Length and Width */}
      <div className="form-grid">
        <div className="form-group">
          <label>Length</label>
          <input
            type="number"
            name="plotLength"
            value={formData.plotLength || ''}
            onChange={handleChange}
            placeholder="Plot Length"
          />
        </div>
        <div className="form-group">
          <label>Width</label>
          <input
            type="number"
            name="plotWidth"
            value={formData.plotWidth || ''}
            onChange={handleChange}
            placeholder="Plot Width"
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
            placeholder={formData.lookingTo === 'Sell' ? 'Cost' : 'Maintenance Charges'}
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

      {/* Facing Selection */}
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

      {/* Brokerage and Loan */}
      <div className="form-grid">
        <div className="form-group">
          <label>Do You Choose Brokrage</label>
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
        <div className="form-group">
          <label>Loan Availability</label>
          <div className="button-group">
            {['Yes', 'No'].map((loanOption) => (
              <button
                key={loanOption}
                type="button"
                className={`option-btn ${formData.loanAvailability === loanOption ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, loanAvailability: loanOption }))}
              >
                {loanOption}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div className="form-group">
        <label>Amenities</label>
        <div className="amenities-grid">
          {[
            'Road Side', 'School', 'Market', 'Industry',
            'Club House', 'Temple', 'Power Backup', 'Security',
            'Gym', 'Sports Area', 'College', 'Railway Station',
            'Bus Stand'
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

      {/* Project Details */}
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
      </div>

      {/* Plot/Villa Property Details */}
      <div className="form-section">
        <h4 className="subsection-title">Plot / Villa Property Details</h4>
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

export default PlotForm;