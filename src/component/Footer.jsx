import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { images } from '../../utils/Image';
const Footer = () => {
  const [email, setEmail] = useState('');
  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Subscribed:', email);
    setEmail('');
  };
  return (
    <footer className="bg-[#1a1d2e] text-white py-12 text-base font-normal">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
       
          <div className="md:col-span-5">
            <div className="mb-4">
              <img src={images.companylogo} alt="Company Logo" className="h-12 w-auto object-contain" />
            </div>
            <p className="text-gray-300 text-base mb-4 leading-relaxed">
              Maigreat Group in real estate established in the year 2015, with a combined experience of 10+ years and an aim of providing ultra-luxury residences to clients for an abode or future investments. We are working on multiple projects in a windswept with unique conceptual theme, transversal skills of our teammates.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-orange-500 mt-1 flex-shrink-0 text-base" />
                <div className="text-sm text-gray-300">
                  <p>Roman court Ansal city kundli</p>
                  <p>delhi NCR Sonipat Haryana 131028, India.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-orange-500 mt-1 flex-shrink-0 text-base" />
                <div className="text-sm text-gray-300">
                  <p>Kap Kon building</p>
                  <p>Sco 98, Sector 19 Omaxe city, Sonipat</p>
                  <p>Haryana 131001, India.</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <FaPhone className="text-orange-500 text-base" />
                <a href="tel:+919354527118" className="text-sm text-gray-300 hover:text-orange-400">
                  +91-9354527118
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-orange-500 text-base" />
                <a href="mailto:info@maigreatgroup.com" className="text-sm text-gray-300 hover:text-orange-400">
                  info@maigreatgroup.com
                </a>
              </div>
            </div>
          </div>

       
          <div className="md:col-span-2">
            <h4 className="text-lg font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-orange-400 transition text-base">Home</Link></li>
              <li><Link to="/about-us" className="text-gray-300 hover:text-orange-400 transition text-base">About Us</Link></li>
              <li><Link to="/offers" className="text-gray-300 hover:text-orange-400 transition text-base">View Offer</Link></li>
              <li><Link to="/projects" className="text-gray-300 hover:text-orange-400 transition text-base">Projects</Link></li>
              <li><Link to="/blogs" className="text-gray-300 hover:text-orange-400 transition text-base">Blog</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition text-base">Site map</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition text-base">Advertise With us</a></li>
            </ul>
          </div>

          {/* Customer Care - Takes 2 columns */}
          <div className="md:col-span-2">
            <h4 className="text-lg font-bold mb-4">Customer Care</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition text-base">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition text-base">Feedback</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition text-base">Career</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-400 transition text-base">Help Center</a></li>
              <li><Link to="/contact-us" className="text-gray-300 hover:text-orange-400 transition text-base">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter - Takes 3 columns */}
          <div className="md:col-span-3">
            <h4 className="text-lg font-bold mb-4">Newsletter</h4>
            <p className="text-gray-300 text-base mb-4">
              Subscribe to our weekly Newsletter and receive updates via email.
            </p>
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email*"
                className="w-full bg-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 text-base"
                required
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white p-2.5 rounded transition"
              >
                <FaPaperPlane className="text-sm" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 mb-6">
          <p className="text-gray-300 text-sm leading-relaxed">
            <span className="font-semibold">Disclaimer:</span> The content, listings, and information provided on www.maigreatgroup.com are for general informational purposes only. While we strive for accuracy, we do not warrant or guarantee the completeness, accuracy, reliability, or availability of any listings, data, or other information on the platform. All information provided on this platform, including but not limited to property details, pricing, agent details, and property images, should not be considered as professional real estate advice. Users are encouraged to consult with a real estate professional or legal counsel before making any property-related decisions.
          </p>
        </div>
        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2024 Maigreat Group. All rights reserved.
          </p>
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg transition transform hover:scale-110"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </footer>
  );
};
export default Footer;
