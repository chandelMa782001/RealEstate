import React, { useState } from 'react';
import './LoanButton.css';

const LoanButton = ({ isVisible = true }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    loanAmount: '',
    propertyType: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Loan application submitted:', formData);
    // Add your submission logic here
    alert('Loan application submitted successfully!');
    setIsModalOpen(false);
    setFormData({ name: '', email: '', phone: '', loanAmount: '', propertyType: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <button 
        className={`loan-button ${!isVisible ? 'loan-button-hidden' : ''}`} 
        onClick={(e) => {
          e.stopPropagation();
          setIsModalOpen(true);
        }}
      >
        <span className="coin-icon">🪙</span>
        <span className="loan-text">Home Loan</span>
      </button>

      {isModalOpen && (
        <div className="loan-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="loan-modal" onClick={(e) => e.stopPropagation()}>
            <button className="loan-modal-close" onClick={() => setIsModalOpen(false)}>
              ×
            </button>
            <div className="modal-header">
              <h2>🪙 Apply for Home Loan</h2>
              <p className="modal-subtitle">Get instant Home loan </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    required
                  />
                </div>
              </div>
              <div className="form-row">
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
                <label>Loan Amount Required</label>
                <input
                  type="number"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleChange}
                  placeholder="₹ Enter amount"
                  required
                />
              </div>
               
              </div>
              
              <button type="submit" className="loan-submit-btn">
                <span>Submit Application</span>
                <span className="btn-icon">→</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoanButton;
