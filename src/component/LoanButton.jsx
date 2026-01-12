import React, { useState } from 'react';
import { FaCoins } from 'react-icons/fa';
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
      {/* Home Loan Button - Small Icon */}
      <button 
        className={`fixed bottom-6 right-4 w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 text-black rounded-full shadow-lg z-[1000] transition-all duration-300 ease-out flex items-center justify-center transform hover:scale-110 hover:shadow-xl ${
          !isVisible ? 'translate-x-20 opacity-0 pointer-events-none' : 'translate-x-0 opacity-100'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          setIsModalOpen(true);
        }}
        title="Home Loan"
      >
        <FaCoins className="text-xl animate-bounce" />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-[2000] p-4" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white p-6 rounded-2xl max-w-md w-full max-h-[85vh] overflow-y-auto relative shadow-xl border border-gray-200" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700 text-xl"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
            
            <div className="text-center mb-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
              <h2 className="text-xl font-bold text-gray-800 mb-1">🪙 Home Loan Services</h2>
              <p className="text-xs text-gray-600">Apply for loan or calculate EMI</p>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex mb-4 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
              <button 
                className={`flex-1 py-2 px-3 text-sm font-semibold transition-all ${
                  activeTab === 'application' 
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-black shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('application')}
                type="button"
              >
                Apply for Loan
              </button>
              <button 
                className={`flex-1 py-2 px-3 text-sm font-semibold transition-all ${
                  activeTab === 'calculator' 
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-black shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('calculator')}
                type="button"
              >
                EMI Calculator
              </button>
            </div>

            {activeTab === 'application' && (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      required
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Loan Amount Required</label>
                    <input
                      type="number"
                      name="loanAmount"
                      value={formData.loanAmount}
                      onChange={handleChange}
                      placeholder="₹ Enter amount"
                      required
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all text-sm"
                    />
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black py-2 px-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 mt-4 text-sm"
                >
                  Submit Application
                </button>
              </form>
            )}

           
            {activeTab === 'calculator' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Loan Amount (₹)</label>
                    <input
                      type="number"
                      name="loanAmount"
                      value={calculatorData.loanAmount}
                      onChange={handleCalculatorChange}
                      placeholder="Enter loan amount"
                      min="100000"
                      max="50000000"
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Interest Rate (% per annum)</label>
                    <input
                      type="number"
                      name="interestRate"
                      value={calculatorData.interestRate}
                      onChange={handleCalculatorChange}
                      placeholder="Enter interest rate"
                      min="1"
                      max="20"
                      step="0.1"
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Loan Tenure</label>
                    <input
                      type="number"
                      name="loanTenure"
                      value={calculatorData.loanTenure}
                      onChange={handleCalculatorChange}
                      placeholder="Enter tenure"
                      min="1"
                      max="30"
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Tenure Type</label>
                    <select
                      name="tenureType"
                      value={calculatorData.tenureType}
                      onChange={handleCalculatorChange}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all bg-white"
                    >
                      <option value="years">Years</option>
                      <option value="months">Months</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    type="button" 
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-6 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    onClick={calculateEMI}
                  >
                    Calculate EMI
                  </button>
                  <button 
                    type="button" 
                    className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1"
                    onClick={resetCalculator}
                  >
                    Reset
                  </button>
                </div>

                {calculationResult && (
                  <div className="mt-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-yellow-400 shadow-lg">
                    <h3 className="text-lg font-bold text-gray-800 text-center mb-4">Calculation Results</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-white p-4 rounded-xl text-center shadow-md border border-gray-200">
                        <span className="block text-xs text-gray-600 mb-1 font-medium">Monthly EMI</span>
                        <span className="block text-lg font-bold text-gray-800">₹{calculationResult.emi.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="bg-white p-4 rounded-xl text-center shadow-md border border-gray-200">
                        <span className="block text-xs text-gray-600 mb-1 font-medium">Principal Amount</span>
                        <span className="block text-lg font-bold text-gray-800">₹{calculationResult.principal.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="bg-white p-4 rounded-xl text-center shadow-md border border-gray-200">
                        <span className="block text-xs text-gray-600 mb-1 font-medium">Total Interest</span>
                        <span className="block text-lg font-bold text-gray-800">₹{calculationResult.totalInterest.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="bg-white p-4 rounded-xl text-center shadow-md border border-gray-200">
                        <span className="block text-xs text-gray-600 mb-1 font-medium">Total Amount</span>
                        <span className="block text-lg font-bold text-gray-800">₹{calculationResult.totalAmount.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-xl text-center border-2 border-yellow-400">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        You will pay <strong className="text-orange-600 text-base">₹{calculationResult.emi.toLocaleString('en-IN')}</strong> monthly for {calculatorData.loanTenure} {calculatorData.tenureType}
                      </p>
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
