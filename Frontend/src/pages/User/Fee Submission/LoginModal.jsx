import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const LoginModal = ({ onClose, onSwitchToSignup }) => {
  const modalRef = useRef(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    // Modal animation
    gsap.fromTo(modalRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
    );
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
    console.log('Login Data:', formData);
    // Here you would typically authenticate with backend
    alert('Login successful!');
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      gsap.to(modalRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        onComplete: onClose
      });
    }
  };

  const handleSwitchToSignup = () => {
    gsap.to(modalRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        onClose();
        setTimeout(() => {
          onSwitchToSignup();
        }, 100);
      }
    });
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-indigo-900">Student Login</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          <p className="text-gray-600 mt-1">Access your fee portal account</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Login Information Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-l-4 border-indigo-500 pl-3">
              🔐 Login Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="student@college.edu.pk"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Options Section */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <button 
              type="button" 
              className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 transition-all duration-200 transform hover:scale-105"
          >
            Sign In to Account
          </button>

          {/* Switch to Signup */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button 
                type="button" 
                onClick={handleSwitchToSignup}
                className="text-indigo-600 hover:text-indigo-500 font-semibold underline"
              >
                Sign up here
              </button>
            </p>
          </div>

          {/* Quick Demo Info */}
      
        </form>
      </div>
    </div>
  );
};

export default LoginModal;