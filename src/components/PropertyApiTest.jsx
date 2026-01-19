import React, { useState } from 'react';
import api from '../apiServcies/axios';

const PropertyApiTest = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const testEndpoints = async () => {
    setLoading(true);
    setResults([]);
    
    const testPropertyId = 9; // Using the ID from your error log
    const testPayload = {
      propertyType: "RESIDENTIAL",
      propertyCategory: "VILLA",
      rentalOption: "BUY",
      bedrooms: "BHK_3",
      price: 5000000,
      areaSqft: 1200,
      description: "Test property",
      hasGoldOffer: true,
      estimatedGoldValue: 120000,
      goldItemDesc: "Test gold offer"
    };

    const endpoints = [
      { method: 'POST', url: `/properties/basic-info/${testPropertyId}`, name: 'Original POST' },
      { method: 'PUT', url: `/properties/basic-info/${testPropertyId}`, name: 'PUT basic-info' },
      { method: 'POST', url: `/properties/${testPropertyId}/basic-info`, name: 'POST alt structure' },
      { method: 'PUT', url: `/properties/${testPropertyId}`, name: 'PUT property directly' },
      { method: 'PATCH', url: `/properties/${testPropertyId}`, name: 'PATCH property' },
      { method: 'POST', url: `/properties/${testPropertyId}`, name: 'POST property directly' }
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await api[endpoint.method.toLowerCase()](endpoint.url, testPayload);
        setResults(prev => [...prev, {
          name: endpoint.name,
          method: endpoint.method,
          url: endpoint.url,
          status: 'SUCCESS',
          data: response.data
        }]);
      } catch (error) {
        setResults(prev => [...prev, {
          name: endpoint.name,
          method: endpoint.method,
          url: endpoint.url,
          status: 'ERROR',
          error: error.response?.status || error.message,
          message: error.response?.data?.message || error.message
        }]);
      }
    }
    
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Property API Endpoint Tester</h2>
      <button 
        onClick={testEndpoints} 
        disabled={loading}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Testing...' : 'Test All Endpoints'}
      </button>

      {results.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Test Results:</h3>
          {results.map((result, index) => (
            <div 
              key={index} 
              style={{
                border: '1px solid #ddd',
                borderRadius: '5px',
                padding: '10px',
                margin: '10px 0',
                backgroundColor: result.status === 'SUCCESS' ? '#d4edda' : '#f8d7da'
              }}
            >
              <h4>{result.name}</h4>
              <p><strong>Method:</strong> {result.method}</p>
              <p><strong>URL:</strong> {result.url}</p>
              <p><strong>Status:</strong> {result.status}</p>
              {result.status === 'ERROR' && (
                <>
                  <p><strong>Error:</strong> {result.error}</p>
                  <p><strong>Message:</strong> {result.message}</p>
                </>
              )}
              {result.status === 'SUCCESS' && (
                <pre style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '3px' }}>
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyApiTest;