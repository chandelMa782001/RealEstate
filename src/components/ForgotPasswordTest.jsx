import { useState } from 'react';
import { dealerAPI } from '../apiServcies/authApi';

const ForgotPasswordTest = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const testForgotPassword = async () => {
    if (!email) {
      setMessage('Please enter an email');
      return;
    }

    setIsLoading(true);
    try {
      const response = await dealerAPI.forgotPassword(email);
      setMessage(`Success: ${JSON.stringify(response)}`);
    } catch (error) {
      setMessage(`Error: ${JSON.stringify(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testVerifyOtp = async () => {
    if (!email || !otp) {
      setMessage('Please enter both email and OTP');
      return;
    }

    setIsLoading(true);
    try {
      const response = await dealerAPI.verifyOtp(email, otp);
      setMessage(`Success: ${JSON.stringify(response)}`);
    } catch (error) {
      setMessage(`Error: ${JSON.stringify(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Forgot Password API Test</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="manishchandel9720987840@gmail.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="123456"
            maxLength="6"
          />
        </div>

        <div className="space-y-2">
          <button
            onClick={testForgotPassword}
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            Test Forgot Password API
          </button>
          
          <button
            onClick={testVerifyOtp}
            disabled={isLoading}
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:bg-gray-400"
          >
            Test Verify OTP API
          </button>
        </div>

        {message && (
          <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
            <pre className="whitespace-pre-wrap">{message}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordTest;