import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Menu, X } from "lucide-react";
import Loader from "../../../components/Loader";
import LogoutButton from "../../../components/LogoutButton";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { fetchUserProfile } from "../../../store/authSlice";

const UserDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, fetchingProfile } = useAppSelector((state) => state.auth);

  // ✅ Define all refs properly
  const headerRef = useRef(null);
  const statsRef = useRef(null);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Load user data
  useEffect(() => {
    const loadUserData = async () => {
      // Only fetch if user data is not complete and not already fetching
      if ((!user || !user.program || !user.semester || !user.batch) && !fetchingProfile) {
        setIsLoading(true);
        
        // Fetch user profile data
        await dispatch(fetchUserProfile());
        
        // Simulate loading time
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };
    
    loadUserData();
  }, [dispatch, user, fetchingProfile]);

  // ✅ GSAP Animations
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      headerRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
      .fromTo(
        statsRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      );
  }, []);



  const stats = [
    { label: "Current Semester", value: user?.semester || "3rd", icon: "📖" },
    { label: "Program", value: user?.program || "Computer Science", icon: "🏛️" },
    { label: "Batch", value: user?.batch || "2022-2026", icon: "👥" },
    { label: "Student ID", value: `ZMC${user?.id || '1234'}`, icon: "🆔" },
  ];


  // Show loader while data is loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 w-full flex items-center justify-center">
        <div className="text-center">
          <Loader />
          <p className="text-gray-600 mt-4 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 w-full">
      <Toaster position="top-right" reverseOrder={false} />

      {/* ======= HEADER WITH DRAWER ======= */}
      <div
        ref={headerRef}
        className="bg-white shadow-lg border-b border-gray-200 fixed w-full top-0 left-0 z-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            {/* Left section */}
            <div className="flex items-center space-x-3">
              {/* Hamburger icon for mobile */}
              <button
                onClick={() => setDrawerOpen(true)}
                className="lg:hidden text-gray-800 hover:text-indigo-600"
              >
                <Menu size={26} />
              </button>

              <h1 className="text-2xl font-bold text-gray-900">
                Welcome, {user?.name || 'Student'} 👋
              </h1>
            </div>

            {/* Mobile Logout Button */}
            <div className="lg:hidden">
              <LogoutButton className="text-sm px-3 py-1" />
            </div>

            {/* Right section */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* User Avatar */}
              <button
                onClick={() => navigate("/user/profile")}
                className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-2 transition-colors duration-200"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden bg-indigo-100 flex items-center justify-center">
                  {user?.profilePicture ? (
                    <img 
                      src={user.profilePicture} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-indigo-600 font-semibold text-lg">
                      {user?.name?.charAt(0) || 'U'}
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Logged in as</p>
                  <p className="font-semibold text-gray-900">{user?.name || 'Student'}</p>
                </div>
              </button>
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>

      {/* ======= DRAWER ======= */}
      {drawerOpen && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-30 backdrop-blur-sm">
          <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg p-6 z-40 transform transition-transform duration-300 ease-in-out">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
              <button
                onClick={() => setDrawerOpen(false)}
                className="text-gray-700 hover:text-indigo-600"
              >
                <X size={24} />
              </button>
            </div>

            {/* User Profile Section */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-4 mb-6 text-white">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white/20 flex items-center justify-center">
                  {user?.profilePicture ? (
                    <img 
                      src={user.profilePicture} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-semibold text-xl">
                      {user?.name?.charAt(0) || 'U'}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{user?.name || 'Student'}</h3>
                  <p className="text-sm text-white/80">{user?.email || 'student@college.edu.pk'}</p>
                </div>
              </div>
              
              {/* User Details */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/80">Program:</span>
                  <span className="font-medium">{user?.program || 'Computer Science'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Semester:</span>
                  <span className="font-medium">{user?.semester || '3rd'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Batch:</span>
                  <span className="font-medium">{user?.batch || '2022-2026'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">CNIC:</span>
                  <span className="font-medium">{user?.cnic || 'N/A'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => {
                  navigate("/user/profile");
                  setDrawerOpen(false);
                }}
                className="w-full text-left text-gray-800 hover:text-indigo-600 transition"
              >
                👤 My Profile
              </button>
              <button
                onClick={() => {
                  navigate("/fee-submission");
                  setDrawerOpen(false);
                }}
                className="w-full text-left text-gray-800 hover:text-indigo-600 transition"
              >
                💰 Fee Submission
              </button>
              <button
                onClick={() => {
                  navigate("/timetable");
                  setDrawerOpen(false);
                }}
                className="w-full text-left text-gray-800 hover:text-indigo-600 transition"
              >
                ⏰ Time Table
              </button>
              <button
                onClick={() => {
                  navigate("/notice-board");
                  setDrawerOpen(false);
                }}
                className="w-full text-left text-gray-800 hover:text-indigo-600 transition"
              >
                📢 Notice Board
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======= MAIN CONTENT ======= */}
      <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center">
                <div className="text-3xl mr-4">{stat.icon}</div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;