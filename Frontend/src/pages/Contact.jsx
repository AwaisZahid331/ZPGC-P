import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  AcademicCapIcon,
  ClockIcon,
  LinkIcon
} from "@heroicons/react/24/outline";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const cardRefs = useRef([]);
  const mapRef = useRef(null);
  const contactInfoRef = useRef(null);
  const sectionTitleRef = useRef(null);
  const [isContentVisible, setIsContentVisible] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  cardRefs.current = [];

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  useEffect(() => {
    setIsContentVisible(true);
    const timer = setTimeout(() => {

      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
      if (sectionTitleRef.current) {
        gsap.fromTo(sectionTitleRef.current, 
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionTitleRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Cards animation
      if (cardRefs.current.length > 0) {
        cardRefs.current.forEach((card, i) => {
          gsap.fromTo(card, 
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: i * 0.15,
              ease: "back.out(1.2)",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }

      // Map animation
      if (mapRef.current) {
        gsap.fromTo(mapRef.current, 
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: mapRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Contact info animation
      if (contactInfoRef.current) {
        gsap.fromTo(contactInfoRef.current, 
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            delay: 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contactInfoRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      setIsInitialLoad(false);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, []);

  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (isInitialLoad) {
        setIsContentVisible(true);
        setIsInitialLoad(false);

        gsap.to([sectionTitleRef.current, ...cardRefs.current, mapRef.current, contactInfoRef.current], {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration: 0.5
        });
      }
    }, 1000);

    return () => clearTimeout(fallbackTimer);
  }, [isInitialLoad]);

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 px-6 md:px-20 py-16 flex flex-col gap-16">
      {/* Section Title */}
      <div ref={sectionTitleRef} className="text-center" style={{ opacity: isContentVisible ? 1 : 0 }}>
        <h2 className="text-4xl font-bold text-blue-900 mb-4">College Resources & Contact</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Access important resources, schedules, and contact information for Zamindar College
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          ref={addToRefs}
          className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-blue-100 group"
          style={{ opacity: isContentVisible ? 1 : 0 }}
        >
          <div className="flex items-center mb-6">
            <div className="p-3 bg-blue-100 rounded-lg mr-4 group-hover:bg-blue-200 transition-colors">
              <ClockIcon className="w-8 h-8 text-blue-900" />
            </div>
            <h3 className="text-2xl font-bold text-blue-900">Time Table</h3>
          </div>
          <ul className="space-y-3">
            {[
              "Class 1 Schedule",
              "Class 2 Schedule", 
              "Class 3 Schedule",
              "Class 4 Schedule",
              "Class 5 Schedule"
            ].map((item, index) => (
              <li key={index} className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                <a href="#" className="text-gray-700 hover:text-blue-700 transition-colors flex items-center">
                  {item}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-4 border-t border-blue-100">
            <a href="#" className="text-blue-900 font-medium hover:text-blue-700 flex items-center group-hover:underline">
              View all schedules
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* New Admission Card */}
        <div
          ref={addToRefs}
          className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-blue-100 group"
          style={{ opacity: isContentVisible ? 1 : 0 }}
        >
          <div className="flex items-center mb-6">
            <div className="p-3 bg-green-100 rounded-lg mr-4 group-hover:bg-green-200 transition-colors">
              <AcademicCapIcon className="w-8 h-8 text-green-700" />
            </div>
            <h3 className="text-2xl font-bold text-green-800">New Admission</h3>
          </div>
          <ul className="space-y-3">
            {[
              "Admission Form",
              "Eligibility Criteria", 
              "Fee Structure",
              "Documents Required",
              "Apply Online"
            ].map((item, index) => (
              <li key={index} className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                <a href="#" className="text-gray-700 hover:text-green-700 transition-colors flex items-center">
                  {item}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-4 border-t border-green-100">
            <a href="#" className="text-green-800 font-medium hover:text-green-600 flex items-center group-hover:underline">
              Admission portal
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
        <div
          ref={addToRefs}
          className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-blue-100 group"
          style={{ opacity: isContentVisible ? 1 : 0 }}
        >
          <div className="flex items-center mb-6">
            <div className="p-3 bg-purple-100 rounded-lg mr-4 group-hover:bg-purple-200 transition-colors">
              <LinkIcon className="w-8 h-8 text-purple-700" />
            </div>
            <h3 className="text-2xl font-bold text-purple-800">Related Links</h3>
          </div>
          <ul className="space-y-3">
            {[
              "Academic Calendar",
              "Faculty Directory", 
              "Library Resources",
              "Exam Results",
              "Student Portal"
            ].map((item, index) => (
              <li key={index} className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                <a href="#" className="text-gray-700 hover:text-purple-700 transition-colors flex items-center">
                  {item}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-4 border-t border-purple-100">
            <a href="#" className="text-purple-800 font-medium hover:text-purple-600 flex items-center group-hover:underline">
              Explore all resources
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Map & Contact Info Section */}
      <div className="w-full flex flex-col md:flex-row gap-10 items-start">
        {/* Map */}
        <div 
          ref={mapRef}
          className="w-full md:w-2/3 h-96 rounded-2xl shadow-xl overflow-hidden border-2 border-white"
          style={{ opacity: isContentVisible ? 1 : 0 }}
        >
          <iframe
            title="College Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3421.123456!2d73.732111!3d32.573333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391e7d12345abcde%3A0x123456789abcdef!2sBhimber%20Road%2C%20Gujrat%2C%20Pakistan!5e0!3m2!1sen!2s!4v1690000000000!5m2!1sen!2s"
            className="w-full h-full"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        {/* Contact Info */}
        <div 
          ref={contactInfoRef}
          className="w-full md:w-1/3 bg-white p-8 rounded-2xl shadow-lg border border-blue-100"
          style={{ opacity: isContentVisible ? 1 : 0 }}
        >
          <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
            <span className="bg-blue-100 p-2 rounded-lg mr-3">
              <MapPinIcon className="w-6 h-6 text-blue-700" />
            </span>
            Contact Information
          </h3>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <MapPinIcon className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-800">Address:</p>
                <p className="text-gray-600">Bhimber Road, GUJRAT, Punjab, Pakistan</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <EnvelopeIcon className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-800">Email:</p>
                <a href="mailto:zamindar.college@gmail.com" className="text-blue-700 hover:underline">
                  zamindar.college@gmail.com
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <PhoneIcon className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-800">Telephone No:</p>
                <ul className="text-gray-600">
                  <li className="hover:text-blue-700 transition-colors">053-9260400</li>
                  <li className="hover:text-blue-700 transition-colors">053-3707408</li>
                  <li className="hover:text-blue-700 transition-colors">053-3707410</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="font-semibold text-gray-800 mb-3">Office Hours:</p>
            <p className="text-gray-600">Monday - Friday: 8:00 AM - 4:00 PM</p>
            <p className="text-gray-600">Saturday: 9:00 AM - 1:00 PM</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;