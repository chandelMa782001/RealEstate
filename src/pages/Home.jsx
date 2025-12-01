import React from 'react';
import Navbar from '../component/Navbar';
import Hero from '../component/Hero';
import WhyChooseUs from '../component/WhyChooseUs';
import FeaturedProperties from '../component/FeaturedProperties';
import ExploreServices from '../component/ExploreServices';
import Services from '../component/Services';
import Footer from '../component/Footer';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedProperties />
      <ExploreServices />
      <Services />
        <WhyChooseUs />
      <Footer />
    </div>
  );
};

export default Home;
