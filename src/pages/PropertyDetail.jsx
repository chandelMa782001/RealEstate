import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { images } from '../../utils/Image';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const properties = {
    1: {
      title: 'Luxury Villa in Gurgaon',
      location: 'Sector 47, Gurgaon',
      price: '₹2.5 Cr',
      type: 'Villa',
      beds: 4,
      baths: 3,
      area: '3500 sq.ft',
      images: [
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200'
      ],
      description: 'Experience luxury living in this stunning villa located in the heart of Gurgaon. This property features modern architecture, spacious rooms, and premium finishes throughout.',
      features: ['Swimming Pool', 'Garden', 'Parking for 3 cars', 'Modular Kitchen', 'Gym', 'Security System'],
      amenities: ['24/7 Security', 'Power Backup', 'Water Supply', 'Club House', 'Children Play Area'],
      propertyId: 'MG001',
      status: 'Ready to Move',
      facing: 'North',
      furnished: 'Semi-Furnished',
      floor: 'Ground Floor',
      totalFloors: '2',
      age: 'Under Construction',
      parking: '3 Covered',
      builder: {
        name: 'Maigreat Group',
        logo: images.companylogo,
        experience: '10+ Years',
        projects: '50+ Projects',
        description: 'Maigreat Group is a leading real estate developer with over 10 years of experience in delivering quality residential and commercial projects.',
        rating: 4.5,
        established: '2015'
      }
    },
    2: {
      title: 'Modern Apartment',
      location: 'Dwarka, New Delhi',
      price: '₹85 Lac',
      type: 'Apartment',
      beds: 3,
      baths: 2,
      area: '1800 sq.ft',
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200'
      ],
      description: 'Beautiful modern apartment with excellent connectivity and amenities. Perfect for families looking for a comfortable living space in Delhi.',
      features: ['Balcony', 'Modular Kitchen', 'Wooden Flooring', 'Wardrobe', 'False Ceiling'],
      amenities: ['Lift', 'Security', 'Power Backup', 'Park', 'Gym'],
      propertyId: 'MG002',
      status: 'Ready to Move',
      facing: 'East',
      furnished: 'Fully Furnished',
      floor: '5th Floor',
      totalFloors: '12',
      age: '2 Years',
      parking: '1 Covered',
      builder: {
        name: 'Maigreat Group',
        logo: images.companylogo,
        experience: '10+ Years',
        projects: '50+ Projects',
        description: 'Maigreat Group is a leading real estate developer with over 10 years of experience in delivering quality residential and commercial projects.',
        rating: 4.5,
        established: '2015'
      }
    }
  };
  const property = properties[id] || properties[1];
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
      
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-gray-600 hover:text-orange-500 transition bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg"
        >
          <FaChevronLeft className="mr-2" />
          Back to Properties
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
   
          <div className="lg:col-span-2">
         
            <div className="relative mb-6 shadow-lg rounded-lg overflow-hidden">
              <img 
                src={property.images[currentImageIndex]} 
                alt={property.title}
                className="w-full h-96 object-cover"
              />
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition"
              >
                <FaChevronLeft />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition"
              >
                <FaChevronRight />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {property.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

        
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{property.title}</h1>
                  <p className="text-gray-600 flex items-center text-lg">
                    <FaMapMarkerAlt className="mr-2 text-orange-500" />
                    {property.location}
                  </p>
                </div>
                <div className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold">
                  {property.type}
                </div>
              </div>

              <div className="flex items-center space-x-6 mb-6 pb-6 border-b">
                {property.beds && (
                  <div className="flex items-center text-gray-700">
                    <FaBed className="mr-2 text-orange-500 text-xl" />
                    <span className="font-semibold">{property.beds} Bedrooms</span>
                  </div>
                )}
                {property.baths && (
                  <div className="flex items-center text-gray-700">
                    <FaBath className="mr-2 text-orange-500 text-xl" />
                    <span className="font-semibold">{property.baths} Bathrooms</span>
                  </div>
                )}
                <div className="flex items-center text-gray-700">
                  <FaRulerCombined className="mr-2 text-orange-500 text-xl" />
                  <span className="font-semibold">{property.area}</span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{property.description}</p>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">Property Details</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-gray-500 text-sm">Property ID</p>
                  <p className="font-semibold text-gray-800">{property.propertyId}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Status</p>
                  <p className="font-semibold text-gray-800">{property.status}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Facing</p>
                  <p className="font-semibold text-gray-800">{property.facing}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Furnished</p>
                  <p className="font-semibold text-gray-800">{property.furnished}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Floor</p>
                  <p className="font-semibold text-gray-800">{property.floor} of {property.totalFloors}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Parking</p>
                  <p className="font-semibold text-gray-800">{property.parking}</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">Features</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {property.features.map((feature, index) => (
                  <span key={index} className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm">
                    {feature}
                  </span>
                ))}
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">Amenities</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {property.amenities.map((amenity, index) => (
                  <span key={index} className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

          
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Builder Details</h2>
              <div className="flex items-start space-x-6">
                <img 
                  src={property.builder.logo} 
                  alt={property.builder.name}
                  className="w-24 h-24 object-contain rounded-lg border border-gray-200"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{property.builder.name}</h3>
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="font-semibold text-gray-700">{property.builder.rating}</span>
                    </div>
                    <span className="text-gray-500">|</span>
                    <span className="text-gray-600">Established {property.builder.established}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{property.builder.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-orange-50 p-3 rounded-lg">
                      <p className="text-orange-600 font-semibold">{property.builder.experience}</p>
                      <p className="text-gray-600 text-sm">Experience</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-blue-600 font-semibold">{property.builder.projects}</p>
                      <p className="text-gray-600 text-sm">Completed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

   
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h3 className="text-3xl font-bold text-orange-500 mb-6">{property.price}</h3>
              
              <div className="space-y-4 mb-6">
                <a 
                  href="tel:+919354527118"
                  className="flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
                >
                  <FaPhone />
                  <span>Call Now</span>
                </a>
                
                <a 
                  href="https://wa.me/919354527118"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-3 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition"
                >
                  <FaWhatsapp />
                  <span>WhatsApp</span>
                </a>
                
                <a 
                  href="mailto:info@maigreatgroup.com"
                  className="flex items-center justify-center space-x-3 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg transition"
                >
                  <FaEnvelope />
                  <span>Email</span>
                </a>
              </div>
              <div className="border-t pt-6">
                <h4 className="font-bold text-gray-800 mb-4">Schedule a Visit</h4>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
                  >
                    Request Callback
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default PropertyDetail;
