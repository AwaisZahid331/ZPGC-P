import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowRightIcon, XMarkIcon } from "@heroicons/react/24/solid";

const Home = () => {
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const statsRef = useRef(null);
  const messageRef = useRef(null);
  const nameRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    gsap.set([imageRef.current, textRef.current, statsRef.current, nameRef.current], {
      visibility: "visible",
    });

    // Image animation - slides from left with rotation
    gsap.fromTo(
      imageRef.current,
      { x: -100, opacity: 0, rotation: -5 },
      {
        x: 0,
        opacity: 1,
        rotation: 0,
        duration: 1.2,
        ease: "power3.out",
      }
    );

    // Name animation - fades in
    gsap.fromTo(
      nameRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
      }
    );

    // Text animation - fades in with slight vertical movement
    gsap.fromTo(
      textRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        delay: 0.8,
        ease: "power3.out",
      }
    );

    // Stats animation - staggered fade in
    gsap.fromTo(
      statsRef.current.children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 1.2,
        stagger: 0.15,
        ease: "back.out(1.7)",
      }
    );

    // Message drop down animation
    if (messageRef.current) {
      gsap.fromTo(messageRef.current,
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          delay: 0.6,
          ease: "bounce.out"
        }
      );
    }
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <section className="w-full min-h-[92vh] flex items-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-6 md:px-16 lg:px-24 py-10 relative overflow-hidden">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left Image with Name and Title Below */}
          <div className="w-full lg:w-2/5 flex flex-col items-center">
            <div className="flex justify-center relative">
              <div
                ref={imageRef}
                className="visibility-hidden w-56 h-72 md:w-72 md:h-88 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl transform rotate-3"></div>
                <img
                  src="https://zamindarcollege.edu.pk/wp-content/uploads/2025/03/hafiz-ihsan-ul-haq-256x300.jpeg"
                  alt="Principal"
                  className="relative z-10 rounded-2xl shadow-2xl object-cover w-full h-full border-4 border-white"
                />
                <div className="absolute -bottom-4 -right-4 h-16 w-16 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xs z-20 shadow-lg">
                  Principal
                </div>
              </div>
            </div>
            
            {/* Name and Title Below Image */}
            <div 
              ref={nameRef}
              className="visibility-hidden text-center mt-6"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                Dr. <span className="text-blue-900">Hafiz Ihsan Ul Haq</span>
              </h2>
              <div className="h-1 w-16 bg-blue-900 mb-3 mx-auto"></div>
              <h3 className="text-lg md:text-xl text-blue-700 font-semibold">
                Leading Our College Towards Excellence
              </h3>
            </div>
          </div>

          {/* Right Text Content */}
          <div
            ref={textRef}
            className="w-full lg:w-3/5 flex flex-col gap-4 visibility-hidden relative"
          >
            {/* Animated Principal Message Banner */}
            <div 
              ref={messageRef}
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-6 rounded-lg shadow-lg mb-4 overflow-hidden"
            >
              <div className="flex items-center">
                <div className="bg-white bg-opacity-20 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Principal's Message</h4>
                  <p className="text-sm opacity-90">Education is the most powerful weapon which you can use to change the world</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Govt Zamindar PG College is a Public Sector College in Gujrat City, providing quality education to students of Gujrat and its surroundings. For almost eight decades of glorious educational services, it deserves recognition as an exceptional benefactor.
              </p>

              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                In an age of mushrooming private colleges with mesmerizing facilities, this college maintains its grace and dignity with robust contribution. The civil society of Gujrat has always reposed its confidence in this institution...
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-1">
              <button 
                onClick={openModal}
                className="bg-blue-900 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl font-medium text-sm"
              >
                Read More <ArrowRightIcon className="w-4 h-4" />
              </button>

              <button className="border-2 border-blue-900 text-blue-900 px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-900 hover:text-white transition-all duration-300 font-medium text-sm">
                Contact Office
              </button>
            </div>

            {/* Statistics Section */}
            <div
              ref={statsRef}
              className="mt-6 flex flex-wrap gap-4 md:gap-6 visibility-hidden"
            >
              <div className="text-center bg-white p-3 rounded-xl shadow-md min-w-[100px]">
                <div className="text-xl md:text-2xl font-bold text-blue-900">15+</div>
                <div className="text-gray-600 text-xs mt-1">Years Experience</div>
              </div>
              <div className="text-center bg-white p-3 rounded-xl shadow-md min-w-[100px]">
                <div className="text-xl md:text-2xl font-bold text-blue-900">1000+</div>
                <div className="text-gray-600 text-xs mt-1">Students Mentored</div>
              </div>
              <div className="text-center bg-white p-3 rounded-xl shadow-md min-w-[100px]">
                <div className="text-xl md:text-2xl font-bold text-blue-900">25+</div>
                <div className="text-gray-600 text-xs mt-1">Awards Received</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center rounded-t-xl">
              <h2 className="text-2xl font-bold text-blue-900">Principal's Message</h2>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="w-full md:w-1/3 flex justify-center">
                  <img
                    src="https://zamindarcollege.edu.pk/wp-content/uploads/2025/03/hafiz-ihsan-ul-haq-256x300.jpeg"
                    alt="Principal"
                    className="rounded-2xl shadow-lg object-cover w-48 h-56 border-4 border-blue-100"
                  />
                </div>
                
                <div className="w-full md:w-2/3">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Dr. Hafiz Ihsan Ul Haq</h3>
                  <p className="text-blue-700 font-medium mb-4">Principal, Govt Zamindar PG College</p>
                  
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <p className="text-sm text-blue-800 italic">
                      "Education is not the filling of a pail, but the lighting of a fire. 
                      We strive to ignite the passion for learning in every student."
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p>
                  Govt Zamindar PG College is a Public Sector College in Gujrat City, providing 
                  low-cost education to the students of Gujrat and its surroundings. As an educational 
                  institution, Govt. Zamindar Postgraduate College, Gujrat stands lustrous, signalized, 
                  and distinctly noticeable.
                </p>
                
                <p>
                  For almost eight decades of glorious educational services, it deserves the words 
                  to be used for any exceptional benefactor. The dispensation of knowledge and 
                  enlightenment from its rooms is recognized by millions.
                </p>
                
                <p>
                  In an age of the mushroom production of private colleges, equipped with the 
                  mesmerizing facilities, this college maintains its grace and dignity with a 
                  robust contribution. The civil society of Gujrat city and of its surrounding 
                  areas has always reposed its confidence in this institution by ceaselessly 
                  granting it the status of a messiah.
                </p>
                
                <p>
                  Our commitment to academic excellence, character building, and holistic development 
                  of students remains unwavering. We continue to adapt to changing educational 
                  landscapes while maintaining the core values that have defined our institution 
                  for generations.
                </p>
                
                <p className="font-medium text-blue-900">
                  We welcome you to be part of our continuing journey toward excellence in education.
                </p>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  For any queries, please contact the principal's office at: 
                  <span className="text-blue-900 font-medium"> principal@zamindarcollege.edu.pk</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;