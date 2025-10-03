import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const NoticePeriod = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const headerRef = useRef(null);
//   const noticesRef = useRef(null);
  const filterRef = useRef(null);

  // Notices data
  const noticesData = [
    {
      id: 1,
      title: "Intermediate Admissions [3rd Merit List]",
      date: "October 7, 2020",
      category: "admissions",
      priority: "high",
      description: "The 3rd merit list for Intermediate admissions has been released. Selected candidates are required to complete their admission process by October 15, 2020.",
      status: "active"
    },
    {
      id: 2,
      title: "BS Admissions - Session 2020 [Form submission]",
      date: "October 5, 2020",
      category: "admissions",
      priority: "high",
      description: "Last date for BS admissions form submission is October 20, 2020. Incomplete forms will not be entertained.",
      status: "active"
    },
    {
      id: 3,
      title: "UOG Announced Exam Schedule Date for BA/Bsc/B-com",
      date: "September 4, 2020",
      category: "exams",
      priority: "medium",
      description: "University of Gujrat has announced the final examination schedule for BA, BSc, and BCom programs. Students can download the schedule from the college portal.",
      status: "active"
    },
    {
      id: 4,
      title: "College Reopening After Summer Break",
      date: "August 25, 2020",
      category: "general",
      priority: "medium",
      description: "College will reopen on September 1, 2020. All students are expected to attend classes regularly from the first day.",
      status: "active"
    },
    {
      id: 5,
      title: "Scholarship Application Deadline Extended",
      date: "August 20, 2020",
      category: "scholarship",
      priority: "high",
      description: "Last date for scholarship applications has been extended to August 30, 2020. Eligible students must submit their documents before the deadline.",
      status: "active"
    }
  ];

  // Categories for filtering
  const categories = [
    { id: 'all', label: 'All Notices', emoji: '📢', count: noticesData.length },
    { id: 'admissions', label: 'Admissions', emoji: '🎓', count: noticesData.filter(n => n.category === 'admissions').length },
    { id: 'exams', label: 'Examinations', emoji: '📝', count: noticesData.filter(n => n.category === 'exams').length },
    { id: 'scholarship', label: 'Scholarships', emoji: '💰', count: noticesData.filter(n => n.category === 'scholarship').length },
    { id: 'general', label: 'General', emoji: 'ℹ️', count: noticesData.filter(n => n.category === 'general').length }
  ];

  // Filter notices based on active category
  const filteredNotices = activeCategory === 'all' 
    ? noticesData 
    : noticesData.filter(notice => notice.category === activeCategory);

  // GSAP Animations
  useEffect(() => {
    const tl = gsap.timeline();

    // Header animation
    tl.fromTo(headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Filter buttons animation
    tl.fromTo(filterRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );

    // Notices animation
    animateNotices();
  }, [activeCategory]);

  const animateNotices = () => {
    gsap.fromTo(".notice-card",
      { 
        y: 60, 
        opacity: 0,
        scale: 0.9
      },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 0.6, 
        stagger: 0.1,
        ease: "back.out(1.7)" 
      }
    );
  };

  const handleCategoryClick = (categoryId) => {
    // Animate out current notices
    gsap.to(".notice-card", {
      y: -60,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setActiveCategory(categoryId);
      }
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-indigo-100 text-indigo-900 border-indigo-200';
      case 'medium': return 'bg-blue-100 text-blue-900 border-blue-200';
      case 'low': return 'bg-indigo-50 text-indigo-700 border-indigo-100';
      default: return 'bg-blue-50 text-blue-700 border-blue-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 md:px-8">
      {/* Header Section */}
      <div ref={headerRef} className="text-center mb-12">
        <h1 className="text-5xl font-bold text-indigo-900 mb-4">
          College Notice Board
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Stay updated with the latest announcements and important notices from Government Zamindar College, Gujrat
        </p>
        <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Category Filters */}
        <div ref={filterRef} className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-indigo-900 mb-6 text-center">
            Filter Notices by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`p-4 rounded-xl transition-all duration-300 border-2 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg border-transparent'
                    : 'bg-white text-indigo-900 border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50'
                }`}
              >
                <div className="text-2xl mb-2">{category.emoji}</div>
                <div className="font-semibold text-sm">{category.label}</div>
                <div className="text-xs opacity-75 mt-1">{category.count} notices</div>
              </button>
            ))}
          </div>
        </div>

        {/* Notices Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredNotices.map((notice) => (
            <div
              key={notice.id}
              className="notice-card bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-indigo-400"
            >
              {/* Notice Header */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-indigo-100">
                <div className="flex justify-between items-start mb-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getPriorityColor(notice.priority)}`}>
                    {notice.priority.toUpperCase()} PRIORITY
                  </span>
                  <span className="text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full text-sm font-medium">
                    {notice.date}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-indigo-900 leading-tight">
                  {notice.title}
                </h3>
              </div>

              {/* Notice Body */}
              <div className="p-6">
                <p className="text-gray-600 leading-relaxed mb-4">
                  {notice.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      notice.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {notice.status === 'active' ? '📌 Active' : '📅 Expired'}
                    </span>
                    <span className="text-indigo-600 text-sm font-medium capitalize">
                      {notice.category}
                    </span>
                  </div>
                  
                  <button className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm flex items-center">
                    Read More
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredNotices.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border-2 border-indigo-100">
            <div className="text-6xl mb-4 text-indigo-200">📭</div>
            <h3 className="text-2xl font-bold text-indigo-900 mb-2">No Notices Found</h3>
            <p className="text-gray-600">There are no notices available for the selected category.</p>
          </div>
        )}

        {/* Information Section */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl shadow-lg p-8 mt-8 text-white text-center">
          <div className="flex items-center justify-center mb-4">
            <span className="text-4xl mr-4">💡</span>
            <div>
              <h3 className="text-2xl font-bold">Stay Informed</h3>
              <p className="text-blue-100">Check this notice board regularly for important updates</p>
            </div>
          </div>
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors duration-300">
            Subscribe to Updates
          </button>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-6 text-center border-t-4 border-indigo-400">
          <h4 className="text-lg font-bold text-indigo-900 mb-2">
            For More Information
          </h4>
          <p className="text-gray-600">
            College Administration Office • Phone: (053) 123-4567 • Email: info@zamindarcollege.edu.pk
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoticePeriod;