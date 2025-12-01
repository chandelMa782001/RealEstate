import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAppContext } from '../context/AppContext';

const SignupModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const { signup } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    const userData = { 
      name: formData.name, 
      email: formData.email, 
      mobile: formData.mobile 
    };
    signup(userData);
    onClose();
  };
  if (!isOpen) return null;
  return (
    <div className="fixed top-[13%] inset-0 bg-transparent flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 relative">
       
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <FaTimes size={20} />
        </button>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-orange-500 pl-3">
            Sign Up
          </h2>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your Name"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 pr-10"
                required
              />
              <FaUser className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500" />
            </div>

            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your Email"
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 pr-10"
                required
              />
              <FaEnvelope className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500" />
            </div>
            <div className="relative">
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter your Mobile"
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 pr-10"
                required
              />
              <FaPhone className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500" />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 pr-20"
                required
              />
           
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash size={18} className=' text-orange-500' /> : <FaEye size={18} className=' text-orange-500' />}
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 pr-20"
                required
              />
           
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <FaEyeSlash size={18} className=' text-orange-500' /> : <FaEye size={18} className=' text-orange-500' />}
              </button>
            </div>

      
            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="text-sm text-gray-600">Already have an account?</p>
              </div>
              <button 
                type="button"
                onClick={onSwitchToLogin}
                className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
              >
                Login Here
              </button>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded font-semibold transition uppercase"
              >
                SIGN UP
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

export default SignupModal;
