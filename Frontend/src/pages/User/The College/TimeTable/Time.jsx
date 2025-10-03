import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const Time = () => {
  const [activeTable, setActiveTable] = useState('inter');
  const headerRef = useRef(null);
  const tabsRef = useRef(null);
  const contentRef = useRef(null);

  // Time table data
  const timeTables = {
    inter: {
      title: "Intermediate Time Table 2020-2021",
      schedule: [
        { day: "Monday", time: "8:00 AM - 1:00 PM", subjects: ["Physics", "Chemistry", "Mathematics"] },
        { day: "Tuesday", time: "8:00 AM - 1:00 PM", subjects: ["English", "Urdu", "Computer Science"] },
        { day: "Wednesday", time: "8:00 AM - 1:00 PM", subjects: ["Physics Lab", "Chemistry Lab"] },
        { day: "Thursday", time: "8:00 AM - 1:00 PM", subjects: ["Mathematics", "Islamiyat", "Pakistan Studies"] },
        { day: "Friday", time: "8:00 AM - 12:00 PM", subjects: ["Revision", "Tests", "Guest Lecture"] }
      ]
    },
    ba: {
      title: "BA Time Table 2020-2021",
      schedule: [
        { day: "Monday", time: "2:00 PM - 6:00 PM", subjects: ["English Literature", "History", "Political Science"] },
        { day: "Tuesday", time: "2:00 PM - 6:00 PM", subjects: ["Psychology", "Sociology", "Economics"] },
        { day: "Wednesday", time: "2:00 PM - 6:00 PM", subjects: ["Islamic Studies", "Pakistan Studies", "Library"] },
        { day: "Thursday", time: "2:00 PM - 6:00 PM", subjects: ["Optional Subjects", "Tutorials"] },
        { day: "Friday", time: "2:00 PM - 5:00 PM", subjects: ["Seminars", "Presentations"] }
      ]
    },
    bsc: {
      title: "BSc Time Table 2020-2021",
      schedule: [
        { day: "Monday", time: "8:00 AM - 1:00 PM", subjects: ["Physics", "Chemistry", "Mathematics"] },
        { day: "Tuesday", time: "8:00 AM - 1:00 PM", subjects: ["Biology", "Computer Science", "Statistics"] },
        { day: "Wednesday", time: "8:00 AM - 1:00 PM", subjects: ["Physics Lab", "Chemistry Lab", "Biology Lab"] },
        { day: "Thursday", time: "8:00 AM - 1:00 PM", subjects: ["Mathematics", "Computer Lab", "Research"] },
        { day: "Friday", time: "8:00 AM - 12:00 PM", subjects: ["Practical Tests", "Viva"] }
      ]
    },
    ma: {
      title: "MA Time Table Spring 2020",
      schedule: [
        { day: "Monday", time: "2:00 PM - 6:00 PM", subjects: ["Advanced Literature", "Research Methodology"] },
        { day: "Tuesday", time: "2:00 PM - 6:00 PM", subjects: ["Specialization Paper I", "Seminar"] },
        { day: "Wednesday", time: "2:00 PM - 6:00 PM", subjects: ["Specialization Paper II", "Library Research"] },
        { day: "Thursday", time: "2:00 PM - 6:00 PM", subjects: ["Thesis Guidance", "Workshops"] },
        { day: "Friday", time: "2:00 PM - 5:00 PM", subjects: ["Guest Lectures", "Presentations"] }
      ]
    },
    msc: {
      title: "MSc Time Table Spring 2020",
      schedule: [
        { day: "Monday", time: "8:00 AM - 1:00 PM", subjects: ["Advanced Physics", "Research Methods"] },
        { day: "Tuesday", time: "8:00 AM - 1:00 PM", subjects: ["Advanced Chemistry", "Lab Work"] },
        { day: "Wednesday", time: "8:00 AM - 1:00 PM", subjects: ["Advanced Mathematics", "Computer Applications"] },
        { day: "Thursday", time: "8:00 AM - 1:00 PM", subjects: ["Thesis Work", "Data Analysis"] },
        { day: "Friday", time: "8:00 AM - 12:00 PM", subjects: ["Research Seminars", "Paper Discussion"] }
      ]
    }
  };

  // Session data
  const sessions = {
    morning: {
      title: "Morning Session Time Table 2020",
      classes: ["Intermediate (Pre-Medical)", "Intermediate (Pre-Engineering)", "BSc (Physics, Chemistry, Maths)", "MSc (Morning)"],
      timing: "8:00 AM - 1:00 PM"
    },
    second: {
      title: "Second Shift Time Table 2020", 
      classes: ["BA (All Subjects)", "BCom", "MA (Evening)", "MSc (Evening)"],
      timing: "2:00 PM - 6:00 PM"
    }
  };

  // GSAP Animations
  useEffect(() => {
    const tl = gsap.timeline();

    // Header animation
    tl.fromTo(headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Tabs animation
    tl.fromTo(tabsRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );

    // Content animation
    animateContent();
  }, [activeTable]);

  const animateContent = () => {
    gsap.fromTo(".content-item",
      { 
        x: 100, 
        opacity: 0,
        scale: 0.9
      },
      { 
        x: 0, 
        opacity: 1, 
        scale: 1,
        duration: 0.6, 
        stagger: 0.1,
        ease: "back.out(1.7)" 
      }
    );
  };

  const handleTabClick = (tab) => {
    // Animate out current content
    gsap.to(".content-item", {
      x: -100,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setActiveTable(tab);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 md:px-8">
      {/* Header Section */}
      <div ref={headerRef} className="text-center mb-12">
        <h1 className="text-5xl font-bold text-indigo-900 mb-4">
          Academic Time Tables
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Session 2020-2021 • Government Zamindar College, Gujrat
        </p>
        <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {/* Program Selection Tabs */}
        <div ref={tabsRef} className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Select Your Program
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { id: 'inter', label: 'Intermediate', emoji: '📚' },
              { id: 'ba', label: 'BA', emoji: '🎓' },
              { id: 'bsc', label: 'BSc', emoji: '🔬' },
              { id: 'ma', label: 'MA', emoji: '📖' },
              { id: 'msc', label: 'MSc', emoji: '⚛️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  activeTable === tab.id
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="text-2xl mb-2">{tab.emoji}</div>
                <span className="font-semibold">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Time Table Content */}
        <div ref={contentRef} className="grid lg:grid-cols-2 gap-8">
          {/* Detailed Time Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6">
              <h3 className="text-2xl font-bold text-white">
                {timeTables[activeTable].title}
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {timeTables[activeTable].schedule.map((day, index) => (
                  <div 
                    key={index}
                    className="content-item bg-gray-50 rounded-lg p-4 border-l-4 border-indigo-400"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gray-800 text-lg">{day.day}</h4>
                      <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                        {day.time}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {day.subjects.map((subject, subIndex) => (
                        <span 
                          key={subIndex}
                          className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-gray-200"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Session Information */}
          <div className="space-y-8">
            {/* Morning Session */}
            <div className="content-item bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6">
                <h3 className="text-xl font-bold text-white">
                  {sessions.morning.title}
                </h3>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="font-semibold text-gray-700">Timing: {sessions.morning.timing}</span>
                </div>
                <div className="space-y-2">
                  {sessions.morning.classes.map((cls, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-green-300 rounded-full mr-3"></div>
                      <span className="text-gray-600">{cls}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Second Shift */}
            <div className="content-item bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6">
                <h3 className="text-xl font-bold text-white">
                  {sessions.second.title}
                </h3>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                  <span className="font-semibold text-gray-700">Timing: {sessions.second.timing}</span>
                </div>
                <div className="space-y-2">
                  {sessions.second.classes.map((cls, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-orange-300 rounded-full mr-3"></div>
                      <span className="text-gray-600">{cls}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Download Section */}
            <div className="content-item bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg p-6 text-center">
              <h3 className="text-xl font-bold text-white mb-3">
                Download Complete Time Tables
              </h3>
              <p className="text-purple-100 mb-4">
                Get PDF versions of all time tables for offline reference
              </p>
              <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
                Download All PDFs
              </button>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="content-item bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-6 mt-8">
          <div className="flex items-center mb-3">
            <span className="text-2xl mr-3">📌</span>
            <h4 className="text-lg font-bold text-gray-800">Important Notes</h4>
          </div>
          <ul className="text-gray-700 space-y-2">
            <li>• Time tables are subject to change during examination periods</li>
            <li>• Friday timing may vary for special events and prayers</li>
            <li>• Lab sessions require prior registration with respective departments</li>
            <li>• Any changes will be notified one week in advance</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Time;