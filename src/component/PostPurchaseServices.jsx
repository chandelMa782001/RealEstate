import { useState } from 'react';
import { 
  FaClipboardList, 
  FaHome, 
  FaWrench, 
  FaBolt, 
  FaPaintBrush, 
  FaShieldAlt,
  FaPhone,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaClock,
  FaRupeeSign,
  FaStar,
  FaExclamationTriangle
} from 'react-icons/fa';
import Navbar from './Navbar';
import Footer from './Footer';

const PostPurchaseServices = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedService, setSelectedService] = useState('all');
  const postPurchaseServices = [
    {
      id: 1,
      category: 'Property Registration',
      title: 'Property Registration Services',
      description: 'Complete property registration and documentation services',
      providers: [
        {
          name: 'Legal Associates Delhi',
          contact: '+91 9876543210',
          location: 'Connaught Place, Delhi',
          rating: 4.8,
          experience: '15+ Years',
          services: ['Property Registration', 'Title Verification', 'NOC Services'],
          price: '₹15,000 - ₹25,000'
        },
        {
          name: 'Property Legal Hub',
          contact: '+91 9876543211',
          location: 'Gurgaon, Haryana',
          rating: 4.6,
          experience: '12+ Years',
          services: ['Registration', 'Mutation', 'Legal Documentation'],
          price: '₹12,000 - ₹20,000'
        }
      ]
    },
    {
      id: 2,
      category: 'Interior Design',
      title: 'House Interior Services',
      description: 'Complete interior design and home decoration services',
      providers: [
        {
          name: 'Dream Interiors',
          contact: '+91 9876543212',
          location: 'South Delhi, Delhi',
          rating: 4.9,
          experience: '10+ Years',
          services: ['Complete Interior', 'Modular Kitchen', 'Bedroom Design'],
          price: '₹2,50,000 - ₹8,00,000'
        },
        {
          name: 'Modern Living Designs',
          contact: '+91 9876543213',
          location: 'Noida, UP',
          rating: 4.7,
          experience: '8+ Years',
          services: ['Living Room', 'Kitchen Design', 'Bathroom Interior'],
          price: '₹1,80,000 - ₹6,00,000'
        }
      ]
    },
    {
      id: 3,
      category: 'Plumbing',
      title: 'Plumbing Services',
      description: 'Professional plumbing installation and repair services',
      providers: [
        {
          name: 'Delhi Plumbing Solutions',
          contact: '+91 9876543214',
          location: 'Delhi NCR',
          rating: 4.5,
          experience: '20+ Years',
          services: ['Pipeline Installation', 'Bathroom Fitting', 'Water Tank Setup'],
          price: '₹5,000 - ₹50,000'
        },
        {
          name: 'Quick Fix Plumbers',
          contact: '+91 9876543215',
          location: 'Gurgaon, Haryana',
          rating: 4.4,
          experience: '15+ Years',
          services: ['Emergency Repairs', 'New Connections', 'Maintenance'],
          price: '₹3,000 - ₹40,000'
        }
      ]
    },
    {
      id: 4,
      category: 'Electrical',
      title: 'Electrical Services',
      description: 'Complete electrical installation and maintenance services',
      providers: [
        {
          name: 'Power Solutions Delhi',
          contact: '+91 9876543216',
          location: 'Central Delhi',
          rating: 4.6,
          experience: '18+ Years',
          services: ['Wiring', 'Panel Installation', 'Smart Home Setup'],
          price: '₹8,000 - ₹80,000'
        },
        {
          name: 'Bright Electrical Works',
          contact: '+91 9876543217',
          location: 'Noida, UP',
          rating: 4.3,
          experience: '12+ Years',
          services: ['Home Automation', 'LED Installation', 'Safety Systems'],
          price: '₹6,000 - ₹60,000'
        }
      ]
    },
    {
      id: 5,
      category: 'Painting',
      title: 'Painting & Renovation',
      description: 'Professional painting and home renovation services',
      providers: [
        {
          name: 'Color Craft Painters',
          contact: '+91 9876543218',
          location: 'Delhi NCR',
          rating: 4.7,
          experience: '14+ Years',
          services: ['Interior Painting', 'Exterior Painting', 'Texture Work'],
          price: '₹15,000 - ₹1,20,000'
        },
        {
          name: 'Perfect Paint Solutions',
          contact: '+91 9876543219',
          location: 'Gurgaon, Haryana',
          rating: 4.5,
          experience: '10+ Years',
          services: ['Wall Painting', 'Ceiling Work', 'Waterproofing'],
          price: '₹12,000 - ₹90,000'
        }
      ]
    },
    {
      id: 6,
      category: 'Security',
      title: 'Home Security Systems',
      description: 'Advanced security systems and surveillance solutions',
      providers: [
        {
          name: 'SecureHome Technologies',
          contact: '+91 9876543220',
          location: 'Delhi NCR',
          rating: 4.8,
          experience: '12+ Years',
          services: ['CCTV Installation', 'Smart Locks', 'Alarm Systems'],
          price: '₹25,000 - ₹2,00,000'
        },
        {
          name: 'Guardian Security Systems',
          contact: '+91 9876543221',
          location: 'Noida, UP',
          rating: 4.6,
          experience: '16+ Years',
          services: ['Video Surveillance', 'Access Control', 'Fire Safety'],
          price: '₹20,000 - ₹1,50,000'
        }
      ]
    }
  ];

  const filteredServices = postPurchaseServices.filter(service => {
    const matchesCategory = selectedService === 'all' || service.category.toLowerCase().includes(selectedService.toLowerCase());
    const matchesLocation = searchLocation === '' || 
      service.providers.some(provider => 
        provider.location.toLowerCase().includes(searchLocation.toLowerCase()) ||
        provider.name.toLowerCase().includes(searchLocation.toLowerCase()) ||
        provider.services.some(s => s.toLowerCase().includes(searchLocation.toLowerCase()))
      );
    return matchesCategory && matchesLocation;
  });

  const handleContactProvider = (provider) => {
    window.open(`tel:${provider.contact}`, '_self');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Post-Purchase Services
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Complete your property journey with our trusted service providers. From registration to interior design, we have got you covered.
            </p>
          </div>

          {/* Quick Access Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Access</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {postPurchaseServices.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.category.toLowerCase())}
                  className={`p-3 rounded-lg text-center transition-all ${
                    selectedService === service.category.toLowerCase()
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <div className="text-2xl mb-2 flex justify-center">
                    {service.category === 'Property Registration' && <FaClipboardList />}
                    {service.category === 'Interior Design' && <FaHome />}
                    {service.category === 'Plumbing' && <FaWrench />}
                    {service.category === 'Electrical' && <FaBolt />}
                    {service.category === 'Painting' && <FaPaintBrush />}
                    {service.category === 'Security' && <FaShieldAlt />}
                  </div>
                  <div className="text-sm font-medium">{service.category}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search by Location
                </label>
                <input
                  type="text"
                  placeholder="Enter city or area (e.g., Delhi, Gurgaon, Noida)"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Category
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="all">All Services</option>
                  <option value="property registration">Property Registration</option>
                  <option value="interior design">Interior Design</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="electrical">Electrical</option>
                  <option value="painting">Painting</option>
                  <option value="security">Security Systems</option>
                </select>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="space-y-8">
            {filteredServices.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-orange-500 text-white p-4">
                  <h2 className="text-2xl font-bold">{service.title}</h2>
                  <p className="text-orange-100 mt-1">{service.description}</p>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {service.providers.map((provider, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-semibold text-gray-800">{provider.name}</h3>
                          <div className="flex items-center">
                            <FaStar className="text-yellow-500" />
                            <span className="text-sm text-gray-600 ml-1">{provider.rating}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <p className="text-gray-600 flex items-center gap-2">
                            <FaMapMarkerAlt className="text-orange-500" />
                            <span className="font-medium">Location:</span> {provider.location}
                          </p>
                          <p className="text-gray-600 flex items-center gap-2">
                            <FaPhone className="text-green-500" />
                            <span className="font-medium">Contact:</span> {provider.contact}
                          </p>
                          <p className="text-gray-600 flex items-center gap-2">
                            <FaClock className="text-blue-500" />
                            <span className="font-medium">Experience:</span> {provider.experience}
                          </p>
                          <p className="text-gray-600 flex items-center gap-2">
                            <FaRupeeSign className="text-purple-500" />
                            <span className="font-medium">Price Range:</span> {provider.price}
                          </p>
                        </div>

                        <div className="mb-4">
                          <p className="font-medium text-gray-700 mb-2">Services Offered:</p>
                          <div className="flex flex-wrap gap-2">
                            {provider.services.map((service, idx) => (
                              <span key={idx} className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm">
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleContactProvider(provider)}
                            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                          >
                            <FaPhone />
                            Call Now
                          </button>
                          <button
                            onClick={() => window.open(`https://wa.me/${provider.contact.replace(/[^0-9]/g, '')}`, '_blank')}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                          >
                            <FaWhatsapp />
                            WhatsApp
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No services found for your search criteria.</p>
              <p className="text-gray-400 mt-2">Try adjusting your location or service category.</p>
            </div>
          )}

          {/* Emergency Services Section */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mt-8">
            <h3 className="text-xl font-semibold text-red-800 mb-4 flex items-center gap-2">
              <FaExclamationTriangle className="text-red-600" />
              Emergency Services (24/7 Available)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-red-200">
                <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                  <FaWrench className="text-blue-500" />
                  Emergency Plumbing
                </h4>
                <p className="text-sm text-gray-600 mb-2">24/7 plumbing emergency services</p>
                <p className="text-red-600 font-medium flex items-center gap-2">
                  <FaPhone />
                  +91 9876543222
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-red-200">
                <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                  <FaBolt className="text-yellow-500" />
                  Emergency Electrical
                </h4>
                <p className="text-sm text-gray-600 mb-2">24/7 electrical emergency services</p>
                <p className="text-red-600 font-medium flex items-center gap-2">
                  <FaPhone />
                  +91 9876543223
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-red-200">
                <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                  <FaShieldAlt className="text-green-500" />
                  Emergency Security
                </h4>
                <p className="text-sm text-gray-600 mb-2">24/7 security emergency services</p>
                <p className="text-red-600 font-medium flex items-center gap-2">
                  <FaPhone />
                  +91 9876543224
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PostPurchaseServices;