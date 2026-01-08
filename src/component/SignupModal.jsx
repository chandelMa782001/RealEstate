import { useState, useEffect, useRef } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
import { validateForm, getErrorMessage } from '../../utils/validation';
import { authAPI } from '../apiServcies/authApi';
import { handleApiError } from '../../utils/apiUtils';
import gsap from 'gsap';
import toast from 'react-hot-toast';

const SignupModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(
        modalRef.current,
        { scale: 0.8, opacity: 0, y: -50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.5)' }
      );
    }
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(modalRef.current, {
      scale: 0.8,
      opacity: 0,
      y: -50,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: onClose
    });
  };

  const clearForm = () => {
    console.log('🧹 Manually clearing form...');
    setFormData({
      name: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
    setTouched({});
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const validateField = (field, value) => {
    let error = '';
    
    if (field === 'confirmPassword') {
      if (!value) {
        error = 'Please confirm your password';
      } else if (value !== formData.password) {
        error = 'Passwords do not match';
      }
    } else {
      error = getErrorMessage(field, value);
    }
    
    setErrors(prev => ({ ...prev, [field]: error }));
    return !error;
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value
    };
    setFormData(updatedFormData);
    
    // Console log the form data changes
    console.log('🔄 Form Data Updated:', updatedFormData);
    console.log(`📝 Field "${name}" changed to:`, value);

    if (touched[name]) {
      validateField(name, value);
    }
    
    
    if (name === 'password' && touched.confirmPassword) {
      validateField('confirmPassword', formData.confirmPassword);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Console log form data before submission
    console.log('🚀 Submitting Form Data:', formData);

    const allTouched = {
      name: true,
      email: true,
      mobile: true,
      password: true,
      confirmPassword: true
    };
    setTouched(allTouched);


    const validationErrors = validateForm(formData, ['name', 'email', 'mobile', 'password']);
    
   
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      console.log('❌ Validation Errors:', validationErrors);
      setIsSubmitting(false);
      toast.error('Please fill all required fields correctly');
      return;
    }

    try {
    
      const registrationData = {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
        confirmPassword:formData.confirmPassword

      };

      console.log('📤 Sending Registration Data:', registrationData);
   
      const response = await authAPI.register(registrationData);
      console.log('📥 API Response:', response);
     
      // Check if signup was successful (handle different response formats)
      const isSuccess = response.success || response.status === 'success' || response.message?.includes('success');
      
      if (isSuccess) {
        console.log('✅ Signup successful, starting modal transition...');
        
        toast.success(response.message || `Account created successfully! Please login to continue.`);
        
        console.log('🧹 Clearing form data...');
        // Clear form immediately
        clearForm();
        
        console.log('🚪 Closing signup modal and switching to login...');
        // Close current modal and switch to login
        onClose(); // Close signup modal immediately
        
        // Switch to login modal after a short delay
        setTimeout(() => {
          console.log('🔄 Opening login modal...');
          onSwitchToLogin();
        }, 100);
      } else {
        console.log('❌ Signup failed - no success flag in response');
        toast.error(response.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.log('💥 Signup Error:', error);
      const errorResponse = handleApiError(error);
      toast.error(errorResponse.message || 'Signup failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      console.log('🔄 Modal closed - Resetting form data');
      clearForm();
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div ref={overlayRef} className="fixed inset-0 bg-transparent flex items-center justify-center z-[60]">
      <div ref={modalRef} className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 relative">
       
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <FaTimes size={20} />
        </button>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-orange-500 pl-3">
            Sign Up
          </h2>
          <form onSubmit={handleSignup} className="space-y-4" noValidate>
            <div>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={() => handleBlur('name')}
                  placeholder="Enter your Name"
                  className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 pr-10 ${
                    touched.name && errors.name 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-orange-500'
                  }`}
                />
                <FaUser className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                  touched.name && errors.name ? 'text-red-500' : 'text-orange-500'
                }`} />
              </div>
              {touched.name && errors.name && (
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur('email')}
                  placeholder="Enter your Email"
                  className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 pr-10 ${
                    touched.email && errors.email 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-orange-500'
                  }`}
                />
                <FaEnvelope className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                  touched.email && errors.email ? 'text-red-500' : 'text-orange-500'
                }`} />
              </div>
              {touched.email && errors.email && (
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  onBlur={() => handleBlur('mobile')}
                  placeholder="Enter your Mobile (10 digits)"
                  className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 pr-10 ${
                    touched.mobile && errors.mobile 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-orange-500'
                  }`}
                  maxLength="10"
                />
                <FaPhone className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                  touched.mobile && errors.mobile ? 'text-red-500' : 'text-orange-500'
                }`} />
              </div>
              {touched.mobile && errors.mobile && (
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.mobile}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={() => handleBlur('password')}
                  placeholder="Enter Password"
                  className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 pr-20 ${
                    touched.password && errors.password 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-orange-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash size={18} className='text-orange-500' /> : <FaEye size={18} className='text-orange-500' />}
                </button>
              </div>
              {touched.password && errors.password && (
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>
              )}
            </div>
            <div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={() => handleBlur('confirmPassword')}
                  placeholder="Confirm Password"
                  className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 pr-20 ${
                    touched.confirmPassword && errors.confirmPassword 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-orange-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <FaEyeSlash size={18} className='text-orange-500' /> : <FaEye size={18} className='text-orange-500' />}
                </button>
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.confirmPassword}</p>
              )}
            </div>

      
            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="text-sm text-gray-600">Already have an account?</p>
              </div>
              <button 
                type="button"
                onClick={onSwitchToLogin}
                className="text-sm text-blue-600 cursor-pointer hover:text-blue-700 font-semibold"
              >
                Login Here
              </button>
            </div>
            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded font-semibold transition uppercase ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'SIGNING UP...' : 'SIGN UP'}
              </button>
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className={`flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded font-semibold transition uppercase ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
