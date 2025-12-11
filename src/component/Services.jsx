import React from 'react';
const Services = () => {
  const services = [
    {
      icon: '🏠',
      title: 'Buy Property',
      description: 'Find your dream home from thousands of verified listings'
    },
    {
      icon: '💰',
      title: 'Sell Property',
      description: 'List your property and reach millions of buyers'
    },
    {
      icon: '🔑',
      title: 'Rent Property',
      description: 'Discover rental properties that match your needs'
    },
    {
      icon: '📊',
      title: 'Property Valuation',
      description: 'Get accurate market value of your property'
    }
  ];
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-2 text-center">Our Services</h2>
        <p className="text-gray-600 text-center mb-12">Everything you need for your real estate journey</p> 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition group">
              <div className="text-6xl mb-4 group-hover:scale-110 transition">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Services;
