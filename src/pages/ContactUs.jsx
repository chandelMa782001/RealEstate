import React from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl">Get in touch with us</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Get In Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <FaMapMarkerAlt className="text-orange-500 text-2xl mt-1" />
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Office Address</h3>
                  <p className="text-gray-600">B315 Roman court Ansal City Kundli</p>
                  <p className="text-gray-600">Sonipat Haryana 131028, India</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <FaPhone className="text-orange-500 text-2xl mt-1" />
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Phone</h3>
                  <a href="tel:+919354527118" className="text-gray-600 hover:text-orange-500">
                    +91-9354527118
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <FaEnvelope className="text-orange-500 text-2xl mt-1" />
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Email</h3>
                  <a href="mailto:info@maigreatgroup.com" className="text-gray-600 hover:text-orange-500">
                    info@maigreatgroup.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <FaWhatsapp className="text-orange-500 text-2xl mt-1" />
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">WhatsApp</h3>
                  <a href="https://wa.me/919354527118" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-orange-500">
                    Chat with us
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <textarea
                placeholder="Your Message"
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
              >
                Send Message
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
