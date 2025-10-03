import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import SignupModal from './SignupModal';
import LoginModal from './LoginModal';

const FeeSubmission = () => {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const headerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  // GSAP Animations
  useEffect(() => {
    const tl = gsap.timeline();

    // Header animation
    tl.fromTo(headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Left side animation
    tl.fromTo(leftRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );

    // Right side animation
    tl.fromTo(rightRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    );
  }, []);

  const handleLogin = () => {
    gsap.to(".login-btn", {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        setShowLoginModal(true);
      }
    });
  };

  const handleSignup = () => {
    gsap.to(".signup-btn", {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        setShowSignupModal(true);
      }
    });
  };

  const closeModals = () => {
    setShowSignupModal(false);
    setShowLoginModal(false);
  };

  const switchToSignup = () => {
    setShowLoginModal(false);
    setTimeout(() => {
      setShowSignupModal(true);
    }, 100);
  };

  const switchToLogin = () => {
    setShowSignupModal(false);
    setTimeout(() => {
      setShowLoginModal(true);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 md:px-8">
      
      {/* Header Section - Left Aligned */}
      <div ref={headerRef} className="mb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">💳</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-indigo-900">
                Fee Submission Portal
              </h1>
              <p className="text-lg text-gray-600">
                Secure online fee system for Government Zamindar College, Gujrat
              </p>
            </div>
          </div>
          <div className="w-48 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mt-3 rounded-full"></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* Left Side - Information */}
          <div ref={leftRef} className="space-y-6">
            {/* Main Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">💰</span>
                </div>
                <h2 className="text-xl font-bold text-indigo-900 mb-2">
                  Online Fee Payment
                </h2>
                <p className="text-gray-600 text-sm">
                  Submit fees conveniently from anywhere with our secure platform
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { icon: "🔒", title: "Secure" },
                  { icon: "⏱️", title: "24/7" },
                  { icon: "🧾", title: "Receipts" }
                ].map((feature, index) => (
                  <div key={index} className="text-center p-2 bg-indigo-50 rounded-lg">
                    <div className="text-lg mb-1">{feature.icon}</div>
                    <div className="text-xs font-medium text-indigo-900">{feature.title}</div>
                  </div>
                ))}
              </div>

              {/* Fee Schedule */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-indigo-900 mb-2 text-sm">📅 Fee Schedule</h3>
                <ul className="text-gray-600 text-xs space-y-1">
                  <li>• Regular: 1st-10th monthly</li>
                  <li>• Late: 11th-20th (with penalty)</li>
                  <li>• Exam fee: As per schedule</li>
                </ul>
              </div>
            </div>

            {/* Instructions Card */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="font-bold text-indigo-900 mb-2 text-sm">💡 Instructions</h3>
              <ul className="text-gray-600 text-xs space-y-1">
                <li>• Keep student ID ready</li>
                <li>• Save transaction receipts</li>
                <li>• Contact accounts office for help</li>
                <li>• Verify payment status online</li>
              </ul>
            </div>
          </div>

          {/* Right Side - Authentication */}
          <div ref={rightRef} className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">🔑</span>
              </div>
              <h2 className="text-xl font-bold text-indigo-900 mb-1">
                Access Your Account
              </h2>
              <p className="text-gray-600 text-sm">
                Login or signup to manage your fee payments
              </p>
            </div>

            {/* Authentication Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleLogin}
                className="login-btn w-full bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 transition-all duration-300 flex items-center justify-center"
              >
                <span className="mr-2">🎓</span>
                Student Login
              </button>
              
              <button
                onClick={handleSignup}
                className="signup-btn w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-all duration-300 flex items-center justify-center"
              >
                <span className="mr-2">👤</span>
                New Student Signup
              </button>
            </div>

            {/* Quick Info */}
            <div className="mt-6 p-3 bg-indigo-50 rounded-lg">
              <div className="flex items-center justify-between text-xs">
                <span className="text-indigo-700 font-medium">Support:</span>
                <span className="text-gray-600">(053) 123-4567</span>
              </div>
              <div className="flex items-center justify-between text-xs mt-1">
                <span className="text-indigo-700 font-medium">Email:</span>
                <span className="text-gray-600">accounts@college.edu.pk</span>
              </div>
            </div>

            {/* Status Indicator */}
            <div className="mt-4 flex items-center justify-end">
              <div className="flex items-center bg-green-50 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-green-700 text-xs font-medium">System Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Contact Card */}
        <div className="mt-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-lg p-4 text-white text-center">
          <p className="text-sm">
            Need assistance? Contact Accounts Office during college hours
          </p>
        </div>
      </div>

      {/* Modals */}
      {showSignupModal && (
        <SignupModal 
          onClose={closeModals} 
          onSwitchToLogin={switchToLogin}
        />
      )}
      
      {showLoginModal && (
        <LoginModal 
          onClose={closeModals} 
          onSwitchToSignup={switchToSignup}
        />
      )}
    </div>
  );
};

export default FeeSubmission;