import { useState } from 'react';
import { authAPI } from '../apiServcies/authApi';

const ApiConnectionTest = () => {
  const [testResult, setTestResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const testConnection = async () => {
    setIsLoading(true);
    setTestResult('Testing connection...');
    
    try {
      const testData = {
        name: 'Test User',
        email: 'test@example.com',
        mobile: '1234567890',
        password: 'Test@123'
      };
      
      console.log('🧪 Testing API connection with:', testData);
      
      const response = await authAPI.register(testData);
      setTestResult(`✅ Success: ${JSON.stringify(response, null, 2)}`);
    } catch (error) {
      console.log('🧪 Test Error:', error);
      setTestResult(`❌ Error: ${error.message || error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50 m-4">
      <h3 className="text-lg font-bold mb-4">API Connection Test</h3>
      <button 
        onClick={testConnection}
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? 'Testing...' : 'Test API Connection'}
      </button>
      
      {testResult && (
        <div className="mt-4 p-3 bg-white border rounded">
          <pre className="text-sm whitespace-pre-wrap">{testResult}</pre>
        </div>
      )}
    </div>
  );
};

export default ApiConnectionTest;