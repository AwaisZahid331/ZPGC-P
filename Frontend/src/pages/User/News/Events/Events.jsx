import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const Events = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const headerRef = useRef(null);
  const sliderRef = useRef(null);
  const timelineRef = useRef(null);
  const timelineContentRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  // Events data
  const eventsData = [
    {
      id: 1,
      title: "Intermediate Admissions [3rd Merit List]",
      date: "October 7, 2020",
      category: "Admissions",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "BS Admissions - Session 2020 [Form submission]",
      date: "October 5, 2020",
      category: "Admissions",
      image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "UOG Announced Exam Schedule Date for BA/Bsc/B-com",
      date: "September 4, 2020",
      category: "Examinations",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      title: "Annual Sports Gala 2020",
      date: "August 25, 2020",
      category: "Sports",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 5,
      title: "Science Exhibition 2020",
      date: "August 20, 2020",
      category: "Academic",
      image: "https://images.unsplash.com/photo-1582582494705-f8ce0b0c24f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 6,
      title: "Cultural Festival 2020",
      date: "August 15, 2020",
      category: "Cultural",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  // Duplicate events for seamless loop
  const duplicatedEvents = [...eventsData, ...eventsData, ...eventsData];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % eventsData.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [eventsData.length]);

  useEffect(() => {
    const timelineContainer = timelineRef.current;
    const timelineContent = timelineContentRef.current;

    if (timelineContainer && timelineContent) {
      let scrollPos = 0;
      const scrollSpeed = 0.5; 
      let animationId;

      const smoothScroll = () => {
        scrollPos += scrollSpeed;
     
        if (scrollPos >= timelineContent.scrollHeight / 3) {
          scrollPos = 0;
        }
        
        timelineContainer.scrollTop = scrollPos;
        animationId = requestAnimationFrame(smoothScroll);
      };

      // Start smooth scrolling
      animationId = requestAnimationFrame(smoothScroll);

      // Cleanup function
      return () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
      };
    }
  }, []);

  // GSAP Animations
  useEffect(() => {
    const tl = gsap.timeline();

    // Header animation
    tl.fromTo(headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Slider animation
    tl.fromTo(sliderRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );

    // Timeline animation
    tl.fromTo(".timeline-item",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.7)" },
      "-=0.3"
    );
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % eventsData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + eventsData.length) % eventsData.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 md:px-8">
      {/* Header Section */}
      <div ref={headerRef} className="text-center mb-12">
        <h1 className="text-5xl font-bold text-indigo-900 mb-4">
          Events Gallery
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Memorable events and activities at Government Zamindar College, Gujrat
        </p>
        <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Left Side - Image Slider */}
          <div ref={sliderRef} className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-indigo-900 mb-6 text-center">
              Event Gallery
            </h2>
            
            <div className="relative overflow-hidden rounded-xl mb-4">
              <div className="relative h-80">
                <img 
                  src={eventsData[currentSlide].image} 
                  alt={eventsData[currentSlide].title}
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-2">{eventsData[currentSlide].title}</h3>
                    <p className="text-blue-200">{eventsData[currentSlide].date}</p>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200"
              >
                ‹
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200"
              >
                ›
              </button>

              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {eventsData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'bg-white scale-110' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-3 gap-2">
              {eventsData.map((event, index) => (
                <button
                  key={event.id}
                  onClick={() => setCurrentSlide(index)}
                  className={`relative overflow-hidden rounded-lg h-20 transition-all duration-300 ${
                    index === currentSlide ? 'ring-2 ring-indigo-500 scale-105' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Smooth Infinite Scroll Timeline */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-indigo-900 mb-6 text-center">
              Events Timeline
            </h2>
            
            <div 
              ref={timelineRef}
              className="h-96 overflow-hidden relative"
            >
              <div 
                ref={timelineContentRef}
                className="space-y-4"
              >
                {duplicatedEvents.map((event, index) => (
                  <div 
                    key={`${event.id}-${index}`}
                    className="timeline-item bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 border-l-4 border-indigo-400 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-indigo-900 text-lg">{event.title}</h3>
                      <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                        {event.date}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{event.category}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Completed
                    </div>
                  </div>
                ))}
              </div>

              {/* Gradient overlay for smooth edges */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
            </div>

            {/* Quick Info */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg border border-indigo-200">
              <div className="text-center">
                <h4 className="font-semibold text-indigo-900 mb-2">2020 Events Summary</h4>
                <p className="text-sm text-gray-600">{eventsData.length} memorable events conducted</p>
              </div>
            </div>
          </div>
        </div>

        {/* Simple Footer */}
        <div className="text-center mt-8">
          <div className="bg-white rounded-xl shadow-sm p-6 inline-block">
            <p className="text-gray-600">
              Government Zamindar College, Gujrat • Events Department
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;