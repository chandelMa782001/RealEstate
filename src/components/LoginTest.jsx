import React, { useState } from 'react';
import { authAPI } from '../apiServcies/authApi';
import toast from 'react-hot-toast';

const LoginTest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const testLogin = async () => {
    setIsLoading(true);
    setResponse(null);
    
    try {
      // Test with the exact payload format you provided
      const testPayload = {
        "email": "demo@gmail.com",
        "password": "Demo@123"
      };
      
      console.log('🧪 Testing login with payload:', testPayload);
      
      const result = await authAPI.login(testPayload);
      
      console.log('✅ Login test successful:', result);
      setResponse(result);
      toast.success('Login test successful!');
      
    } catch (error) {
      console.log('❌ Login test failed:', error);
      setResponse({ error: error });
      toast.error('Login test failed: ' + (error.message || 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Login API Test</h2>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Test Payload:</p>
        <pre className="bg-gray-100 p-2 rounded text-xs">
{`{
  "email": "demo@gmail.com",
  "password": "Demo@123"
}`}
        </pre>
      </div>
      
      <button
        onClick={testLogin}
        disabled={isLoading}
        className={`w-full py-2 px-4 rounded font-semibold transition ${
          isLoading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        {isLoading ? 'Testing...' : 'Test Login API'}
      </button>
      
      {response && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Response:</h3>
          <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-40">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default LoginTest;