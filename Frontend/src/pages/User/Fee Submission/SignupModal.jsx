import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const SignupModal = ({ onClose }) => {
  const modalRef = useRef(null);
  const [formData, setFormData] = useState({
    // Basic Info
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
    cnic: '',
    
    // Academic Info
    studentId: '',
    program: '',
    department: '',
    batch: '',
    semester: '',
    
    // Optional
    profilePicture: null,
    address: ''
  });

  const programs = ['Intermediate', 'BS', 'MSc', 'MA', 'BCom'];
  const departments = ['Computer Science', 'Physics', 'Chemistry', 'Mathematics', 'English', 'Urdu', 'Islamic Studies'];
  const batches = ['2020-2024', '2021-2025', '2022-2026', '2023-2027'];

  useEffect(() => {
    // Generate random student ID
    const randomId = 'ZMC' + Math.floor(1000 + Math.random() * 9000);
    setFormData(prev => ({ ...prev, studentId: randomId }));

    // Modal animation
    gsap.fromTo(modalRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
    );
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup Data:', formData);
    // Here you would typically send data to your backend
    alert('Signup successful! Student ID: ' + formData.studentId);
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

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-indigo-900">Student Registration</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-l-4 border-indigo-500 pl-3">
             Basic Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">CNIC / B-Form Number *</label>
                <input
                  type="text"
                  name="cnic"
                  required
                  placeholder="XXXXX-XXXXXXX-X"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.cnic}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Academic Information Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-l-4 border-blue-500 pl-3">
              Academic Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                <input
                  type="text"
                  name="studentId"
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                  value={formData.studentId}
                />
                <p className="text-xs text-gray-500 mt-1">Auto-generated</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Program *</label>
                <select
                  name="program"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.program}
                  onChange={handleInputChange}
                >
                  <option value="">Select Program</option>
                  {programs.map(program => (
                    <option key={program} value={program}>{program}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                <select
                  name="department"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.department}
                  onChange={handleInputChange}
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Batch/Session *</label>
                <select
                  name="batch"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.batch}
                  onChange={handleInputChange}
                >
                  <option value="">Select Batch</option>
                  {batches.map(batch => (
                    <option key={batch} value={batch}>{batch}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Semester/Year *</label>
                <select
                  name="semester"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.semester}
                  onChange={handleInputChange}
                >
                  <option value="">Select Semester</option>
                  <option value="1st">1st Semester/Year</option>
                  <option value="2nd">2nd Semester/Year</option>
                  <option value="3rd">3rd Semester/Year</option>
                  <option value="4th">4th Semester/Year</option>
                </select>
              </div>
            </div>
          </div>

          {/* Optional Information Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-l-4 border-green-500 pl-3">
            Optional Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
                <input
                  type="file"
                  name="profilePicture"
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  name="address"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 font-semibold"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;