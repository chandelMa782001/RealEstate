import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider, useAppContext } from './Context/AppContext';
import ProtectedRoute from './component/ProtectedRoute';
import ScrollToTop from './component/ScrollToTop';
import NotificationContainer from './component/NotificationContainer';
import LoanButton from './component/LoanButton';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Projects from './pages/Projects';
import PropertyDetail from './pages/PropertyDetail';
import ContactUs from './pages/ContactUs';
import Builders from './pages/Builders';
import BuilderDetail from './pages/BuilderDetail';
import NotFound from './pages/NotFound';

const AppContent = () => {
  const { notifications, removeNotification } = useAppContext();

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/builders" element={<Builders />} />
        <Route path="/builder/:id" element={<BuilderDetail />} />
        <Route 
          path="/property/:id" 
          element={
            <ProtectedRoute>
              <PropertyDetail />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <NotificationContainer 
        notifications={notifications} 
        removeNotification={removeNotification} 
      />
      <LoanButton />
    </>
  );
};

const App = () => {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
};

export default App;
