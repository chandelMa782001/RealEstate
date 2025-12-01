import React from 'react';
import { FaCheckCircle, FaUsers, FaBuilding, FaAward } from 'react-icons/fa';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import WhyChooseUs from '../component/WhyChooseUs';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate=useNavigate()
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
   
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl">Your Trusted Partner in Real Estate</p>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Who We Are</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Maigreat Group in real estate established in the year 2015, with a combined experience of 10+ years and an aim of providing ultra-luxury residences to clients for an abode or future investments.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              We are working on multiple projects in a windswept with unique conceptual theme, transversal skills of our teammates. Our commitment to excellence and customer satisfaction has made us one of the most trusted names in the real estate industry.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              With a focus on quality, transparency, and innovation, we strive to deliver properties that exceed expectations and create lasting value for our clients.
            </p>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800" 
              alt="About Us" 
              className="rounded-lg shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-4xl text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Integrity</h3>
              <p className="text-gray-600">
                We maintain the highest standards of honesty and transparency in all our dealings.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-4xl text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Customer Focus</h3>
              <p className="text-gray-600">
                Our clients' satisfaction and success are at the heart of everything we do.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaBuilding className="text-4xl text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Quality</h3>
              <p className="text-gray-600">
                We deliver exceptional quality in every project and service we provide.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaAward className="text-4xl text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Excellence</h3>
              <p className="text-gray-600">
                We continuously strive for excellence in all aspects of our business.
              </p>
            </div>
          </div>
        </div>
      </div>

   
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-5xl font-bold text-orange-500 mb-2">10+</h3>
              <p className="text-xl">Years Experience</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold text-orange-500 mb-2">500+</h3>
              <p className="text-xl">Happy Clients</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold text-orange-500 mb-2">50+</h3>
              <p className="text-xl">Projects Completed</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold text-orange-500 mb-2">100%</h3>
              <p className="text-xl">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </div>

   
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              To provide exceptional real estate solutions that create lasting value for our clients through innovation, integrity, and unwavering commitment to excellence. We aim to make property ownership accessible and rewarding for everyone.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Vision</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              To be the most trusted and preferred real estate company in India, known for our quality projects, customer-centric approach, and contribution to building sustainable communities that enhance the quality of life.
            </p>
          </div>
        </div>
      </div>

  <WhyChooseUs/>

 
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Dream Property?</h2>
          <p className="text-xl mb-8">Let us help you find the perfect home or investment opportunity.</p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => navigate("/contact-us")}
              className="bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Contact Us
            </button>
            <button 
              onClick={() => navigate("/projects")}
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-500 transition"
            >
              View Projects
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
