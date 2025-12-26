import { useState, useEffect } from 'react';
import Dealer from './Dealer';
import { useNavigate } from 'react-router-dom';

const DealerLogin = () => {
  const navigate=useNavigate()
  const [isLogin, setIsLogin] = useState(true); 
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [currentDealer, setCurrentDealer] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    mobile: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); 
  const [resetStep, setResetStep] = useState(1); // 1: email verification, 2: password reset


  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);

    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  };


  useEffect(() => {
    const storedDealers = localStorage.getItem('dealerUsers');
    const storedCurrentDealer = localStorage.getItem('currentDealer');
    
    if (storedDealers) {
      setRegisteredUsers(JSON.parse(storedDealers));
    }
    
    if (storedCurrentDealer) {
      const dealer = JSON.parse(storedCurrentDealer);
      setCurrentDealer(dealer);
      setIsAuthenticated(true);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isForgotPassword) {
      handleForgotPassword();
      return;
    }
    
    if (isLogin) {
      const user = registeredUsers.find(
        user => user.email === formData.email && user.password === formData.password
      );
      if (user) {
        setCurrentDealer(user);
        setIsAuthenticated(true);
        localStorage.setItem('currentDealer', JSON.stringify(user));
        
        showMessage(`Welcome back, ${user.name}!`, 'success');
      } else {
        showMessage('Invalid email or password. Please try again.', 'error');
      }
    } else {
      if (!formData.name || !formData.email || !formData.mobile || !formData.password) {
        showMessage('Please fill in all fields.', 'error');
        return;
      }
      const existingUser = registeredUsers.find(user => user.email === formData.email);
      if (existingUser) {
        showMessage('User already exists with this email. Please login instead.', 'error');
        return;
      }
      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
        createdAt: new Date().toISOString()
      };
      const updatedUsers = [...registeredUsers, newUser];
      setRegisteredUsers(updatedUsers);
      localStorage.setItem('dealerUsers', JSON.stringify(updatedUsers));
      showMessage('Account created successfully! Please login now.', 'success')
      setIsLogin(true);
      setFormData({
        email: formData.email, 
        password: '',
        name: '',
        mobile: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  };

  const handleForgotPassword = () => {
    if (resetStep === 1) {
      // Step 1: Verify email exists
      const user = registeredUsers.find(user => user.email === formData.email);
      if (!user) {
        showMessage('No account found with this email address.', 'error');
        return;
      }
      showMessage('Email verified! Please enter your new password.', 'success');
      setResetStep(2);
    } else {
      // Step 2: Reset password
      if (!formData.newPassword || !formData.confirmPassword) {
        showMessage('Please fill in both password fields.', 'error');
        return;
      }
      
      if (formData.newPassword.length < 6) {
        showMessage('Password must be at least 6 characters long.', 'error');
        return;
      }
      
      if (formData.newPassword !== formData.confirmPassword) {
        showMessage('Passwords do not match.', 'error');
        return;
      }
      
      // Update password in localStorage
      const updatedUsers = registeredUsers.map(user => 
        user.email === formData.email 
          ? { ...user, password: formData.newPassword }
          : user
      );
      
      setRegisteredUsers(updatedUsers);
      localStorage.setItem('dealerUsers', JSON.stringify(updatedUsers));
      
      showMessage('Password reset successfully! Please login with your new password.', 'success');
      
      // Reset to login mode
      setTimeout(() => {
        setIsForgotPassword(false);
        setIsLogin(true);
        setResetStep(1);
        setFormData({
          email: formData.email,
          password: '',
          name: '',
          mobile: '',
          newPassword: '',
          confirmPassword: ''
        });
      }, 2000);
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
      newPassword: '',
      confirmPassword: ''
    });
    setMessage('');
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
      newPassword: '',
      confirmPassword: ''
    });
    setMessage('');
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
      newPassword: '',
      confirmPassword: ''
    });
    setMessage('');
  };

  if (isAuthenticated && currentDealer) {
    return <Dealer dealerData={currentDealer} />;
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
     
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 bg-[url('../src/assets/image/Dealer.jpg')]"></div>

    
      <div className="relative z-50 w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
         
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-1 h-8 bg-orange-500 rounded-full mr-3"></div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {isForgotPassword ? 'Reset Password' : (isLogin ? 'Login' : 'Register')}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400"
                    placeholder="Enter your Full Name"
                    required={!isLogin && !isForgotPassword}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                    </svg>
                  </div>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400"
                  placeholder={isForgotPassword ? "Enter your registered email" : "Enter your Email"}
                  required
                  disabled={isForgotPassword && resetStep === 2}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
              </div>

              {/* Mobile field - only for registration */}
              {!isLogin && !isForgotPassword && (
                <div className="relative">
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400"
                    placeholder="Enter Mobile Number"
                    required={!isLogin && !isForgotPassword}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                  </div>
                </div>
              )}

              {/* Password field - for login and registration */}
              {!isForgotPassword && (
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400"
                    placeholder="Enter Password"
                    required={!isForgotPassword}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </div>
              )}

              {/* New password fields - for forgot password step 2 */}
              {isForgotPassword && resetStep === 2 && (
                <>
                  <div className="relative">
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400"
                      placeholder="Enter New Password"
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400"
                      placeholder="Confirm New Password"
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
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
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-md uppercase tracking-wide"
                >
                  {isForgotPassword 
                    ? (resetStep === 1 ? 'VERIFY EMAIL' : 'RESET PASSWORD')
                    : (isLogin ? 'LOGIN' : 'REGISTER')
                  }
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-md uppercase tracking-wide"
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




