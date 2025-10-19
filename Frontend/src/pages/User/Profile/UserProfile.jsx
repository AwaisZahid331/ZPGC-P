import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ArrowLeft, Edit, Mail, Phone, MapPin, GraduationCap, Calendar, User, Hash } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { fetchUserProfile } from "../../../store/authSlice";
import Loader from "../../../components/Loader";

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, loading, fetchingProfile } = useAppSelector((state) => state.auth);
  
  const headerRef = useRef(null);
  const profileRef = useRef(null);
  const detailsRef = useRef(null);

  // Fetch user profile data
  useEffect(() => {
    // Only fetch if user data is not complete and not already fetching
    if ((!user || !user.program || !user.semester || !user.batch) && !fetchingProfile) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, user, fetchingProfile]);

  // GSAP Animations
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      headerRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
      .fromTo(
        profileRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        detailsRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.2"
      );
  }, []);

  if (loading || fetchingProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader />
          <p className="text-gray-600 mt-4 text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  const profileData = [
    {
      icon: <User className="w-5 h-5" />,
      label: "Full Name",
      value: user?.name || "Not provided",
      color: "text-blue-600"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: user?.email || "Not provided",
      color: "text-green-600"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone Number",
      value: user?.phoneNumber || "Not provided",
      color: "text-purple-600"
    },
    {
      icon: <Hash className="w-5 h-5" />,
      label: "CNIC",
      value: user?.cnic || "Not provided",
      color: "text-orange-600"
    },
    {
      icon: <GraduationCap className="w-5 h-5" />,
      label: "Program",
      value: user?.program || "Not provided",
      color: "text-indigo-600"
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: "Semester",
      value: user?.semester || "Not provided",
      color: "text-pink-600"
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: "Batch",
      value: user?.batch || "Not provided",
      color: "text-cyan-600"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Address",
      value: user?.address || "Not provided",
      color: "text-red-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Toaster position="top-right" reverseOrder={false} />
      
      {/* Header */}
      <div
        ref={headerRef}
        className="bg-white shadow-lg border-b border-gray-200 fixed w-full top-0 left-0 z-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-200 mr-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Card */}
        <div
          ref={profileRef}
          className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8"
        >
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-12 text-white">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-white/20 flex items-center justify-center border-4 border-white/30">
                  {user?.profilePicture ? (
                    <img 
                      src={user.profilePicture} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-bold text-4xl">
                      {user?.name?.charAt(0) || 'U'}
                    </span>
                  )}
                </div>
                <button className="absolute bottom-0 right-0 bg-white text-indigo-600 p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200">
                  <Edit className="w-4 h-4" />
                </button>
              </div>

              {/* User Info */}
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold mb-2">{user?.name || 'Student'}</h2>
                <p className="text-white/80 text-lg mb-1">{user?.email || 'student@college.edu.pk'}</p>
                <p className="text-white/70">{user?.program || 'Computer Science'} • {user?.semester || '3rd'} Semester</p>
                <div className="flex items-center justify-center md:justify-start mt-3">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    Student ID: ZMC{user?.id || '1234'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div ref={detailsRef} className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <User className="w-6 h-6 mr-2 text-indigo-600" />
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profileData.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex items-start space-x-3">
                    <div className={`${item.color} flex-shrink-0 mt-1`}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        {item.label}
                      </p>
                      <p className="text-gray-900 font-semibold break-words">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/user/dashboard')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center">
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
