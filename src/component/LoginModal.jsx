import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaTimes } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';

const LoginModal = ({ isOpen, onClose, onSwitchToSignup }) => {
  const { login } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const userData = { email, name: email.split('@')[0] };
    login(userData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center z-[60]">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <FaTimes size={20} />
        </button>

        <div className="p-8">
    
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-orange-500 pl-3">
            Login
          </h2>

        
          <form onSubmit={handleLogin} className="space-y-5">
        
            <div className="relative">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email / Mobile"
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 pr-10"
                required
              />
              <FaEnvelope className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500" />
            </div>

        
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 pr-10"
                required
              />
              <FaLock className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500" />
            </div>

         
            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="text-sm text-gray-600">New to Maigreat Group ?</p>
              </div>
              <button 
                type="button"
                onClick={onSwitchToSignup}
                className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
              >
                Register For a New Account
              </button>
            </div>

       
            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded font-semibold transition uppercase"
              >
                LOGIN
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded font-semibold transition uppercase"
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
