import { useState } from 'react';
import { dealerAPI } from '../apiServcies/authApi';

const ResetPasswordTest = () => {
  const [email, setEmail] = useState('demo@gmail.com');
  const [newPassword, setNewPassword] = useState('123456');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const testResetPassword = async () => {
    setLoading(true);
    setResult('');
    
    try {
      console.log('🧪 Testing reset password API...');
      const response = await dealerAPI.resetPassword(email, newPassword);
      console.log('✅ Test successful:', response);
      setResult(`Success: ${JSON.stringify(response, null, 2)}`);
    } catch (error) {
      console.error('❌ Test failed:', error);
      setResult(`Error: ${error.message || JSON.stringify(error, null, 2)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Reset Password API Test</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <button
          onClick={testResetPassword}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Testing...' : 'Test Reset Password API'}
        </button>
        
        {result && (
          <div className="mt-4 p-3 bg-gray-100 rounded-md">
            <pre className="text-sm whitespace-pre-wrap">{result}</pre>
          </div>
        )}
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p><strong>API Endpoint:</strong> POST /dealer/reset-password</p>
        <p><strong>Payload:</strong> {`{"email": "${email}", "newPassword": "${newPassword}"}`}</p>
      </div>
    </div>
  );
};

export default ResetPasswordTest;