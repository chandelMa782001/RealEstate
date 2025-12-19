import React, { useState } from 'react';
import './LoanButton.css';
const LoanButton = ({ isVisible = true }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('application');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    loanAmount: '',
    propertyType: ''
  });
  const [calculatorData, setCalculatorData] = useState({
    loanAmount: '',
    interestRate: '8.5',
    loanTenure: '20',
    tenureType: 'years'
  });
  
  const [calculationResult, setCalculationResult] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Loan application submitted:', formData);
  
    alert('Loan application submitted successfully!');
    setIsModalOpen(false);
    setFormData({ name: '', email: '', phone: '', loanAmount: '', propertyType: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCalculatorChange = (e) => {
    setCalculatorData({ ...calculatorData, [e.target.name]: e.target.value });
  };

  const calculateEMI = () => {
    const { loanAmount, interestRate, loanTenure, tenureType } = calculatorData;
    
    if (!loanAmount || !interestRate || !loanTenure) {
      alert('Please fill all calculator fields');
      return;
    }

    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12; 
    const tenure = tenureType === 'years' ? parseFloat(loanTenure) * 12 : parseFloat(loanTenure); // Convert to months
    const emi = (principal * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1);
    const totalAmount = emi * tenure;
    const totalInterest = totalAmount - principal;

    setCalculationResult({
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
      principal: Math.round(principal)
    });
  };

  const resetCalculator = () => {
    setCalculatorData({
      loanAmount: '',
      interestRate: '8.5',
      loanTenure: '20',
      tenureType: 'years'
    });
    setCalculationResult(null);
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
              <h2>🪙 Home Loan Services</h2>
              <p className="modal-subtitle">Apply for loan or calculate EMI</p>
            </div>
            
          
            <div className="tab-navigation">
              <button 
                className={`tab-btn ${activeTab === 'application' ? 'active' : ''}`}
                onClick={() => setActiveTab('application')}
                type="button"
              >
                Apply for Loan
              </button>
              <button 
                className={`tab-btn ${activeTab === 'calculator' ? 'active' : ''}`}
                onClick={() => setActiveTab('calculator')}
                type="button"
              >
                EMI Calculator
              </button>
            </div>

            {activeTab === 'application' && (
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
            )}

           
            {activeTab === 'calculator' && (
              <div className="calculator-section">
                <div className="form-row">
                  <div className="form-group">
                    <label>Loan Amount (₹)</label>
                    <input
                      type="number"
                      name="loanAmount"
                      value={calculatorData.loanAmount}
                      onChange={handleCalculatorChange}
                      placeholder="Enter loan amount"
                      min="100000"
                      max="50000000"
                    />
                  </div>
                  <div className="form-group">
                    <label>Interest Rate (% per annum)</label>
                    <input
                      type="number"
                      name="interestRate"
                      value={calculatorData.interestRate}
                      onChange={handleCalculatorChange}
                      placeholder="Enter interest rate"
                      min="1"
                      max="20"
                      step="0.1"
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Loan Tenure</label>
                    <input
                      type="number"
                      name="loanTenure"
                      value={calculatorData.loanTenure}
                      onChange={handleCalculatorChange}
                      placeholder="Enter tenure"
                      min="1"
                      max="30"
                    />
                  </div>
                  <div className="form-group">
                    <label>Tenure Type</label>
                    <select
                      name="tenureType"
                      value={calculatorData.tenureType}
                      onChange={handleCalculatorChange}
                    >
                      <option value="years">Years</option>
                      <option value="months">Months</option>
                    </select>
                  </div>
                </div>

                <div className="calculator-buttons">
                  <button type="button" className="calculate-btn" onClick={calculateEMI}>
                    <span>Calculate EMI</span>
                 
                  </button>
                  <button type="button" className="reset-btn" onClick={resetCalculator}>
                    Reset
                  </button>
                </div>

              
                {calculationResult && (
                  <div className="calculation-results">
                    <h3>Calculation Results</h3>
                    <div className="result-grid">
                      <div className="result-item">
                        <span className="result-label">Monthly EMI</span>
                        <span className="result-value">₹{calculationResult.emi.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="result-item">
                        <span className="result-label">Principal Amount</span>
                        <span className="result-value">₹{calculationResult.principal.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="result-item">
                        <span className="result-label">Total Interest</span>
                        <span className="result-value">₹{calculationResult.totalInterest.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="result-item">
                        <span className="result-label">Total Amount</span>
                        <span className="result-value">₹{calculationResult.totalAmount.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                    
                    <div className="result-summary">
                      <p>You will pay <strong>₹{calculationResult.emi.toLocaleString('en-IN')}</strong> monthly for {calculatorData.loanTenure} {calculatorData.tenureType}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default LoanButton;
