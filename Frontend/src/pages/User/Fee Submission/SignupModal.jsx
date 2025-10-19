import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../../components/Loader";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { registerUser } from "../../../store/authSlice";

const SignupModal = ({ onClose }) => {
  const modalRef = useRef(null);
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    cnic: "",
    program: "",
    department: "",
    batch: "",
    semester: "",
    profilePicture: null,
    address: "",
  });

  const programs = ["Intermediate", "BS", "MSc", "MA", "BCom"];
  const departments = [
    "Computer Science",
    "Physics",
    "Chemistry",
    "Mathematics",
    "English",
    "Urdu",
    "Islamic Studies",
  ];
  const batches = ["2020-2024", "2021-2025", "2022-2026", "2023-2027"];

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.password) {
      toast.error("Please fill in all required fields (Name, Email, Password)");
      return;
    }

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('phone', formData.phoneNumber || '');
      formDataToSend.append('cnic', formData.cnic || '');
      formDataToSend.append('program', formData.program || '');
      formDataToSend.append('department', formData.department || '');
      formDataToSend.append('semester', formData.semester || '');
      formDataToSend.append('batch', formData.batch || '');
      formDataToSend.append('address', formData.address || '');
      
      // Add avatar file if selected
      if (formData.profilePicture) {
        formDataToSend.append('avatar', formData.profilePicture);
      }

      console.log("Register Payload:", Object.fromEntries(formDataToSend));

      // Dispatch register action
      const result = await dispatch(registerUser(formDataToSend)).unwrap();

      if (result) {
        if (result.emailSent) {
          toast.success("🎉 Registration successful! Please check your email to verify your account.", {
            duration: 6000,
            style: {
              background: '#10b981',
              color: 'white',
              fontSize: '16px',
              padding: '16px',
            }
          });
        } else {
          toast.success(`Signup successful! Welcome ${result.user?.name || "Student"}`);
        }
        onClose();
      }
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error(error || "Error occurred during signup. Please try again.");
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      gsap.to(modalRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        onComplete: onClose,
      });
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <Toaster position="top-right" reverseOrder={false} />
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-indigo-900">
              Student Registration
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-l-4 border-indigo-500 pl-3">
              Basic Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="fullName"
                required
                placeholder="Full Name"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={formData.fullName}
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={formData.email}
                onChange={handleInputChange}
              />
              <input
                type="password"
                name="password"
                required
                placeholder="Password"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={formData.password}
                onChange={handleInputChange}
              />
              <input
                type="tel"
                name="phoneNumber"
                required
                placeholder="Phone Number"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="cnic"
                required
                placeholder="CNIC / B-Form"
                className="md:col-span-2 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={formData.cnic}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Academic Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-l-4 border-blue-500 pl-3">
              Academic Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <select
                name="program"
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={formData.program}
                onChange={handleInputChange}
              >
                <option value="">Select Program</option>
                {programs.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
              <select
                name="department"
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={formData.department}
                onChange={handleInputChange}
              >
                <option value="">Select Department</option>
                {departments.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
              <select
                name="batch"
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={formData.batch}
                onChange={handleInputChange}
              >
                <option value="">Select Batch</option>
                {batches.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
              <select
                name="semester"
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={formData.semester}
                onChange={handleInputChange}
              >
                <option value="">Select Semester</option>
                <option value="1st">1st Semester</option>
                <option value="2nd">2nd Semester</option>
                <option value="3rd">3rd Semester</option>
                <option value="4th">4th Semester</option>
                <option value="5th">5th Semester</option>
                <option value="6th">6th Semester</option>
                <option value="7th">7th Semester</option>
                <option value="8th">8th Semester</option>
              </select>
            </div>
          </div>

          {/* Optional Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-l-4 border-green-500 pl-3">
              Optional Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="file"
                name="profilePicture"
                accept="image/*"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                onChange={handleInputChange}
              />
              <textarea
                name="address"
                rows={3}
                placeholder="Address"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            {loading ? (
              <div className="px-6 py-2 rounded-lg bg-indigo-500 text-white flex items-center justify-center">
                <Loader />
              </div>
            ) : (
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-semibold transition-all duration-200"
              >
                Create Account
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
