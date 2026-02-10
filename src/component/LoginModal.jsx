import { useState, useEffect, useRef } from 'react';
import { FaEnvelope, FaLock, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAppContext } from '../Context/AppContext';
import { getErrorMessage } from '../../utils/validation';
import gsap from 'gsap';
import toast from 'react-hot-toast';

const LoginModal = ({ isOpen, onClose, onSwitchToSignup }) => {
  const { login } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      console.log('🔓 Login modal opening...');
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

  const validateField = (field, value) => {
    const error = getErrorMessage(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
    return !error;
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    if (field === 'email') {
      validateField('email', email);
    } else if (field === 'password') {
      validateField('password', password);
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (touched.email) {
      validateField('email', value);
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (touched.password) {
      validateField('password', value);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    
    setTouched({ email: true, password: true });

    const emailValid = validateField('email', email);
    const passwordValid = validateField('password', password);

    if (!emailValid || !passwordValid) {
      setIsSubmitting(false);
      toast.error('Please fill all required fields correctly');
      return;
    }

    try {
      // Simulate login without API
      const userData = {
        email: email,
        name: email.split('@')[0]
      };

      // Store token and user data in localStorage
      localStorage.setItem('token', 'dummy-token-' + Date.now());
      localStorage.setItem('user', JSON.stringify(userData));
      
      login(userData); // Update context
      
      toast.success('Login successful!');
      
      // Reset form
      setEmail('');
      setPassword('');
      setErrors({});
      setTouched({});
      handleClose();
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      console.log('🧹 Login modal closed - clearing fields...');
      setEmail('');
      setPassword('');
      setErrors({});
      setTouched({});
      setIsSubmitting(false);
    } else {
      console.log('🔓 Login modal opened - fields should be empty');
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
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-orange-500 pl-3">
            Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-5" noValidate>
        
            <div>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
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
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
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
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 text-orange-500 -translate-y-1/2 text-gray-500  hover:text-gray-700 transition"
                >
                  {showPassword ? <FaEyeSlash  size={16} /> : <FaEye size={16} />}
                </button>
              </div>
              {touched.password && errors.password && (
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>
              )}
            </div>
            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="text-sm text-gray-600">New to Maigreat Group ?</p>
              </div>
              <button 
                type="button"
                onClick={onSwitchToSignup}
                className="text-sm text-blue-600 cursor-pointer hover:text-blue-700 font-semibold"
              >
                Register For a New Account
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
                {isSubmitting ? 'LOGGING IN...' : 'LOGIN'}
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
export default LoginModal;
