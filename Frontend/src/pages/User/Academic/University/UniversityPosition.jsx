import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const UniversityPosition = () => {
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const chartRef = useRef(null);

  // University ranking data
  const rankingData = [
    { year: "2023", position: "1st", university: "University of Gujrat", category: "Overall Ranking" },
    { year: "2022", position: "2nd", university: "University of Gujrat", category: "Academic Excellence" },
    { year: "2021", position: "1st", university: "University of Gujrat", category: "Research Quality" },
    { year: "2020", position: "3rd", university: "University of Gujrat", category: "Student Satisfaction" }
  ];

  // Achievements data
  const achievements = [
    {
      icon: "🏆",
      title: "Top Ranked College",
      description: "Consistently ranked among top 10 colleges in Punjab affiliated with University of Gujrat"
    },
    {
      icon: "📚",
      title: "Academic Excellence",
      description: "Highest pass percentage in university examinations for consecutive years"
    },
    {
      icon: "🔬",
      title: "Research Contributions",
      description: "Significant research publications and projects in collaboration with UOG"
    },
    {
      icon: "🎓",
      title: "Quality Education",
      description: "Recognized for maintaining high standards in teaching and learning processes"
    }
  ];

  // Faculty achievements
  const facultyAchievements = [
    {
      name: "Dr. Ahmed Raza",
      position: "Professor of Physics",
      achievement: "Best Researcher Award 2023 - University of Gujrat"
    },
    {
      name: "Dr. Fatima Shah",
      position: "HOD Chemistry",
      achievement: "Excellence in Teaching Award 2022"
    },
    {
      name: "Prof. Naveed Akhtar",
      position: "Mathematics Department",
      achievement: "Published 15 Research Papers in 2023"
    }
  ];

  // GSAP Animations
  useEffect(() => {
    const tl = gsap.timeline();

    // Header animation
    tl.fromTo(headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Cards animation
    tl.fromTo(cardsRef.current,
      { y: 60, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.7)" },
      "-=0.5"
    );

    // Chart animation
    tl.fromTo(chartRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
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
          University Position & Honors
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Celebrating academic excellence and achievements of Government Zamindar College 
          in University of Gujrat rankings and recognitions
        </p>
        <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Ranking Overview */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Ranking Chart */}
          <div ref={chartRef} className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-indigo-900 mb-6 text-center">
              University Ranking Timeline
            </h2>
            <div className="space-y-4">
              {rankingData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                      item.position === "1st" ? "bg-yellow-500" :
                      item.position === "2nd" ? "bg-gray-400" :
                      "bg-amber-600"
                    }`}>
                      {item.position}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{item.category}</h3>
                      <p className="text-sm text-gray-600">{item.year}</p>
                    </div>
                  </div>
                  <span className="text-indigo-600 font-semibold">{item.university}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-indigo-900 mb-6 text-center">
              Key Achievements
            </h2>
            <div className="grid gap-4">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  ref={addToCardsRef}
                  className="flex items-start space-x-4 p-4 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                >
                  <div className="text-3xl">{achievement.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">{achievement.title}</h3>
                    <p className="text-gray-600 text-sm">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Faculty Achievements */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-indigo-900 mb-6 text-center">
            Faculty Honors & Recognitions
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {facultyAchievements.map((faculty, index) => (
              <div
                key={index}
                ref={addToCardsRef}
                className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl hover:shadow-md transition-all duration-300"
              >
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                  👨‍🏫
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{faculty.name}</h3>
                <p className="text-indigo-600 text-sm mb-3">{faculty.position}</p>
                <p className="text-gray-700 text-sm">{faculty.achievement}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { number: "95%", label: "Pass Percentage", icon: "📈" },
            { number: "150+", label: "Research Papers", icon: "📊" },
            { number: "25", label: "Awards Won", icon: "🏅" },
            { number: "1st", label: "Overall Ranking", icon: "⭐" }
          ].map((stat, index) => (
            <div
              key={index}
              ref={addToCardsRef}
              className="bg-white rounded-xl shadow-lg p-6 text-center hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-indigo-900 mb-1">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Recent Achievements */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">Recent Honors</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">🏆 Best College Award 2023</h3>
              <p className="text-blue-100 text-sm">Awarded by University of Gujrat for overall excellence in academics and extracurricular activities</p>
            </div>
            <div className="bg-white/20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">🎯 Quality Education Certificate</h3>
              <p className="text-blue-100 text-sm">Recognized for maintaining highest standards in teaching methodology and student development</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="text-center mt-8">
          <div className="bg-white rounded-xl shadow-sm p-6 inline-block">
            <h4 className="text-lg font-semibold text-indigo-900 mb-2">
              For More Information
            </h4>
            <p className="text-gray-600">
              Quality Enhancement Cell • University of Gujrat • Phone: (053) 123-4567
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityPosition;