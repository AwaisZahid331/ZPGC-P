import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { XMarkIcon } from "@heroicons/react/24/solid";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const scrollRef = useRef(null);
  const eventsRef = useRef(null);
  const eventsTableRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Gallery images
  const galleryImages = [
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
  ];

  const newsItems = [
    "Admissions Open for Fall 2025!",
    "New Research Center Inaugurated by Principal",
    "College Ranked Among Top 10 Institutions Nationwide",
    "Annual Sports Festival Scheduled for December",
  ];

  // Event data with detailed information
  const events = [
    {
      id: 1,
      title: "Guest Lecture on Modern Education Trends",
      date: "Oct 15, 2025",
      time: "10:00 AM - 12:00 PM",
      location: "Main Auditorium",
      description: "Join us for an insightful lecture by Dr. Sarah Johnson on the latest trends in modern education and how they're shaping the future of learning.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
      speaker: "Dr. Sarah Johnson, Education Specialist"
    },
    {
      id: 2,
      title: "Science Exhibition",
      date: "Nov 5, 2025",
      time: "9:00 AM - 4:00 PM",
      location: "Science Block",
      description: "Explore innovative projects created by our students in the annual science exhibition. Categories include robotics, environmental science, and biotechnology.",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80",
      speaker: "Various Student Presenters"
    },
    {
      id: 3,
      title: "Annual Cultural Fest",
      date: "Dec 10, 2025",
      time: "11:00 AM - 8:00 PM",
      location: "College Grounds",
      description: "Experience the vibrant diversity of our college community at the annual cultural festival. Featuring music, dance, food, and art from different cultures.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80",
      speaker: "Cultural Society"
    },
    {
      id: 4,
      title: "Career Counseling Workshop",
      date: "Jan 8, 2026",
      time: "2:00 PM - 4:00 PM",
      location: "Career Center",
      description: "Get expert advice on career planning and job search strategies from industry professionals.",
      image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80",
      speaker: "Industry Professionals"
    },
    {
      id: 5,
      title: "Tech Symposium",
      date: "Feb 12, 2026",
      time: "9:00 AM - 5:00 PM",
      location: "Tech Hub",
      description: "A day-long event showcasing the latest technological innovations and research from students and faculty.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
      speaker: "Tech Department Faculty"
    },
    {
      id: 6,
      title: "Alumni Meet",
      date: "Mar 20, 2026",
      time: "6:00 PM - 9:00 PM",
      location: "College Lawn",
      description: "Annual gathering of alumni to reconnect and network with current students and faculty.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80",
      speaker: "Alumni Association"
    }
  ];

  // Scroll-trigger animations
  useEffect(() => {
    gsap.set([leftRef.current, rightRef.current, eventsRef.current], { visibility: "visible" });

    // Left section animation
    gsap.fromTo(
      leftRef.current,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: leftRef.current,
          start: "top 80%",
        },
      }
    );

    // Right section animation
    gsap.fromTo(
      rightRef.current,
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rightRef.current,
          start: "top 80%",
        },
      }
    );

    // Events animation
    gsap.fromTo(
      eventsRef.current.children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: eventsRef.current,
          start: "top 85%",
        },
      }
    );

    // Smooth horizontal scroll for news ticker
    gsap.to(scrollRef.current, {
      xPercent: -50,
      repeat: -1,
      duration: 25,
      ease: "linear",
    });

    // Animation for events table rows (for the additional events that appear on scroll)
    if (eventsTableRef.current) {
      const additionalEvents = Array.from(eventsTableRef.current.children).slice(3);
      
      gsap.set(additionalEvents, { opacity: 0, y: 20 });
      
      ScrollTrigger.create({
        trigger: eventsTableRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.to(additionalEvents, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
          });
        }
      });
    }
  }, []);

  // Smooth fade transition for gallery images
  useEffect(() => {
    const interval = setInterval(() => {
      gsap.to(leftRef.current.firstChild, {
        opacity: 0,
        duration: 1.5,
        onComplete: () => {
          setCurrentImage((prev) => (prev + 1) % galleryImages.length);
          gsap.fromTo(
            leftRef.current.firstChild,
            { opacity: 0 },
            { opacity: 1, duration: 1.5 }
          );
        },
      });
    }, 4000); // every 4 sec
    return () => clearInterval(interval);
  }, [galleryImages.length]);

  const openEventModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <section className="w-full min-h-screen flex flex-col md:flex-row  from-blue-50 to-indigo-50 px-6 md:px-20 py-12 gap-12">
      {/* Left Section - Gallery */}
      <div className="w-full md:w-1/2 flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">College Gallery</h2>
        <p className="text-gray-600 mb-4">Explore our campus through these captivating images</p>
        <div
          ref={leftRef}
          className="w-full h-72 relative rounded-2xl shadow-xl overflow-hidden flex items-center justify-center visibility-hidden"
        >
          <img
            src={galleryImages[currentImage]}
            alt={`Gallery ${currentImage + 1}`}
            className="w-full h-full object-cover rounded-2xl transition-all duration-500"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <p className="text-white text-sm">Image {currentImage + 1} of {galleryImages.length}</p>
          </div>
        </div>
        
        {/* Gallery indicators */}
        <div className="flex justify-center gap-2">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentImage ? 'bg-blue-900 scale-125' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentImage(index)}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Right Section - Latest News */}
      <div
        ref={rightRef}
        className="w-full md:w-1/2 flex flex-col gap-6 visibility-hidden"
      >
        <h2 className="text-3xl font-bold text-gray-800">Latest News & Updates</h2>
        <p className="text-gray-600 leading-relaxed">
          Stay updated with the latest happenings, announcements, and events at our college.
        </p>

        {/* Scrolling News Ticker */}
        <div className="relative overflow-hidden h-12 bg-white rounded-xl shadow-md border border-blue-100">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent w-16 z-10"></div>
          <div className="absolute inset-y-0 right-0 bg-gradient-to-l from-blue-50 to-transparent w-16 z-10"></div>
          <div
            ref={scrollRef}
            className="absolute flex gap-8 whitespace-nowrap items-center h-full"
          >
            {newsItems.map((news, idx) => (
              <div
                key={idx}
                className="flex items-center text-blue-900 font-medium text-lg px-4 py-1 rounded transition-all duration-300 hover:text-blue-700 cursor-pointer"
              >
                <span className="w-2 h-2 bg-blue-900 rounded-full mr-2"></span>
                {news}
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events Table */}
        <div ref={eventsRef} className="mt-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Events</h3>
          <div ref={eventsTableRef} className="bg-white rounded-xl shadow-md border border-blue-50 overflow-hidden">
            <table className="w-full">
              <thead className="bg-blue-50">
                <tr>
                  <th className="p-3 text-left text-blue-900 font-semibold">Event</th>
                  <th className="p-3 text-left text-blue-900 font-semibold">Date</th>
                  <th className="p-3 text-left text-blue-900 font-semibold">Location</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr 
                    key={event.id}
                    onClick={() => openEventModal(event)}
                    className={`border-t border-blue-100 cursor-pointer transition-all duration-300 hover:bg-blue-50 ${
                      index >= 3 ? "opacity-0" : ""
                    }`}
                  >
                    <td className="p-3 font-medium text-blue-900">{event.title}</td>
                    <td className="p-3 text-gray-600">{event.date}</td>
                    <td className="p-3 text-gray-600">{event.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-2 text-center">Scroll down to view more events</p>
        </div>
      </div>

      {/* Event Detail Modal */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center rounded-t-xl">
              <h2 className="text-xl font-bold text-blue-900">{selectedEvent.title}</h2>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-semibold text-blue-900">{selectedEvent.date}</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="font-semibold text-blue-900">{selectedEvent.time}</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-semibold text-blue-900">{selectedEvent.location}</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Speaker</p>
                  <p className="font-semibold text-blue-900">{selectedEvent.speaker}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Event Description</h3>
                <p className="text-gray-700">{selectedEvent.description}</p>
              </div>
              
              <button className="w-full bg-blue-900 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors">
                Register for this Event
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default About;