import React from 'react';
import { FaCheckCircle, FaUsers, FaBuilding, FaAward, FaDownload, FaFilePdf } from 'react-icons/fa';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import WhyChooseUs from '../component/WhyChooseUs';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../Context/AppContext';
import jsPDF from 'jspdf';

const AboutUs = () => {
  const navigate = useNavigate();
  const { showNotification } = useAppContext();

  const handleBrochureDownload = () => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = 30;

    // Helper function to add text with word wrapping
    const addText = (text, fontSize = 10, isBold = false, isCenter = false) => {
      pdf.setFontSize(fontSize);
      if (isBold) pdf.setFont(undefined, 'bold');
      else pdf.setFont(undefined, 'normal');
      
      if (isCenter) {
        pdf.text(text, pageWidth / 2, yPosition, { align: 'center' });
      } else {
        const lines = pdf.splitTextToSize(text, pageWidth - 2 * margin);
        pdf.text(lines, margin, yPosition);
        yPosition += lines.length * (fontSize * 0.4);
      }
      yPosition += fontSize * 0.6;
    };

    const addSection = (title, content = []) => {
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = 30;
      }
      addText(title, 14, true);
      yPosition += 5;
      content.forEach(item => {
        addText(item, 10);
      });
      yPosition += 10;
    };

    // Header
    addText('MAIGREAT GROUP', 20, true, true);
    addText('COMPANY PROFILE', 16, true, true);
    yPosition += 15;

    // About Section
    addSection('ABOUT MAIGREAT GROUP', [
      'Maigreat Group in real estate established in the year 2015, with a combined experience of 10+ years and an aim of providing ultra-luxury residences to clients for an abode or future investments.',
      '',
      'We are working on multiple projects with unique conceptual themes and transversal skills of our teammates. Our commitment to excellence and customer satisfaction has made us one of the most trusted names in the real estate industry.'
    ]);

    // Company Statistics
    addSection('COMPANY STATISTICS', [
      'Years of Experience: 10+',
      'Happy Clients: 500+',
      'Projects Completed: 50+',
      'Client Satisfaction: 100%',
      'Established: 2015',
      'Headquarters: Gurgaon, Haryana'
    ]);

    // Mission
    addSection('OUR MISSION', [
      'To provide exceptional real estate solutions that create lasting value for our clients through innovation, integrity, and unwavering commitment to excellence. We aim to make property ownership accessible and rewarding for everyone.'
    ]);

    // Vision
    addSection('OUR VISION', [
      'To be the most trusted and preferred real estate company in India, known for our quality projects, customer-centric approach, and contribution to building sustainable communities that enhance the quality of life.'
    ]);

    // Core Values
    addSection('CORE VALUES', [
      'INTEGRITY: We maintain the highest standards of honesty and transparency in all our dealings.',
      '',
      'CUSTOMER FOCUS: Our clients\' satisfaction and success are at the heart of everything we do.',
      '',
      'QUALITY: We deliver exceptional quality in every project and service we provide.',
      '',
      'EXCELLENCE: We continuously strive for excellence in all aspects of our business.'
    ]);

    // Services
    addSection('SERVICES OFFERED', [
      '• Residential Properties (Villas, Apartments, Plots)',
      '• Commercial Properties (Offices, Retail Spaces)',
      '• Property Investment Consultation',
      '• Real Estate Advisory Services',
      '• Property Management',
      '• Legal Documentation Support',
      '• Home Loan Assistance',
      '• Property Valuation Services'
    ]);

    // Why Choose Us
    addSection('WHY CHOOSE MAIGREAT GROUP?', [
      '✓ 10+ Years of Industry Experience',
      '✓ 500+ Satisfied Customers',
      '✓ 50+ Successfully Completed Projects',
      '✓ 100% Client Satisfaction Rate',
      '✓ Transparent Dealings',
      '✓ Professional Team',
      '✓ End-to-End Services',
      '✓ Post-Sale Support'
    ]);

    // Contact Information
    addSection('CONTACT INFORMATION', [
      'Office Address:',
      'B315 Roman Court, Ansal City Kundli',
      'Sonipat, Haryana 131028, India',
      '',
      'Phone: +91-9354527118',
      'Email: info@maigreatgroup.com',
      'Website: www.maigreatgroup.com'
    ]);

    // Footer
    if (yPosition > 220) {
      pdf.addPage();
      yPosition = 30;
    }
    yPosition += 20;
    addText(`Generated on: ${new Date().toLocaleDateString('en-IN')} at ${new Date().toLocaleTimeString('en-IN')}`, 8, false, true);
    addText('MAIGREAT GROUP', 12, true, true);
    addText('"Fulfil Your Trust To Find Your Dream Property"', 10, false, true);
    addText('Your Trusted Partner in Real Estate Since 2015', 9, false, true);

    // Save the PDF
    pdf.save('Maigreat-Group-Company-Profile.pdf');
    showNotification('Company profile PDF downloaded successfully!', 'success', 3000);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
   
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">About Us</h1>
          <p className="text-base sm:text-lg md:text-xl">Your Trusted Partner in Real Estate</p>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">Who We Are</h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4">
              Maigreat Group in real estate established in the year 2015, with a combined experience of 10+ years and an aim of providing ultra-luxury residences to clients for an abode or future investments.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              We are working on multiple projects in a windswept with unique conceptual theme, transversal skills of our teammates. Our commitment to excellence and customer satisfaction has made us one of the most trusted names in the real estate industry.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              With a focus on quality, transparency, and innovation, we strive to deliver properties that exceed expectations and create lasting value for our clients.
            </p>
            
            {/* Company Brochure Download */}
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 sm:p-6 rounded-lg border border-orange-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-500 p-3 rounded-full">
                    <FaFilePdf className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Company Brochure</h3>
                    <p className="text-sm text-gray-600">Download our detailed company profile and portfolio</p>
                  </div>
                </div>
                <button
                  onClick={handleBrochureDownload}
                  className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition shadow-lg hover:shadow-xl"
                >
                  <FaDownload />
                  <span className="hidden sm:inline">Download</span>
                </button>
              </div>
            </div>
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

      <div className="bg-white py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-8 sm:mb-10 md:mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
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

   
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-500 mb-2">10+</h3>
              <p className="text-sm sm:text-base md:text-xl">Years Experience</p>
            </div>
            <div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-500 mb-2">500+</h3>
              <p className="text-sm sm:text-base md:text-xl">Happy Clients</p>
            </div>
            <div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-500 mb-2">50+</h3>
              <p className="text-sm sm:text-base md:text-xl">Projects Completed</p>
            </div>
            <div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-500 mb-2">100%</h3>
              <p className="text-sm sm:text-base md:text-xl">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </div>

   
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">Our Mission</h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              To provide exceptional real estate solutions that create lasting value for our clients through innovation, integrity, and unwavering commitment to excellence. We aim to make property ownership accessible and rewarding for everyone.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">Our Vision</h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              To be the most trusted and preferred real estate company in India, known for our quality projects, customer-centric approach, and contribution to building sustainable communities that enhance the quality of life.
            </p>
          </div>
        </div>
      </div>

  <WhyChooseUs/>

 
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Ready to Find Your Dream Property?</h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8">Let us help you find the perfect home or investment opportunity.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <button 
              onClick={() => navigate("/contact-us")}
              className="bg-white text-orange-500 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition text-sm sm:text-base"
            >
              Contact Us
            </button>
            <button 
              onClick={() => navigate("/projects")}
              className="bg-transparent border-2 border-white text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-500 transition text-sm sm:text-base"
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
