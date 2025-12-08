import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from 'react-icons/fa';
const Projects = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const projects = [
    {
      id: 1,
      title: 'Luxury Villa in Gurgaon',
      location: 'Sector 47, Gurgaon',
      price: '₹2.5 Cr',
      type: 'Villa',
      beds: 4,
      baths: 3,
      area: '3500 sq.ft',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600',
      status: 'Ready to Move'
    },
    {
      id: 2,
      title: 'Modern Apartment',
      location: 'Dwarka, New Delhi',
      price: '₹85 Lac',
      type: 'Apartment',
      beds: 3,
      baths: 2,
      area: '1800 sq.ft',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600',
      status: 'Ready to Move'
    },
    {
      id: 3,
      title: 'Commercial Space',
      location: 'Connaught Place, Delhi',
      price: '₹5 Cr',
      type: 'Commercial',
      beds: null,
      baths: 2,
      area: '2500 sq.ft',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600',
      status: 'Under Construction'
    },
    {
      id: 4,
      title: 'Residential Plot',
      location: 'Kundli, Sonipat',
      price: '₹45 Lac',
      type: 'Plot',
      beds: null,
      baths: null,
      area: '200 sq.yd',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600',
      status: 'Ready to Move'
    },
    {
      id: 5,
      title: 'Premium Penthouse',
      location: 'Vasant Kunj, Delhi',
      price: '₹3.8 Cr',
      type: 'Penthouse',
      beds: 5,
      baths: 4,
      area: '4200 sq.ft',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600',
      status: 'Under Construction'
    },
    {
      id: 6,
      title: 'Studio Apartment',
      location: 'Noida Sector 62',
      price: '₹42 Lac',
      type: 'Apartment',
      beds: 1,
      baths: 1,
      area: '650 sq.ft',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600',
      status: 'Ready to Move'
    },
    {
      id: 7,
      title: 'Office Space',
      location: 'Cyber City, Gurgaon',
      price: '₹8 Cr',
      type: 'Commercial',
      beds: null,
      baths: 3,
      area: '3800 sq.ft',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600',
      status: 'Ready to Move'
    },
    {
      id: 8,
      title: 'Farmhouse Plot',
      location: 'Manesar, Haryana',
      price: '₹1.2 Cr',
      type: 'Plot',
      beds: null,
      baths: null,
      area: '500 sq.yd',
      image: 'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=600',
      status: 'Ready to Move'
    }
  ];

  const filters = ['All', 'Villa', 'Apartment', 'Commercial', 'Plot', 'Penthouse'];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.type === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
   
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Our Projects</h1>
          <p className="text-base sm:text-lg md:text-xl">Explore our premium real estate projects</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 md:py-16">
      
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-10 md:mb-12 justify-center">
          {filters.map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg font-semibold transition text-sm sm:text-base ${
                filter === filterOption
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
              }`}
            >
              {filterOption}
            </button>
          ))}
        </div>

      
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition group cursor-pointer"
              onClick={() => navigate(`/property/${project.id}`)}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-orange-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  {project.type}
                </div>
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-green-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-semibold">
                  {project.status}
                </div>
              </div>
              
              <div className="p-4 sm:p-5">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-orange-500 flex-shrink-0" />
                  <span className="truncate">{project.location}</span>
                </p>
                
                <div className="flex items-center justify-between mb-3 sm:mb-4 text-xs sm:text-sm text-gray-600">
                  {project.beds && (
                    <div className="flex items-center">
                      <FaBed className="mr-1 text-orange-500" />
                      <span>{project.beds}</span>
                    </div>
                  )}
                  {project.baths && (
                    <div className="flex items-center">
                      <FaBath className="mr-1 text-orange-500" />
                      <span>{project.baths}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <FaRulerCombined className="mr-1 text-orange-500" />
                    <span className="text-xs sm:text-sm">{project.area}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t">
                  <span className="text-xl sm:text-2xl font-bold text-orange-500">{project.price}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/property/${project.id}`);
                    }}
                    className="bg-gray-800 hover:bg-gray-900 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredProjects.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <p className="text-gray-600 text-lg sm:text-xl">No projects found in this category.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
export default Projects;
