import { useState } from 'react';
import api from '../apiServcies/axios';

const ServerStatusChecker = () => {
  const [status, setStatus] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  const checkServerStatus = async () => {
    setIsChecking(true);
    setStatus('Checking server status...');
    
    try {
      // Try a simple health check or any existing endpoint
      const startTime = Date.now();
      const response = await api.get('/api/health', { timeout: 10000 });
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      setStatus(`✅ Server is online! Response time: ${responseTime}ms`);
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        setStatus('⏰ Server timeout - The server might be starting up (common with free hosting). Try again in 2-3 minutes.');
      } else if (error.code === 'ERR_NETWORK') {
        setStatus('🌐 Network error - Check your internet connection.');
      } else if (error.response?.status === 404) {
        setStatus('✅ Server is online but health endpoint not found (this is normal).');
      } else {
        setStatus(`❌ Server error: ${error.message}`);
      }
    } finally {
      setIsChecking(false);
    }
  };

  const testForgotPasswordEndpoint = async () => {
    setIsChecking(true);
    setStatus('Testing forgot password endpoint...');
    
    try {
      const startTime = Date.now();
      // Test with a dummy email to see if endpoint exists
      await api.post('/api/dealer/forgot-password', { email: 'test@example.com' }, { timeout: 15000 });
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      setStatus(`✅ Forgot password endpoint is working! Response time: ${responseTime}ms`);
    } catch (error) {
      const endTime = Date.now();
      const responseTime = endTime - Date.now();
      
      if (error.code === 'ECONNABORTED') {
        setStatus('⏰ Endpoint timeout - Server might be slow or starting up.');
      } else if (error.response?.status === 400 || error.response?.status === 404) {
        setStatus(`✅ Endpoint exists but returned ${error.response.status} (expected for test email). Response time: ${Math.abs(responseTime)}ms`);
      } else if (error.response?.status === 500) {
        setStatus('⚠️ Server error (500) - Endpoint exists but server has internal issues.');
      } else {
        setStatus(`❌ Error: ${error.message}`);
      }
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Server Status Checker</h2>
      
      <div className="space-y-4">
        <button
          onClick={checkServerStatus}
          disabled={isChecking}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isChecking ? 'Checking...' : 'Check Server Status'}
        </button>
        
        <button
          onClick={testForgotPasswordEndpoint}
          disabled={isChecking}
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:bg-gray-400"
        >
          {isChecking ? 'Testing...' : 'Test Forgot Password Endpoint'}
        </button>

        {status && (
          <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
            <pre className="whitespace-pre-wrap">{status}</pre>
          </div>
        )}
        
        <div className="text-xs text-gray-500 mt-4">
          <p><strong>Server URL:</strong> {import.meta.env.VITE_API_BASE_URL}</p>
          <p><strong>Note:</strong> Free hosting services (like Render) may take 30-60 seconds to wake up if inactive.</p>
        </div>
      </div>
    </div>
  );
};

export default ServerStatusChecker;