import { useState, useEffect } from 'react';
import Dealer from './Dealer';
import { useNavigate, useLocation } from 'react-router-dom';
import { validateEmail, validatePhone, validateName, validatePassword, getErrorMessage } from '../../../utils/validation';
import DealerBg from '../../assets/image/Dealer.jpg';
const DealerLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true); 
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentDealer, setCurrentDealer] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    mobile: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); 
  const [resetStep, setResetStep] = useState(1); // 1: email verification, 2: OTP verification, 3: password reset
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [canResendOtp, setCanResendOtp] = useState(true);


  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);

    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  };


  // Timer effect for OTP resend
  useEffect(() => {
    let interval;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    } else if (otpTimer === 0 && !canResendOtp) {
      setCanResendOtp(true);
    }
    return () => clearInterval(interval);
  }, [otpTimer, canResendOtp]);

  useEffect(() => {
   
    if (location.search) {
      navigate('/dealer/login', { replace: true });
    }
    
 
    const storedCurrentDealer = localStorage.getItem('currentDealer');
    const storedDealerToken = localStorage.getItem('dealerToken');
    
    if (storedCurrentDealer && storedDealerToken) {
      const dealer = JSON.parse(storedCurrentDealer);
      setCurrentDealer(dealer);
      setIsAuthenticated(true);
    }
  }, [navigate, location.search]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
   
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isForgotPassword) {
      handleForgotPassword();
      return;
    }
    
    setIsLoading(true);
    
    if (isLogin) {
    
      if (!formData.email || !formData.password) {
        showMessage('Please enter both email and password.', 'error');
        setIsLoading(false);
        return;
      }

    
      if (!validateEmail(formData.email)) {
        showMessage('Please enter a valid email address.', 'error');
        setIsLoading(false);
        return;
      }

      try {
        // Simulate login without API
        const dealerData = {
          email: formData.email.trim().toLowerCase(),
          name: formData.email.split('@')[0]
        };

        localStorage.setItem('dealerToken', 'dealer-token-' + Date.now());
        localStorage.setItem('currentDealer', JSON.stringify(dealerData));
        
        setCurrentDealer(dealerData);
        setIsAuthenticated(true);
        
        showMessage(`Welcome back, ${dealerData.name}!`, 'success');
        
      } catch (error) {
        console.error('❌ Dealer login failed:', error);
        showMessage('Login failed. Please try again.', 'error');
      } finally {
        setIsLoading(false);
      }
    } else {
  
      const errors = {};
      
      if (!formData.name) {
        errors.name = getErrorMessage('name', formData.name);
      } else if (!validateName(formData.name)) {
        errors.name = getErrorMessage('name', formData.name);
      }
      
      if (!formData.email) {
        errors.email = getErrorMessage('email', formData.email);
      } else if (!validateEmail(formData.email)) {
        errors.email = getErrorMessage('email', formData.email);
      }
      
      if (!formData.mobile) {
        errors.mobile = getErrorMessage('mobile', formData.mobile);
      } else if (!validatePhone(formData.mobile)) {
        errors.mobile = getErrorMessage('mobile', formData.mobile);
      }
      
      if (!formData.password) {
        errors.password = getErrorMessage('password', formData.password);
      } else if (!validatePassword(formData.password)) {
        errors.password = getErrorMessage('password', formData.password);
      }
      
    
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        showMessage('Please fix the errors below.', 'error');
        setIsLoading(false);
        return;
      }

      try {
        // Simulate registration without API
        console.log('✅ Dealer registration successful');
        showMessage('Account created successfully! Please login now.', 'success');
        
      
        setFormErrors({});
        
    
        setIsLogin(true);
        setFormData({
          email: formData.email, 
          password: '',
          name: '',
          mobile: '',
          newPassword: '',
          confirmPassword: ''
        });
        
      } catch (error) {
        console.error('❌ Dealer registration failed:', error);
        showMessage('Registration failed. Please try again.', 'error');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleForgotPassword = async () => {
    setIsLoading(true);
    
    try {
      if (resetStep === 1) {
        // Step 1: Send OTP to email
        if (!formData.email) {
          showMessage('Please enter your email address.', 'error');
          setIsLoading(false);
          return;
        }
        
        if (!validateEmail(formData.email)) {
          showMessage('Please enter a valid email address.', 'error');
          setIsLoading(false);
          return;
        }

        // Simulate OTP sending
        console.log('🚀 Sending forgot password request for email:', formData.email);
        showMessage('OTP has been sent to your email address. Please check your inbox.', 'success');
        setResetStep(2);
        setOtpTimer(60);
        setCanResendOtp(false);
        
      } else if (resetStep === 2) {
        // Step 2: Verify OTP
        if (!formData.otp) {
          showMessage('Please enter the OTP sent to your email.', 'error');
          setIsLoading(false);
          return;
        }
        
        if (formData.otp.length !== 6) {
          showMessage('Please enter a valid 6-digit OTP.', 'error');
          setIsLoading(false);
          return;
        }

        // Simulate OTP verification
        console.log('🚀 Verifying OTP for email:', formData.email, 'OTP:', formData.otp);
        showMessage('OTP verified successfully! Please set your new password.', 'success');
        setResetStep(3);
        
      } else if (resetStep === 3) {
        // Step 3: Reset password
        if (!formData.newPassword || !formData.confirmPassword) {
          showMessage('Please fill in both password fields.', 'error');
          setIsLoading(false);
          return;
        }
        
        if (!validatePassword(formData.newPassword)) {
          showMessage('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.', 'error');
          setIsLoading(false);
          return;
        }
        
        if (formData.newPassword !== formData.confirmPassword) {
          showMessage('Passwords do not match.', 'error');
          setIsLoading(false);
          return;
        }
        
        // Simulate password reset
        console.log('🚀 Resetting password for email:', formData.email);
        showMessage('Password reset successfully! Please login with your new password.', 'success');
        
        // Reset to login mode after 2 seconds
        setTimeout(() => {
          setIsForgotPassword(false);
          setIsLogin(true);
          setResetStep(1);
          setFormData({
            email: formData.email,
            password: '',
            name: '',
            mobile: '',
            otp: '',
            newPassword: '',
            confirmPassword: ''
          });
          setOtpTimer(0);
          setCanResendOtp(true);
        }, 2000);
      }
    } catch (error) {
      console.error('❌ Forgot password process failed:', error);
      showMessage('Failed to process request. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResendOtp) return;
    
    setIsLoading(true);
    
    try {
      // Simulate OTP resending
      console.log('🚀 Resending OTP for email:', formData.email);
      showMessage('OTP has been resent to your email address.', 'success');
      setOtpTimer(60);
      setCanResendOtp(false);
      
    } catch (error) {
      console.error('❌ Failed to resend OTP:', error);
      showMessage('Failed to resend OTP. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setIsForgotPassword(false);
    setResetStep(1);
    setFormData({
      email: '',
      password: '',
      name: '',
      mobile: '',
      otp: '',
      newPassword: '',
      confirmPassword: ''
    });
    setFormErrors({});
    setMessage('');
    setShowPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setOtpTimer(0);
    setCanResendOtp(true);
  };

  const handleForgotPasswordClick = () => {
    setIsForgotPassword(true);
    setIsLogin(false);
    setResetStep(1);
    setFormData({
      email: formData.email,
      password: '',
      name: '',
      mobile: '',
      otp: '',
      newPassword: '',
      confirmPassword: ''
    });
    setFormErrors({});
    setMessage('');
    setShowPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setOtpTimer(0);
    setCanResendOtp(true);
  };

  const handleBackToLogin = () => {
    setIsForgotPassword(false);
    setIsLogin(true);
    setResetStep(1);
    setFormData({
      email: '',
      password: '',
      name: '',
      mobile: '',
      otp: '',
      newPassword: '',
      confirmPassword: ''
    });
    setFormErrors({});
    setMessage('');
    setShowPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setOtpTimer(0);
    setCanResendOtp(true);
  };

  if (isAuthenticated && currentDealer) {
    return <Dealer dealerData={currentDealer} />;
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
     
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        style={{
          backgroundImage: `url(${DealerBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>

    
      <div className="relative z-50 w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
         
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-1 h-8 bg-orange-500 rounded-full mr-3"></div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {isForgotPassword ? 
                  (resetStep === 1 ? 'Forgot Password' : 
                   resetStep === 2 ? 'Verify OTP' : 'Reset Password') 
                  : (isLogin ? 'Login' : 'Register')}
              </h2>
            </div>
            <button 
              onClick={() => navigate('/')}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="px-6 py-6">
            {message && (
              <div className={`mb-4 p-3 rounded-lg text-sm ${
                messageType === 'success' 
                  ? 'bg-green-100 text-green-700 border border-green-200' 
                  : messageType === 'info'
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'bg-red-100 text-red-700 border border-red-200'
              }`}>
                {message}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Registration fields */}
              {!isLogin && !isForgotPassword && (
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400 ${
                      formErrors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your Full Name"
                    required={!isLogin && !isForgotPassword}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                  )}
                </div>
              )}

              {/* Email field - shown in all modes */}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400 ${
                    formErrors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={isForgotPassword ? "Enter your registered email" : "Enter your Email"}
                  required
                  disabled={isForgotPassword && (resetStep === 2 || resetStep === 3)}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                )}
              </div>

              {/* OTP field - only for forgot password step 2 */}
              {isForgotPassword && resetStep === 2 && (
                <div className="relative">
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    value={formData.otp}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400 text-center text-lg tracking-widest"
                    placeholder="Enter 6-digit OTP"
                    maxLength="6"
                    required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-0.257-0.257A6 6 0 1118 8zM2 8a8 8 0 1016 0A8 8 0 002 8zm8-3a3 3 0 100 6 3 3 0 000-6z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  
                  {/* Resend OTP section */}
                  <div className="mt-2 text-center">
                    {otpTimer > 0 ? (
                      <p className="text-sm text-gray-600">
                        Resend OTP in {otpTimer} seconds
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={isLoading || !canResendOtp}
                        className="text-sm text-blue-600 hover:text-blue-800 transition duration-200 hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Mobile field - only for registration */}
              {!isLogin && !isForgotPassword && (
                <div className="relative">
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400 ${
                      formErrors.mobile ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter Mobile Number"
                    required={!isLogin && !isForgotPassword}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                  </div>
                  {formErrors.mobile && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.mobile}</p>
                  )}
                </div>
              )}

              {/* Password field - for login and registration */}
              {!isForgotPassword && (
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400 ${
                      formErrors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter Password"
                    required={!isForgotPassword}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-500 hover:text-orange-600 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                  {formErrors.password && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
                  )}
                </div>
              )}

              {/* New password fields - for forgot password step 3 */}
              {isForgotPassword && resetStep === 3 && (
                <>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      id="newPassword"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400"
                      placeholder="Enter New Password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-500 hover:text-orange-600 transition-colors"
                    >
                      {showNewPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400"
                      placeholder="Confirm New Password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-500 hover:text-orange-600 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </>
              )}

              {/* Forgot password link - only show in login mode */}
              {isLogin && !isForgotPassword && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={handleForgotPasswordClick}
                    className="text-sm text-blue-600 hover:text-blue-800 transition duration-200 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              {/* Mode toggle - not shown in forgot password mode */}
              {!isForgotPassword && (
                <div className="text-center py-2">
                  <span className="text-gray-600 text-sm">
                    {isLogin ? "New to Maigreat Group ?" : "Already have an account?"}
                  </span>
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="ml-2 text-blue-600 hover:text-blue-800 font-medium text-sm transition duration-200 hover:underline"
                  >
                    {isLogin ? 'Register For a New Account' : 'Login Here'}
                  </button>
                </div>
              )}

              {/* Back to login link - only show in forgot password mode */}
              {isForgotPassword && (
                <div className="text-center py-2">
                  <button
                    type="button"
                    onClick={handleBackToLogin}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm transition duration-200 hover:underline"
                  >
                    ← Back to Login
                  </button>
                </div>
              )}

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-md uppercase tracking-wide ${
                    isLoading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-orange-500 hover:bg-orange-600 text-white'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {isForgotPassword 
                        ? (resetStep === 1 ? 'SENDING...' : 
                           resetStep === 2 ? 'VERIFYING...' : 'RESETTING...')
                        : (isLogin ? 'LOGGING IN...' : 'REGISTERING...')
                      }
                    </div>
                  ) : (
                    <>
                      {isForgotPassword 
                        ? (resetStep === 1 ? 'SEND OTP' : 
                           resetStep === 2 ? 'VERIFY OTP' : 'RESET PASSWORD')
                        : (isLogin ? 'LOGIN' : 'REGISTER')
                      }
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  disabled={isLoading}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-md uppercase tracking-wide ${
                    isLoading 
                      ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                      : 'bg-gray-500 hover:bg-gray-600 text-white'
                  }`}
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DealerLogin;




