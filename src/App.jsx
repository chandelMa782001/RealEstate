import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppProvider } from './context/AppContext';
import ScrollToTop from './component/ScrollToTop';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Projects from './pages/Projects';
import PropertyDetail from './pages/PropertyDetail';
import ContactUs from './pages/ContactUs';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <AppProvider>
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
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
    </AppProvider>
  );
};

export default App;
