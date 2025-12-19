import { useState, useEffect } from 'react';
import Dealer from './Dealer';

const DealerLogin = () => {
  const [isLogin, setIsLogin] = useState(false); // Start with signup
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [currentDealer, setCurrentDealer] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    mobile: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); 


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
      // Signup Logic
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
      
      showMessage('Account created successfully! Please login now.', 'success');
      
  
      setIsLogin(true);
      setFormData({
        email: formData.email, 
        password: '',
        name: '',
        mobile: ''
      });
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      name: '',
      mobile: ''
    });
    setMessage('');
  };

  if (isAuthenticated && currentDealer) {
    return <Dealer dealerData={currentDealer} />;
  }
  return (
    <div className="min-h-screen relative overflow-hidden">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
   
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80')`
        }}
      >
        
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70"></div>
        
   
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/30 via-blue-900/20 to-purple-900/30"></div>

        <div className="absolute top-20 left-16 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center animate-float border border-white/20">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
        </div>
        <div className="absolute top-32 right-20 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center animate-bounce delay-300 border border-white/20">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <div className="absolute bottom-32 left-12 w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center animate-pulse delay-700 border border-white/20">
          <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm6 16H8a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h2v1a1 1 0 0 0 2 0V9h2v12a1 1 0 0 1-1 1z"/>
          </svg>
        </div>
        <div className="absolute bottom-20 right-16 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center animate-bounce delay-1000 border border-white/20">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>
        
      
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
     
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
     
            <div className="relative bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 px-6 py-4">
             
              <div className="flex justify-center mb-2">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                  </svg>
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-white text-center mb-1">
                {isLogin ? 'Welcome Back' : 'Join Our Network'}
              </h2>
              <p className="text-white/90 text-center text-xs">
                {isLogin 
                  ? 'Access your dealer dashboard' 
                  : 'Become a trusted dealer partner'
                }
              </p>
            </div>

      
            <div className="px-6 py-4">
            
              {message && (
                <div className={`mb-3 p-2 rounded-lg text-sm text-center ${
                  messageType === 'success' 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-red-100 text-red-700 border border-red-200'
                }`}>
                  {message}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-3">
              
                {!isLogin && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <svg className="w-3 h-3 mr-1 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                      </svg>
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 outline-none text-sm"
                      placeholder="Enter your name"
                      required={!isLogin}
                    />
                  </div>
                )}

              
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <svg className="w-3 h-3 mr-1 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-sm"
                    placeholder="Enter Email address"
                    required
                  />
                </div>

             
                {!isLogin && (
                  <div>
                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <svg className="w-3 h-3 mr-1 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                      </svg>
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 outline-none text-sm"
                      placeholder="Enter Mobile number"
                      required={!isLogin}
                    />
                  </div>
                )}
              
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <svg className="w-3 h-3 mr-1 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                    </svg>
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 outline-none text-sm"
                    placeholder="Enter Your Password"
                    required
                  />
                </div>

             
                {isLogin && (
                  <div className="text-right">
                    <button
                      type="button"
                      className="text-xs text-emerald-600 hover:text-emerald-800 transition duration-200 hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 text-white py-2.5 px-4 rounded-lg font-medium hover:from-emerald-700 hover:via-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.01] shadow-md"
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                </button>
              </form>

        
              <div className="mt-4 text-center">
                <p className="text-gray-600 text-xs">
                  {isLogin ? "New to our platform?" : "Already have an account?"}
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="ml-1 text-emerald-600 hover:text-emerald-800 font-medium transition duration-200 hover:underline"
                  >
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealerLogin;
