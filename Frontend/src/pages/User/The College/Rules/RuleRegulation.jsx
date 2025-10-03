import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const RuleRegulation = () => {
  const headerRef = useRef(null);
  const rulesRef = useRef(null);
  const cardsRef = useRef([]);

  // Rules and regulations data with icons
  const rulesData = [
    {
      icon: "📚",
      title: "General Discipline",
      points: [
        "All Students must abide by the College Rules, Regulations, Policies and Guidelines.",
        "Breach of these Rules, Regulations, Policies and Guidelines shall render them liable to disciplinary, administrative and legal action including but not limited to imposition of fine, suspension or expulsion (both provisional and permanent) from the College."
      ]
    },
    {
      icon: "🚫",
      title: "Prohibited Activities",
      points: [
        "No student is allowed to paste, exhibit, prepare or distribute any poster, leaflet, notice, pamphlet or handbill in the College premises.",
        "Use of mobile phones and cameras are strictly prohibited in the College premises and during the College Functions. Mobiles and cameras confiscated shall only be returned if disciplinary committee permits.",
        "Smoking in the College premises is strictly prohibited.",
        "Any political or immoral activity is strictly prohibited in or around the College premises."
      ]
    },
    {
      icon: "⏰",
      title: "Attendance & Punctuality",
      points: [
        "Every student of the College is required to be punctual in the class.",
        "Any student remaining absent from classes without proper permission for a continuous period of 06 days, excluding holidays, shall be struck off from the College Roll unless the cause of absence is explained to the satisfaction of the Principal.",
        "Late-comers in the class may be marked absent.",
        "A fine of Rs.10/- per lecture will be imposed for absence without proper leave."
      ]
    },
    {
      icon: "🎓",
      title: "Student Identity & Uniform",
      points: [
        "Students must keep the College identity Card during their stay in the College premises and during College functions.",
        "Students are required to wear the prescribed uniform while attending the College."
      ]
    },
    {
      icon: "🏫",
      title: "College Administration",
      points: [
        "The College authorities reserve the right to revise any class schedule or to re-arrange the classes.",
        "The College is not responsible for any loss/damage regarding the student's belongings.",
        "Shifts and Sections once allotted to the students shall not be changed in any case."
      ]
    },
    {
      icon: "🚗",
      title: "Parking & Security",
      points: [
        "The College students, while parking the bikes/motor cars, are required to put proper lock on them.",
        "The College administration shall not be responsible for any loss on this account, whatsoever."
      ]
    },
    {
      icon: "⚖️",
      title: "Legal & Administrative Actions",
      points: [
        "Any false information on the Application Form may render the student liable to expulsion from the College.",
        "The College shall have the right to take any disciplinary, administrative and legal action against a defaulting student.",
        "Actions may include expulsion, suspension, withholding of Examination Admission Forms, or withholding examination results."
      ]
    },
    {
      icon: "💳",
      title: "Fee & Financial Matters",
      points: [
        "If the College Administration pays any amount to any Authority, Board, Government Department etc. on behalf of any Student(s), all such amounts shall remain recoverable from such Student(s) as outstanding College Dues.",
        "Students may apply for the cancellation of their admission (subject to the permission of Principal) within 15 days after getting admission, however no fee refund shall be made."
      ]
    },
    {
      icon: "📝",
      title: "Academic Requirements",
      points: [
        "Withholding of examination results may occur due to:",
        "- Poor Attendance",
        "- Non-payment of College Dues", 
        "- Poor overall Academic Record",
        "- Failure in the College Examinations",
        "- Any other reason not specifically mentioned"
      ]
    },
    {
      icon: "👥",
      title: "Classroom Conduct",
      points: [
        "No student is allowed to leave the class without the permission of his/her teacher or until the class is over.",
        "Students must respect teachers and follow classroom instructions properly."
      ]
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

    // Rules container animation
    tl.fromTo(rulesRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );

    // Staggered card animations
    tl.fromTo(cardsRef.current,
      { 
        y: 60, 
        opacity: 0, 
        scale: 0.8 
      },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 0.6, 
        stagger: 0.15,
        ease: "back.out(1.7)" 
      },
      "-=0.3"
    );

    // Add hover animations
    cardsRef.current.forEach((card) => {
      if (card) {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -5,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      }
    });
  }, []);

  // Add card to ref array
  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 md:px-8">
      {/* Header Section */}
      <div ref={headerRef} className="text-center mb-16">
        <h1 className="text-5xl font-bold text-indigo-900 mb-4">
          Rules and Regulations
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-6 rounded-full"></div>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto">
          Government Zamindar College is committed to maintaining a disciplined and conducive learning environment. 
          All students are expected to adhere to the following rules and regulations.
        </p>
      </div>

      {/* Rules and Regulations Grid */}
      <div ref={rulesRef} className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rulesData.map((rule, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border-l-4 border-indigo-500"
            >
              {/* Icon Section */}
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full text-3xl mb-3">
                  {rule.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800">{rule.title}</h3>
              </div>

              {/* Points List */}
              <ul className="space-y-3">
                {rule.points.map((point, pointIndex) => (
                  <li 
                    key={pointIndex}
                    className="flex items-start space-x-2 text-gray-700"
                  >
                    <span className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Important Notice Section */}
      <div className="max-w-4xl mx-auto mt-16 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl shadow-lg p-8 border-l-4 border-red-500">
        <div className="flex items-center mb-4">
          <div className="text-3xl mr-4">⚠️</div>
          <h3 className="text-2xl font-bold text-red-800">Important Notice</h3>
        </div>
        <p className="text-gray-700 leading-relaxed">
          The College Administration reserves the right to modify these rules as deemed necessary. 
          Students are responsible for staying updated with any changes. Serious violations may lead 
          to immediate disciplinary action including suspension or expulsion.
        </p>
      </div>

      {/* Footer Section */}
      <div className="text-center mt-16">
        <div className="bg-white rounded-lg shadow-md p-6 inline-block">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            For Queries & Clarifications
          </h4>
          <p className="text-gray-600">
            Contact College Administration Office • Phone: (053) 123-4567 • Email: admin@zamindarcollege.edu.pk
          </p>
        </div>
      </div>
    </div>
  );
};

export default RuleRegulation;