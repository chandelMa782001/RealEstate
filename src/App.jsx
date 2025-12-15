import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider, useAppContext } from './Context/AppContext';
import ProtectedRoute from './component/ProtectedRoute';
import ScrollToTop from './component/ScrollToTop';
import NotificationContainer from './component/NotificationContainer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Projects from './pages/Projects';
import Properties from './pages/Properties';
import Offers from './pages/Offers';
import PropertyDetail from './pages/PropertyDetail';
import ContactUs from './pages/ContactUs';
import Builders from './pages/Builders';
import BuilderDetail from './pages/BuilderDetail';
import PostProperty from './pages/PostProperty';
import Dashboard from './pages/Dashboard';
import Activity from './pages/Activity';
import NotFound from './pages/NotFound';

const AppContent = () => {
  const { notifications, removeNotification } = useAppContext();

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Routes - No Authentication Required */}
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/builders" element={<Builders />} />
        
        {/* Semi-Protected Routes - Login Required for Full Access */}
        <Route 
          path="/projects" 
          element={
            <ProtectedRoute message="Please login to view detailed project information">
              <Projects />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/offers" 
          element={
            <ProtectedRoute message="Please login to view exclusive offers">
              <Offers />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/builder/:id" 
          element={
            <ProtectedRoute message="Please login to view builder details and contact information">
              <BuilderDetail />
            </ProtectedRoute>
          } 
        />
        
        {/* Protected Routes - Authentication Required */}
        <Route 
          path="/property/:id" 
          element={
            <ProtectedRoute message=" Login to view property details">
              <PropertyDetail />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/post-property" 
          element={
            <ProtectedRoute message="Please login to post your property">
              <PostProperty />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute message="Please login to access your dashboard">
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/activity" 
          element={
            <ProtectedRoute message="Please login to view your activity">
              <Activity />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <NotificationContainer 
        notifications={notifications} 
        removeNotification={removeNotification} 
      />
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
