import { useState, useEffect, useRef } from 'react';
import { FaEnvelope, FaLock, FaTimes } from 'react-icons/fa';
import { useAppContext } from '../Context/AppContext';
import { validateEmail, validateRequired, getErrorMessage } from '../../utils/validation';
import gsap from 'gsap';

const LoginModal = ({ isOpen, onClose, onSwitchToSignup }) => {
  const { login, showNotification } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

  
    setTouched({ email: true, password: true });

   
    const emailValid = validateField('email', email);
    const passwordValid = validateField('password', password);

    if (!emailValid || !passwordValid) {
      setIsSubmitting(false);
      showNotification('Enter the Required Field', 'error', 3000);
      return;
    }

    try {
   
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = { email, name: email.split('@')[0] };
      login(userData);
      showNotification('Login successful!', 'success', 3000);
      
  
      setEmail('');
      setPassword('');
      setErrors({});
      setTouched({});
      handleClose();
    } catch (error) {
      showNotification('Login failed. Please try again.', 'error', 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setPassword('');
      setErrors({});
      setTouched({});
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
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={() => handleBlur('password')}
                  placeholder="Enter Password"
                  className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 pr-10 ${
                    touched.password && errors.password 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-orange-500'
                  }`}
                />
                <FaLock className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                  touched.password && errors.password ? 'text-red-500' : 'text-orange-500'
                }`} />
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
