import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './component/ScrollToTop';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Projects from './pages/Projects';
import PropertyDetail from './pages/PropertyDetail';
import ContactUs from './pages/ContactUs';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
