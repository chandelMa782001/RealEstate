import React, { useState } from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import { validateForm } from '../../utils/validation';
import { useAppContext } from '../Context/AppContext';

const ContactUs = () => {
  const { showNotification } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      phone: true,
      message: true
    });

    // Validate all fields
    const validationErrors = validateForm(formData, ['name', 'email', 'phone', 'message']);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setIsSubmitting(false);
      showNotification('Please fix the errors before submitting', 'error', 3000);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showNotification('Message sent successfully! We will get back to you soon.', 'success', 4000);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Contact Us</h1>
          <p className="text-base sm:text-lg md:text-xl">Get in touch with us</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">Get In Touch</h2>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <FaMapMarkerAlt className="text-orange-500 text-xl sm:text-2xl mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Office Address</h3>
                  <p className="text-gray-600 text-sm sm:text-base">B315 Roman court Ansal City Kundli</p>
                  <p className="text-gray-600 text-sm sm:text-base">Sonipat Haryana 131028, India</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4">
                <FaPhone className="text-orange-500 text-xl sm:text-2xl mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Phone</h3>
                  <a href="tel:+919354527118" className="text-gray-600 hover:text-orange-500 text-sm sm:text-base">
                    +91-9354527118
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4">
                <FaEnvelope className="text-orange-500 text-xl sm:text-2xl mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Email</h3>
                  <a href="mailto:info@maigreatgroup.com" className="text-gray-600 hover:text-orange-500 text-sm sm:text-base break-all">
                    info@maigreatgroup.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4">
                <FaWhatsapp className="text-orange-500 text-xl sm:text-2xl mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">WhatsApp</h3>
                  <a href="https://wa.me/919354527118" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-orange-500 text-sm sm:text-base">
                    Chat with us
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4" noValidate>
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={() => handleBlur('name')}
                  placeholder="Your Name"
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ${
                    touched.name && errors.name 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-orange-500'
                  }`}
                />
                {touched.name && errors.name && (
                  <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur('email')}
                  placeholder="Your Email"
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ${
                    touched.email && errors.email 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-orange-500'
                  }`}
                />
                {touched.email && errors.email && (
                  <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={() => handleBlur('phone')}
                  placeholder="Phone Number (10 digits)"
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ${
                    touched.phone && errors.phone 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-orange-500'
                  }`}
                  maxLength="10"
                />
                {touched.phone && errors.phone && (
                  <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={() => handleBlur('message')}
                  placeholder="Your Message (minimum 10 characters)"
                  rows="5"
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ${
                    touched.message && errors.message 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-orange-500'
                  }`}
                  maxLength="1000"
                ></textarea>
                {touched.message && errors.message && (
                  <p className="text-red-500 text-xs mt-1 ml-1">{errors.message}</p>
                )}
                <p className="text-gray-500 text-xs mt-1 ml-1">
                  {formData.message.length}/1000 characters
                </p>
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
