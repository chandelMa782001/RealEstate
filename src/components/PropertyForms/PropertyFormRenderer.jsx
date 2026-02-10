import React from 'react';
import PlotForm from './PlotForm';
import ResidentialForm from './ResidentialForm';
import OfficeForm from './OfficeForm';
import RetailShopForm from './RetailShopForm';
import WarehouseForm from './WarehouseForm';
import AgricultureForm from './AgricultureForm';

const PropertyFormRenderer = ({ formData, setFormData, handleChange, handleGoldOfferChange, getEffectivePrice }) => {
  
  const renderPropertyForm = () => {
    // Plot form for any property type
    if (formData.propertyCategory === 'Plot') {
      return (
        <PlotForm 
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          handleGoldOfferChange={handleGoldOfferChange}
          getEffectivePrice={getEffectivePrice}
        />
      );
    }
    
    // Residential properties
    if (formData.propertyType === 'Residential' && formData.propertyCategory !== 'Plot') {
      return (
        <ResidentialForm 
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          handleGoldOfferChange={handleGoldOfferChange}
          getEffectivePrice={getEffectivePrice}
        />
      );
    }
    if(formData.propertyType === 'Agriculture'
    )
    {
      return (
        <AgricultureForm
        />
      );
    }
    // Commercial properties
    if (formData.propertyType === 'Commercial' && formData.propertyCategory !== 'Plot') {
      switch (formData.propertyCategory) {
        case 'Retail Shop':
          return (
            <RetailShopForm 
              formData={formData}
              setFormData={setFormData}
              handleChange={handleChange}
            />
          );
        case 'Warehouse':
          return (
            <WarehouseForm 
              formData={formData}
              setFormData={setFormData}
              handleChange={handleChange}
            />
          );
        case 'Office':
          return (
            <OfficeForm 
              formData={formData}
              setFormData={setFormData}
              handleChange={handleChange}
            />
          );
        default:
          return null;
      }
    }
    
    return null;
  };

  return (
    <div className="form-fields-section">
      <h3 className="section-title">Property Details</h3>
      {renderPropertyForm()}
      
      {/* Gold Offer - Only for Sell */}
      {formData.lookingTo === 'Sell' && (
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
                      <span className="price-amount">₹{formData.totalCost ? parseFloat(formData.totalCost).toLocaleString('en-IN') : '0'}</span>
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
      )}
    </div>
  );
};

export default PropertyFormRenderer;