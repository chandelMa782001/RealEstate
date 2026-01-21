import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './Context/AppContext';
import ProtectedRoute from './component/ProtectedRoute';
import ScrollToTop from './component/ScrollToTop';
import { Toaster } from 'react-hot-toast';
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
import RecentlyViewed from './pages/RecentlyViewed';
import Shortlisted from './pages/Shortlisted';
import ContactedProperty from './pages/ContactedProperty';
import NotFound from './pages/NotFound';
import PropertyEvalution from './component/PropertyEvalution/PropertyEvalution';
import DealerLogin from './component/Dealer/DealerLogin';
import LoginModal from './component/LoginModal';
import LoginTest from './components/LoginTest';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import PostPurchaseServices from './component/PostPurchaseServices';
import PropertyApiTest from './components/PropertyApiTest';

const AppContent = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login-test" element={<LoginTest />} />
        <Route path="/property-api-test" element={<PropertyApiTest />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/builders" element={<Builders />} />
        <Route path='/dealer/login' element={<DealerLogin/>}/>
        <Route path='/login' element={<LoginModal/>} />
        <Route path='/blogs' element={<Blogs/>}/>
        <Route path='/blog/:id' element={<BlogDetail/>}/>
        <Route path='/post-purchase-services' element={<PostPurchaseServices/>}/>
        
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
          path='/property/estimate' 
          element={
            <ProtectedRoute message="Please login to access property valuation">
              <PropertyEvalution/>
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
        <Route 
          path="/recently-viewed" 
          element={
            <ProtectedRoute message="Please login to view your recently viewed properties">
              <RecentlyViewed />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/shortlisted" 
          element={
            <ProtectedRoute message="Please login to view your shortlisted properties">
              <Shortlisted />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/contacted-property" 
          element={
            <ProtectedRoute message="Please login to view your contacted properties">
              <ContactedProperty />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#333',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
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
