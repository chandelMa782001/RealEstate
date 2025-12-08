import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaPhone, FaEnvelope, FaBuilding, FaChevronLeft, FaCheckCircle, FaAward } from 'react-icons/fa';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { validateForm } from '../../utils/validation';
import { useAppContext } from '../Context/AppContext';
import gsap from 'gsap';

const BuilderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showNotification } = useAppContext();
  const contentRef = useRef(null);
  const sidebarRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const builders = {
    1: {
      id: 1,
      name: 'Raghav Kumar',
      location: 'Gurgaon, Haryana',
      experience: '10+ Years',
      projects: 50,
      rating: 4.5,
      specialization: 'Residential & Commercial',
      phone: '+91 9354527118',
      email: 'raghav.kumar@realestate.com',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200',
      description: 'Raghav Kumar is an experienced real estate dealer with over 10 years of expertise in delivering quality residential and commercial projects. Committed to excellence and customer satisfaction.',
      completedProjects: ['Luxury Villas in Gurgaon', 'Modern Apartments in Dwarka', 'Commercial Spaces in CP'],
      ongoingProjects: ['Premium Penthouse in Vasant Kunj', 'Office Space in Cyber City'],
      achievements: [
        'Best Dealer Award 2023',
        'Customer Satisfaction Excellence',
        'Top Performer in NCR Region',
        'Trusted Property Consultant'
      ],
      services: [
        'Residential Properties',
        'Commercial Properties',
        'Property Consultation',
        'Legal Documentation',
        'Home Loan Assistance',
        'Property Valuation'
      ],
      established: '2015',
      headquarters: 'Gurgaon, Haryana',
      employees: '15+',
      website: 'www.raghavproperties.com'
    },
    2: {
      id: 2,
      name: 'Priya Sharma',
      location: 'New Delhi, Delhi',
      experience: '15+ Years',
      projects: 80,
      rating: 4.8,
      specialization: 'Luxury Residential',
      phone: '+91 124 4567890',
      email: 'priya.sharma@properties.com',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200',
      description: 'Priya Sharma is a trusted property dealer specializing in luxury residential properties across Delhi NCR with over 15 years of experience.',
      completedProjects: ['Premium Apartments in Delhi', 'Luxury Penthouses', 'Villa Projects in Gurgaon', 'High-End Flats'],
      ongoingProjects: ['Ultra-Luxury Apartments', 'Premium Villas'],
      achievements: [
        'Top Luxury Property Dealer',
        'Multiple Excellence Awards',
        'Customer Choice Award',
        'Best Service Provider 2023'
      ],
      services: [
        'Luxury Residential',
        'Premium Properties',
        'Property Investment',
        'Portfolio Management',
        'NRI Services',
        'Property Management'
      ],
      established: '2010',
      headquarters: 'New Delhi, Delhi',
      employees: '25+',
      website: 'www.priyaproperties.com'
    }
  };

  const builder = builders[id] || builders[1];

  const validateField = (field, value) => {
    const fieldErrors = validateForm({ [field]: value }, [field]);
    setErrors(prev => ({ ...prev, [field]: fieldErrors[field] || '' }));
    return !fieldErrors[field];
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTouched({
      name: true,
      phone: true,
      email: true,
      message: true
    });

    const validationErrors = validateForm(formData, ['name', 'phone', 'email', 'message']);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setIsSubmitting(false);
      showNotification('Please fix the errors before submitting', 'error', 3000);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showNotification('Message sent successfully! The builder will contact you soon.', 'success', 4000);
      
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: ''
      });
      setErrors({});
      setTouched({});
    } catch (error) {
      showNotification('Failed to send message. Please try again.', 'error', 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(
      contentRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo(
      sidebarRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <button 
          onClick={() => navigate(-1)}
          className="mb-4 sm:mb-6 flex items-center text-gray-600 hover:text-orange-500 transition bg-white px-3 sm:px-4 py-2 rounded-lg shadow-md hover:shadow-lg text-sm sm:text-base"
        >
          <FaChevronLeft className="mr-2" />
          Back to Builders
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div ref={contentRef} className="lg:col-span-2">
            <div className="relative mb-4 sm:mb-6 shadow-lg rounded-lg overflow-hidden h-64 sm:h-80 md:h-96">
              <img 
                src={builder.image} 
                alt={builder.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center space-x-1 sm:space-x-2 shadow-lg">
                <FaStar className="text-yellow-500 text-sm sm:text-base" />
                <span className="font-bold text-gray-800 text-sm sm:text-base">{builder.rating}</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-3">
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{builder.name}</h1>
                  <p className="text-gray-600 flex items-center text-base sm:text-lg">
                    <FaMapMarkerAlt className="mr-2 text-orange-500 flex-shrink-0" />
                    <span className="break-words">{builder.location}</span>
                  </p>
                </div>
                <div className="bg-green-100 text-green-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold text-sm sm:text-base whitespace-nowrap">
                  {builder.experience}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b">
                <div className="text-center">
                  <FaBuilding className="text-orange-500 text-2xl sm:text-3xl mx-auto mb-1 sm:mb-2" />
                  <p className="text-lg sm:text-2xl font-bold text-gray-800">{builder.projects}+</p>
                  <p className="text-xs sm:text-sm text-gray-600">Projects</p>
                </div>
                <div className="text-center">
                  <FaAward className="text-orange-500 text-2xl sm:text-3xl mx-auto mb-1 sm:mb-2" />
                  <p className="text-lg sm:text-2xl font-bold text-gray-800">{builder.achievements.length}</p>
                  <p className="text-xs sm:text-sm text-gray-600">Awards</p>
                </div>
                <div className="text-center">
                  <FaStar className="text-orange-500 text-2xl sm:text-3xl mx-auto mb-1 sm:mb-2" />
                  <p className="text-lg sm:text-2xl font-bold text-gray-800">{builder.rating}</p>
                  <p className="text-xs sm:text-sm text-gray-600">Rating</p>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">{builder.description}</p>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Company Details</h2>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div>
                  <p className="text-gray-500 text-sm">Established</p>
                  <p className="font-semibold text-gray-800">{builder.established}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Headquarters</p>
                  <p className="font-semibold text-gray-800">{builder.headquarters}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Employees</p>
                  <p className="font-semibold text-gray-800">{builder.employees}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Specialization</p>
                  <p className="font-semibold text-gray-800">{builder.specialization}</p>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Completed Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                {builder.completedProjects.map((project, index) => (
                  <div key={index} className="flex items-start space-x-2 bg-green-50 p-2 sm:p-3 rounded-lg">
                    <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0 text-sm sm:text-base" />
                    <span className="text-gray-700 text-xs sm:text-sm">{project}</span>
                  </div>
                ))}
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Ongoing Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                {builder.ongoingProjects.map((project, index) => (
                  <div key={index} className="flex items-start space-x-2 bg-blue-50 p-2 sm:p-3 rounded-lg">
                    <FaBuilding className="text-blue-500 mt-1 flex-shrink-0 text-sm sm:text-base" />
                    <span className="text-gray-700 text-xs sm:text-sm">{project}</span>
                  </div>
                ))}
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Services Offered</h2>
              <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                {builder.services.map((service, index) => (
                  <span key={index} className="bg-orange-100 text-orange-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">
                    {service}
                  </span>
                ))}
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Achievements & Awards</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                {builder.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-2 bg-yellow-50 p-2 sm:p-3 rounded-lg">
                    <FaAward className="text-yellow-500 mt-1 flex-shrink-0 text-sm sm:text-base" />
                    <span className="text-gray-700 text-xs sm:text-sm">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div ref={sidebarRef} className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:sticky lg:top-24">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Contact Information</h3>
              
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <a 
                  href={`tel:${builder.phone}`}
                  className="flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-3 rounded-lg transition text-sm sm:text-base"
                >
                  <FaPhone />
                  <span>Call Now</span>
                </a>
                
                <a 
                  href={`https://wa.me/${builder.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-3 bg-green-600 hover:bg-green-700 text-white py-2.5 sm:py-3 rounded-lg transition text-sm sm:text-base"
                >
                  <FaPhone />
                  <span>WhatsApp</span>
                </a>
                
                <a 
                  href={`mailto:${builder.email}`}
                  className="flex items-center justify-center space-x-3 bg-gray-600 hover:bg-gray-700 text-white py-2.5 sm:py-3 rounded-lg transition text-sm sm:text-base"
                >
                  <FaEnvelope />
                  <span>Email</span>
                </a>
              </div>

              <div className="border-t pt-4 sm:pt-6">
                <h4 className="font-bold text-gray-800 mb-3 sm:mb-4 text-base sm:text-lg">Get in Touch</h4>
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4" noValidate>
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={() => handleBlur('name')}
                      placeholder="Your Name"
                      className={`w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ${
                        touched.name && errors.name 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 focus:ring-orange-500'
                      }`}
                    />
                    {touched.name && errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={() => handleBlur('phone')}
                      placeholder="Phone Number"
                      className={`w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ${
                        touched.phone && errors.phone 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 focus:ring-orange-500'
                      }`}
                      maxLength="10"
                    />
                    {touched.phone && errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur('email')}
                      placeholder="Email"
                      className={`w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ${
                        touched.email && errors.email 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 focus:ring-orange-500'
                      }`}
                    />
                    {touched.email && errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={() => handleBlur('message')}
                      placeholder="Your Message"
                      rows="4"
                      className={`w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ${
                        touched.message && errors.message 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 focus:ring-orange-500'
                      }`}
                      maxLength="1000"
                    ></textarea>
                    {touched.message && errors.message && (
                      <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 sm:py-3 rounded-lg font-semibold transition text-sm sm:text-base ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>

              <div className="border-t mt-4 sm:mt-6 pt-4 sm:pt-6">
                <p className="text-xs sm:text-sm text-gray-600 mb-2 break-words">
                  <span className="font-semibold">Phone:</span> {builder.phone}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 mb-2 break-all">
                  <span className="font-semibold">Email:</span> {builder.email}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 break-words">
                  <span className="font-semibold">Website:</span> {builder.website}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BuilderDetail;
