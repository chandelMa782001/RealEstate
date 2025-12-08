import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { images } from '../../utils/Image';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp, FaChevronLeft, FaChevronRight, FaShare, FaFacebook, FaTwitter, FaLinkedin, FaCopy } from 'react-icons/fa';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import gsap from 'gsap';
import { useAppContext } from '../Context/AppContext';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showNotification } = useAppContext();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const contentRef = useRef(null);
  const sidebarRef = useRef(null);
  const shareMenuRef = useRef(null);

  useEffect(() => {
    // Animate page content on mount
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

  useEffect(() => {
    if (showShareMenu && shareMenuRef.current) {
      gsap.fromTo(
        shareMenuRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
      );
    }
  }, [showShareMenu]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target) && 
          !event.target.closest('button[class*="Share Property"]')) {
        setShowShareMenu(false);
      }
    };

    if (showShareMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showShareMenu]);
  const properties = {
    1: {
      title: 'Luxury Villa in Gurgaon',
      location: 'Sector 47, Gurgaon',
      coordinates: { lat: 28.4211, lng: 77.0797 }, // Sector 47, Gurgaon coordinates
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
        id: 1,
        name: 'Raghav Kumar',
        logo: images.companylogo,
        experience: '10+ Years',
        projects: '50+ Projects',
        description: 'Experienced real estate dealer with over 10 years of expertise in delivering quality residential and commercial projects.',
        rating: 4.5,
        established: '2015'
      }
    },
    2: {
      title: 'Modern Apartment',
      location: 'Dwarka, New Delhi',
      coordinates: { lat: 28.5921, lng: 77.0460 }, // Dwarka, Delhi coordinates
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
        id: 1,
        name: 'Raghav Kumar',
        logo: images.companylogo,
        experience: '10+ Years',
        projects: '50+ Projects',
        description: 'Experienced real estate dealer with over 10 years of expertise in delivering quality residential and commercial projects.',
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

  const getShareUrl = () => {
    return window.location.href;
  };

  const handleShare = (platform) => {
    const url = getShareUrl();
    const text = `Check out this amazing property: ${property.title} - ${property.price}`;
    
    let shareUrl = '';
    
    switch(platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(property.title)}&body=${encodeURIComponent(text + '\n\n' + url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        showNotification('Link copied to clipboard!', 'success', 2000);
        setShowShareMenu(false);
        return;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank');
    setShowShareMenu(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 page-transition">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8 slide-in-right">
      
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-orange-500 transition bg-white px-3 sm:px-4 py-2 rounded-lg shadow-md hover:shadow-lg text-sm sm:text-base"
          >
            <FaChevronLeft className="mr-2" />
            Back to Properties
          </button>

          <div className="relative w-full sm:w-auto">
            <button 
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="flex items-center justify-center w-full sm:w-auto text-white bg-orange-500 hover:bg-orange-600 px-3 sm:px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition text-sm sm:text-base"
            >
              <FaShare className="mr-2" />
              Share Property
            </button>

            {showShareMenu && (
              <div 
                ref={shareMenuRef}
                className="absolute right-0 mt-2 bg-white rounded-lg shadow-xl p-4 z-50 min-w-[200px]"
              >
                <div className="space-y-2">
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-green-50 rounded-lg transition text-left"
                  >
                    <FaWhatsapp className="text-green-500 text-xl" />
                    <span className="text-gray-700">WhatsApp</span>
                  </button>
                  
                  <button
                    onClick={() => handleShare('facebook')}
                    className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-blue-50 rounded-lg transition text-left"
                  >
                    <FaFacebook className="text-blue-600 text-xl" />
                    <span className="text-gray-700">Facebook</span>
                  </button>
                  
                  <button
                    onClick={() => handleShare('twitter')}
                    className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-blue-50 rounded-lg transition text-left"
                  >
                    <FaTwitter className="text-blue-400 text-xl" />
                    <span className="text-gray-700">Twitter</span>
                  </button>
                  
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-blue-50 rounded-lg transition text-left"
                  >
                    <FaLinkedin className="text-blue-700 text-xl" />
                    <span className="text-gray-700">LinkedIn</span>
                  </button>
                  
                  <button
                    onClick={() => handleShare('email')}
                    className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 rounded-lg transition text-left"
                  >
                    <FaEnvelope className="text-gray-600 text-xl" />
                    <span className="text-gray-700">Email</span>
                  </button>
                  
                  <div className="border-t pt-2">
                    <button
                      onClick={() => handleShare('copy')}
                      className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-orange-50 rounded-lg transition text-left"
                    >
                      <FaCopy className="text-orange-500 text-xl" />
                      <span className="text-gray-700">Copy Link</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
   
          <div ref={contentRef} className="lg:col-span-2">
         
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
              <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-4">
                <div className="flex-1 w-full">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{property.title}</h1>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                    <p className="text-gray-600 flex items-center text-base sm:text-lg">
                      <FaMapMarkerAlt className="mr-2 text-orange-500 flex-shrink-0" />
                      <span className="break-words">{property.location}</span>
                    </p>
                    <button
                      onClick={() => {
                        setUserLocation(property.coordinates);
                        setShowMap(true);
                        showNotification(`Showing ${property.location} on map`, 'success', 3000);
                      }}
                      className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition whitespace-nowrap"
                    >
                      <FaMapMarkerAlt />
                      <span>My Location</span>
                    </button>
                  </div>
                </div>
                <div className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold text-sm sm:text-base whitespace-nowrap">
                  {property.type}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-6 pb-6 border-b">
                {property.beds && (
                  <div className="flex items-center text-gray-700">
                    <FaBed className="mr-2 text-orange-500 text-lg sm:text-xl" />
                    <span className="font-semibold text-sm sm:text-base">{property.beds} Bedrooms</span>
                  </div>
                )}
                {property.baths && (
                  <div className="flex items-center text-gray-700">
                    <FaBath className="mr-2 text-orange-500 text-lg sm:text-xl" />
                    <span className="font-semibold text-sm sm:text-base">{property.baths} Bathrooms</span>
                  </div>
                )}
                <div className="flex items-center text-gray-700">
                  <FaRulerCombined className="mr-2 text-orange-500 text-lg sm:text-xl" />
                  <span className="font-semibold text-sm sm:text-base">{property.area}</span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{property.description}</p>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Property Details</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
                <div>
                  <p className="text-gray-500 text-xs sm:text-sm">Property ID</p>
                  <p className="font-semibold text-gray-800 text-sm sm:text-base">{property.propertyId}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs sm:text-sm">Status</p>
                  <p className="font-semibold text-gray-800 text-sm sm:text-base">{property.status}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs sm:text-sm">Facing</p>
                  <p className="font-semibold text-gray-800 text-sm sm:text-base">{property.facing}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs sm:text-sm">Furnished</p>
                  <p className="font-semibold text-gray-800 text-sm sm:text-base">{property.furnished}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs sm:text-sm">Floor</p>
                  <p className="font-semibold text-gray-800 text-sm sm:text-base">{property.floor} of {property.totalFloors}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs sm:text-sm">Parking</p>
                  <p className="font-semibold text-gray-800 text-sm sm:text-base">{property.parking}</p>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Features</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {property.features.map((feature, index) => (
                  <span key={index} className="bg-orange-100 text-orange-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">
                    {feature}
                  </span>
                ))}
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Amenities</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {property.amenities.map((amenity, index) => (
                  <span key={index} className="bg-blue-100 text-blue-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">
                    {amenity}
                  </span>
                ))}
              </div>

              {/* Location Map */}
              {showMap && userLocation && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Property Location</h2>
                    <button
                      onClick={() => setShowMap(false)}
                      className="text-gray-500 hover:text-gray-700 text-xs sm:text-sm font-semibold"
                    >
                      Hide Map
                    </button>
                  </div>
                  <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                    <iframe
                      title="Property Location Map"
                      width="100%"
                      height="350"
                      frameBorder="0"
                      style={{ border: 0 }}
                      src={`https://www.google.com/maps?q=${userLocation.lat},${userLocation.lng}&output=embed&z=16`}
                      allowFullScreen
                      className="sm:h-[450px]"
                    />
                    <div className="bg-white p-3 sm:p-4 border-t">
                      <div className="flex items-center gap-2 mb-3">
                        <FaMapMarkerAlt className="text-orange-500 text-lg sm:text-xl flex-shrink-0" />
                        <p className="text-sm sm:text-base font-semibold text-gray-800 break-words">
                          {property.location}
                        </p>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-4">
                        <strong>Coordinates:</strong> {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <a
                          href={`https://www.google.com/maps?q=${userLocation.lat},${userLocation.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 text-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-semibold transition"
                        >
                          Open in Google Maps
                        </a>
                        <button
                          onClick={() => {
                            if (navigator.geolocation) {
                              navigator.geolocation.getCurrentPosition(
                                (position) => {
                                  const userLat = position.coords.latitude;
                                  const userLng = position.coords.longitude;
                                  window.open(
                                    `https://www.google.com/maps/dir/${userLat},${userLng}/${userLocation.lat},${userLocation.lng}`,
                                    '_blank'
                                  );
                                },
                                () => {
                                  showNotification('Please enable location services to get directions', 'error', 3000);
                                }
                              );
                            }
                          }}
                          className="flex-1 text-center bg-green-500 hover:bg-green-600 text-white py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-semibold transition"
                        >
                          Get Directions
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

          
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Builder Details</h2>
                <button
                  onClick={() => navigate(`/builder/${property.builder.id}`)}
                  className="text-orange-500 hover:text-orange-600 font-semibold text-xs sm:text-sm flex items-center space-x-1 transition"
                >
                  <span>View Full Profile</span>
                  <span>→</span>
                </button>
              </div>
              <div 
                className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 cursor-pointer hover:bg-gray-50 p-3 sm:p-4 rounded-lg transition"
                onClick={() => navigate(`/builder/${property.builder.id}`)}
              >
                <img 
                  src={property.builder.logo} 
                  alt={property.builder.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-lg border border-gray-200 mx-auto sm:mx-0"
                />
                <div className="flex-1 w-full pl-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 hover:text-orange-500 transition">
                    {property.builder.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 text-sm">
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="font-semibold text-gray-700">{property.builder.rating}</span>
                    </div>
                    <span className="text-gray-500">|</span>
                    <span className="text-gray-600 text-xs sm:text-sm">Established {property.builder.established}</span>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">{property.builder.description}</p>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-orange-50 p-2 sm:p-3 rounded-lg">
                      <p className="text-orange-600 font-semibold text-sm sm:text-base">{property.builder.experience}</p>
                      <p className="text-gray-600 text-xs sm:text-sm">Experience</p>
                    </div>
                    <div className="bg-blue-50 p-2 sm:p-3 rounded-lg">
                      <p className="text-blue-600 font-semibold text-sm sm:text-base">{property.builder.projects}</p>
                      <p className="text-gray-600 text-xs sm:text-sm">Completed</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="text-xs sm:text-sm text-gray-500 text-center">
                  Click to view complete builder profile and all projects
                </p>
              </div>
            </div>
          </div>

   
          <div ref={sidebarRef} className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:sticky lg:top-24">
              <h3 className="text-2xl sm:text-3xl font-bold text-orange-500 mb-4 sm:mb-6">{property.price}</h3>
              
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <a 
                  href="tel:+919354527118"
                  className="flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-3 rounded-lg transition text-sm sm:text-base"
                >
                  <FaPhone />
                  <span>Call Now</span>
                </a>
                
                <a 
                  href="https://wa.me/919354527118"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-3 bg-green-600 hover:bg-green-700 text-white py-2.5 sm:py-3 rounded-lg transition text-sm sm:text-base"
                >
                  <FaWhatsapp />
                  <span>WhatsApp</span>
                </a>
                
                <a 
                  href="mailto:info@maigreatgroup.com"
                  className="flex items-center justify-center space-x-3 bg-gray-600 hover:bg-gray-700 text-white py-2.5 sm:py-3 rounded-lg transition text-sm sm:text-base"
                >
                  <FaEnvelope />
                  <span>Email</span>
                </a>
              </div>
              <div className="border-t pt-4 sm:pt-6">
                <h4 className="font-bold text-gray-800 mb-3 sm:mb-4 text-base sm:text-lg">Schedule a Visit</h4>
                <form className="space-y-3 sm:space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
                  />
                  <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 sm:py-3 rounded-lg font-semibold transition text-sm sm:text-base"
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
