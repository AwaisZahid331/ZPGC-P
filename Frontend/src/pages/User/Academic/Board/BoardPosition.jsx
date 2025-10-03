import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const BoardPosition = () => {
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const resultsRef = useRef(null);

  // Board results data
  const boardResults = [
    { year: "2023", position: "1st", student: "Ali Ahmed", marks: "1085/1100", board: "Gujrat Board" },
    { year: "2022", position: "2nd", student: "Fatima Khan", marks: "1072/1100", board: "Gujrat Board" },
    { year: "2021", position: "1st", student: "Usman Ali", marks: "1090/1100", board: "Gujrat Board" },
    { year: "2020", position: "3rd", student: "Sanaullah", marks: "1065/1100", board: "Gujrat Board" }
  ];

  // Subject-wise performance
  const subjectPerformance = [
    { subject: "Physics", distinction: "95%", topScore: "99/100" },
    { subject: "Chemistry", distinction: "92%", topScore: "98/100" },
    { subject: "Mathematics", distinction: "88%", topScore: "97/100" },
    { subject: "Biology", distinction: "90%", topScore: "99/100" }
  ];

  // GSAP Animations
  useEffect(() => {
    const tl = gsap.timeline();

    // Header animation
    tl.fromTo(headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Results animation
    tl.fromTo(resultsRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );

    // Cards animation
    tl.fromTo(cardsRef.current,
      { y: 60, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" },
      "-=0.3"
    );
  }, []);

  const addToCardsRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 md:px-8">
      {/* Header Section */}
      <div ref={headerRef} className="text-center mb-12">
        <h1 className="text-5xl font-bold text-indigo-900 mb-4">
          Board Positions & Results
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Celebrating outstanding academic achievements and board positions of our intermediate students
        </p>
        <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        
        {/* Main Results Section */}
        <div ref={resultsRef} className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-indigo-900 mb-6 text-center">
            🏆 Board Position Holders
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {boardResults.map((result, index) => (
              <div key={index} className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border-l-4 border-indigo-400">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-3xl font-bold text-indigo-900">{result.position}</span>
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                    {result.year}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{result.student}</h3>
                <p className="text-gray-600 mb-1">Marks: <span className="font-semibold">{result.marks}</span></p>
                <p className="text-gray-600">Board: {result.board}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { number: "98%", label: "Overall Pass Percentage", icon: "📈" },
            { number: "150+", label: "A+ Grade Students", icon: "⭐" },
            { number: "5", label: "Top 10 Positions", icon: "🏅" }
          ].map((stat, index) => (
            <div
              key={index}
              ref={addToCardsRef}
              className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold text-indigo-900 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Subject Performance */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-indigo-900 mb-6 text-center">
            📊 Subject-wise Performance
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {subjectPerformance.map((subject, index) => (
              <div
                key={index}
                ref={addToCardsRef}
                className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg hover:shadow-md transition-all duration-300"
              >
                <h3 className="font-semibold text-gray-800 mb-3">{subject.subject}</h3>
                <div className="space-y-2">
                  <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                    Distinction: {subject.distinction}
                  </div>
                  <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                    Top Score: {subject.topScore}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievement Highlights */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl shadow-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">🎯 Achievement Highlights</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white/20 p-3 rounded-lg">
              <p>Consistently producing top position holders for 5 consecutive years</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <p>100% pass rate in Pre-Medical and Pre-Engineering groups</p>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-8">
          <div className="bg-white rounded-xl shadow-sm p-6 inline-block">
            <p className="text-gray-600">
              Government Zamindar College, Gujrat • Intermediate Board Results
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardPosition;