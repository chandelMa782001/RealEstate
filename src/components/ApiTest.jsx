import React, { useState } from 'react';
import { authAPI } from '../apiServcies/authApi';
import { handleApiError } from '../../utils/apiUtils';
import toast from 'react-hot-toast';

const ApiTest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [testResults, setTestResults] = useState([]);

  const addResult = (test, success, message) => {
    setTestResults(prev => [...prev, { test, success, message, timestamp: new Date().toLocaleTimeString() }]);
  };

  const testRegisterAPI = async () => {
    setIsLoading(true);
    try {
      const testData = {
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        mobile: '9876543210',
        password: 'Test@123'
      };

      const response = await authAPI.register(testData);
      addResult('Register API', true, 'Registration successful');
      toast.success('Register API test passed');
    } catch (error) {
      const errorResponse = handleApiError(error);
      addResult('Register API', false, errorResponse.message);
      toast.error('Register API test failed');
    } finally {
      setIsLoading(false);
    }
  };

  const testLoginAPI = async () => {
    setIsLoading(true);
    try {
      const testData = {
        email: 'test@example.com',
        password: 'Test@123'
      };

      const response = await authAPI.login(testData);
      addResult('Login API', true, 'Login successful');
      toast.success('Login API test passed');
    } catch (error) {
      const errorResponse = handleApiError(error);
      addResult('Login API', false, errorResponse.message);
      toast.error('Login API test failed');
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">API Integration Test</h2>
      
      <div className="space-y-4 mb-6">
        <button
          onClick={testRegisterAPI}
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isLoading ? 'Testing...' : 'Test Register API'}
        </button>
        
        <button
          onClick={testLoginAPI}
          disabled={isLoading}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50 ml-4"
        >
          {isLoading ? 'Testing...' : 'Test Login API'}
        </button>
        
        <button
          onClick={clearResults}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded ml-4"
        >
          Clear Results
        </button>
      </div>

      {testResults.length > 0 && (
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-semibold mb-3">Test Results:</h3>
          <div className="space-y-2">
            {testResults.map((result, index) => (
              <div
                key={index}
                className={`p-2 rounded ${
                  result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                <div className="font-medium">{result.test}</div>
                <div className="text-sm">{result.message}</div>
                <div className="text-xs opacity-75">{result.timestamp}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiTest;