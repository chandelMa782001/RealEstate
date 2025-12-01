import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch } from 'react-icons/fa';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-2xl">
          <h1 className="text-9xl font-bold text-orange-500 mb-4">404</h1>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h2>
          <p className="text-xl text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
          <div className="mb-8">
            <svg className="w-64 h-64 mx-auto text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/"
              className="flex items-center justify-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition shadow-lg"
            >
              <FaHome />
              <span>Go to Homepage</span>
            </Link>
            
            <Link 
              to="/projects"
              className="flex items-center justify-center space-x-2 bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold transition shadow-lg"
            >
              <FaSearch />
              <span>Browse Projects</span>
            </Link>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-4">You might be looking for:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/about-us" className="text-orange-500 hover:text-orange-600 font-semibold">
                About Us
              </Link>
              <span className="text-gray-400">|</span>
              <Link to="/projects" className="text-orange-500 hover:text-orange-600 font-semibold">
                Projects
              </Link>
              <span className="text-gray-400">|</span>
              <Link to="/contact-us" className="text-orange-500 hover:text-orange-600 font-semibold">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
