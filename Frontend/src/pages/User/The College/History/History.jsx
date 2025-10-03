import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const History = () => {
  const headingRef = useRef(null);
  const sliderRef = useRef(null);
  const textRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample images for the slider (replace with actual college images)
  const sliderImages = [
    "https://zamindarcollege.edu.pk/wp-content/uploads/2020/07/IMG-20161221-WA0008-1-1024x576.jpg",
    "https://zamindarcollege.edu.pk/wp-content/uploads/2020/07/Mosque-for-web.jpg",
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [sliderImages.length]);

  useEffect(() => {
    // Animate the heading
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    // Animate the slider
    gsap.fromTo(
      sliderRef.current,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1, delay: 0.5, ease: "power2.out" }
    );

    // Animate the text
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 1, ease: "power2.out" }
    );
  }, []);

  // Manual slide navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 px-4 md:px-8 py-10">
      {/* Animated Heading */}
      <div className="text-center mb-10" ref={headingRef}>
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-4">
          Welcome to Govt Zamindar College, GUJRAT
        </h1>
        <div className="w-20 h-1 bg-indigo-600 mx-auto"></div>
      </div>

      {/* Image Slider */}
      <div className="mb-12" ref={sliderRef}>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 text-center">College Gallery</h2>
        <p className="text-gray-600 mb-6 text-center">Explore our campus through these captivating images</p>
        
        <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-xl shadow-lg mx-auto">
          <div 
            className="flex w-full h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {sliderImages.map((image, index) => (
              <div 
                key={index} 
                className="min-w-full h-full flex items-center justify-center bg-gray-200"
              >
                <img 
                  src={image} 
                  alt={`College ${index + 1}`} 
                  className="w-full h-full object-contain md:object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/1200x600/3B82F6/FFFFFF?text=College+Image";
                  }}
                />
              </div>
            ))}
          </div>
          
          {/* Slider navigation dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {sliderImages.map((_, index) => (
              <button 
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white scale-110' : 'bg-white/50'
                }`}
              ></button>
            ))}
          </div>

          {/* Previous/Next buttons */}
          <button 
            onClick={() => setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length)}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={() => setCurrentSlide((prev) => (prev + 1) % sliderImages.length)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* College History Text */}
      <div className="w-full mx-auto" ref={textRef}>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Our History</h2>
        
        <div className="bg-white p-6 md:p-10 rounded-xl shadow-md">
          <p className="text-gray-700 mb-6 text-lg leading-relaxed">
            Government Zamindar College, Gujrat is a Government college located in Gujrat District, Punjab, Pakistan.
          </p>
          
          <p className="text-gray-700 mb-6 text-lg leading-relaxed">
            Behind the establishment of Govt. Zamindar Postgraduate College Gujrat, we can very clearly see an individual's passionate love for education and training. This individual is Nawab Sir Fazal Ali, whose name will always stand glowing in the history of educational progress and promotion.
          </p>
          
          <p className="text-gray-700 mb-6 text-lg leading-relaxed">
            Inspired by Ali Garh University and its phenomenal contributions towards the educational uplift of the Muslims of the Sub-Continent, Nawab Sir Fazal Ali, dreamed of establishing a similar institution in Gujrat to enlighten the people of this city and its neighboring areas. This dream did not remain only a dream because a vigorous practical struggle of Nawab Sir Fazal Ali worked wonders, and Govt. Zamindar College came into being as a glorious educational institution, having strength and power to produce distinguished individuals, embellished and equipped with extraordinary abilities.
          </p>
          
          <p className="text-gray-700 mb-6 text-lg leading-relaxed">
            The personal credibility of Nawab Sir Fazal Ali, attracted and involved a large number of people in this very noble cause of establishing a grand educational institution. The establishment of "Zamindar Educational Association" was the first step in this regard. The association, headed by Nawab Sir Fazal Ali, proved to be a great platform for the achievement of the supreme objective of spreading education.
          </p>
          
          <p className="text-gray-700 text-lg leading-relaxed">
            The people of Gujrat, realizing the sincerity and commitment of Nawab Sir Fazal Ali, extended their full cooperation. The generous land donations from the people of the village Madina Syedan, and Sabowal furthered this cause and made the destination come nearer and nearer. An agricultural farm in the possession of irrigation department was also specified for the purpose of establishing an educational institution exhibiting grandeur, glory and grace. The glorious efforts of Nawab Sir Fazal Ali resulted in the establishment of Zamindar High School for Boys in 1927. The association proved its effectiveness even more splendidly by laying the foundation of Zamindar College Gujrat in 1937, close to the robustly working school. In 1972, the Government of Pakistan nationalized both the institutions which have been working as public sector institutions since then.
          </p>
        </div>
      </div>
    </div>
  );
};

export default History;