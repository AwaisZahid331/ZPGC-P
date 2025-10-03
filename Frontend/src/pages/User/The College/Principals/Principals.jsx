import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ColumnsPhotoAlbum } from "react-photo-album";
import "react-photo-album/columns.css";

const Principals = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const headerRef = useRef(null);
  const galleryRef = useRef(null);

  // Principals photos data for the album
  const principalsPhotos = [
    {
      src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      width: 800,
      height: 600,
      alt: "Dr. Muhammad Ali Khan - Current Principal",
      title: "Dr. Muhammad Ali Khan\n(2020 - Present)"
    },
    {
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      width: 600,
      height: 800,
      alt: "Prof. Ahmed Raza - Former Principal",
      title: "Prof. Ahmed Raza\n(2015 - 2020)"
    },
    {
      src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
      width: 700,
      height: 500,
      alt: "Dr. Fatima Shah - Former Principal",
      title: "Dr. Fatima Shah\n(2010 - 2015)"
    },
    {
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
      width: 900,
      height: 600,
      alt: "Mr. Abdul Qadir - Former Principal",
      title: "Mr. Abdul Qadir\n(2005 - 2010)"
    },
    {
      src: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      width: 600,
      height: 400,
      alt: "Dr. Hassan Mahmood - Former Principal",
      title: "Dr. Hassan Mahmood\n(2000 - 2005)"
    },
    {
      src: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
      width: 700,
      height: 1000,
      alt: "Prof. Naveed Akhtar - Former Principal",
      title: "Prof. Naveed Akhtar\n(1995 - 2000)"
    },
    {
      src: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      width: 800,
      height: 500,
      alt: "Dr. Asma Khalid - Former Principal",
      title: "Dr. Asma Khalid\n(1990 - 1995)"
    },
    {
      src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      width: 600,
      height: 900,
      alt: "Mr. Javed Iqbal - Former Principal",
      title: "Mr. Javed Iqbal\n(1985 - 1990)"
    },
    {
      src: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
      width: 700,
      height: 700,
      alt: "Dr. Saima Riaz - Former Principal",
      title: "Dr. Saima Riaz\n(1980 - 1985)"
    },
    {
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      width: 800,
      height: 600,
      alt: "Prof. Khalid Mehmood - Former Principal",
      title: "Prof. Khalid Mehmood\n(1975 - 1980)"
    },
    {
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      width: 500,
      height: 750,
      alt: "Dr. Nasir Ahmed - Founding Principal",
      title: "Dr. Nasir Ahmed\n(1970 - 1975)"
    },
    {
      src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
      width: 900,
      height: 600,
      alt: "College Leadership Team",
      title: "Leadership Conference\n2023"
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

    // Gallery animation
    tl.fromTo(galleryRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );

    // Animate individual photo items
    tl.fromTo(".photo-item",
      { scale: 0.8, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 0.6, 
        stagger: 0.1,
        ease: "back.out(1.7)" 
      },
      "-=0.3"
    );
  }, []);

  // Handle image click
  const handleImageClick = (photo) => {
    setSelectedImage(photo);
    
    // Animate modal opening
    gsap.fromTo(".modal-overlay",
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    );
    
    gsap.fromTo(".modal-content",
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
    );
  };

  // Close modal
  const closeModal = () => {
    gsap.to(".modal-content",
      { scale: 0.8, opacity: 0, duration: 0.3 }
    );
    
    gsap.to(".modal-overlay",
      { opacity: 0, duration: 0.3, onComplete: () => {
        setSelectedImage(null);
      }}
    );
  };

  // Custom renderer for photo items
  const renderPhoto = ({ photo, layout, layoutOptions, imageProps: { alt, title, ...restImageProps } }) => (
    <div 
      className="photo-item relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-300"
      onClick={() => handleImageClick(photo)}
      style={{
        width: layout.width,
        height: layout.height,
      }}
    >
      <img
        {...restImageProps}
        src={photo.src}
        alt={photo.alt}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <div className="text-white">
          <div className="text-sm font-semibold whitespace-pre-line">{photo.title}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 md:px-8">
      {/* Header Section */}
      <div ref={headerRef} className="text-center mb-16">
        <h1 className="text-5xl font-bold text-indigo-900 mb-4">College Principals Gallery</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A visual journey through the legacy of our esteemed principals who have shaped the college's history
        </p>
        <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Photo Album Gallery */}
      <div ref={galleryRef} className="max-w-7xl mx-auto">
        <ColumnsPhotoAlbum
          photos={principalsPhotos}
          columns={(containerWidth) => {
            if (containerWidth < 768) return 2;
            if (containerWidth < 1024) return 3;
            return 4;
          }}
          spacing={12}
          padding={0}
          renderPhoto={renderPhoto}
        />
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="modal-overlay fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="modal-content bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-2xl font-bold text-gray-800">
                {selectedImage.alt}
              </h3>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl transition-colors duration-200"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <div className="relative">
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.alt}
                  className="w-full h-96 object-contain rounded-lg"
                />
              </div>
              
              <div className="mt-4 text-center">
                <div className="text-lg font-semibold text-gray-800 whitespace-pre-line">
                  {selectedImage.title}
                </div>
                <p className="text-gray-600 mt-2">
                  Click outside or press ESC to close
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="text-center mt-16 text-gray-600">
        <p className="text-lg">
          Explore the rich history of leadership at Government Zamindar College, Gujrat
        </p>
        <p className="text-sm mt-2">
          {principalsPhotos.length} memorable moments captured
        </p>
      </div>
    </div>
  );
};

export default Principals;