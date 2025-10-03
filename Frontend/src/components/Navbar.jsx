import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Refs for dropdowns
  const dropdownRefs = {
    college: useRef(null),
    programs: useRef(null),
    news: useRef(null),
    achievements: useRef(null),
  };

  // GSAP animation for dropdowns
  useEffect(() => {
    Object.keys(dropdownRefs).forEach((key) => {
      const el = dropdownRefs[key].current;
      if (el) {
        if (openDropdown === key) {
          gsap.to(el, {
            height: "auto",
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
            display: "block",
          });
        } else {
          gsap.to(el, {
            height: 0,
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
            display: "none",
          });
        }
      }
    });
  }, [openDropdown]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality here
    console.log("Searching for:", searchQuery);
    // You can redirect to search page or perform search action
  };

  return (
    <>
      {/* Top Section with Logo and Search Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          {/* Image Section */}
          <div className="mb-0 md:mb-0 flex items-center justify-center w-full md:w-1/4">
            <img
              src="https://zamindarcollege.edu.pk/wp-content/uploads/2020/04/GZC-colleg-1-768x84.png"
              alt="Zamindar College Logo"
              className="w-auto h-16 md:h-12 object-contain "
            />
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-1/3">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-900 text-white px-4 py-2 rounded-r-md hover:bg-blue-800 transition duration-200"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-blue-900 text-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          {/* Mobile menu button */}
          <div className="md:hidden flex justify-between items-center py-3">
            <span className="text-xl font-bold">Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Menu Items */}
          <div
            className={`${
              isMobileMenuOpen ? "block" : "hidden"
            } md:flex md:justify-center md:items-center md:gap-6 lg:gap-14 py-4 md:py-0`}
          >
            <Link
              to="/"
              className="block py-2 md:py-4 hover:text-yellow-300 transition duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>

            {/* Dropdown components */}
            {[
              {
                label: "The College",
                key: "college",
                links: [
                  { name: "History of the college", path: "/history" },
                  { name: "prospectus", path: "/prospectus" },
                  { name: "College Principals", path: "/principals" },
                  { name: "Rules & Regulations", path: "/rules" },
                    { name: "Time Table", path: "/timetable" },
                ],
              },
              {
                label: "Programs Offered",
                key: "programs",
                links: [
                  { name: "Undergraduate", path: "/undergraduate" },
                  { name: "Postgraduate", path: "/postgraduate" },
                  { name: "Diplomas", path: "/diplomas" },
                ],
              },
              {
                label: "News",
                key: "news",
                links: [
                  { name: "Notice Board", path: "/notice-board" },
                  { name: "Events Gallery", path: "/events-gallery" },
                  // { name: "Latest Updates", path: "/latest-updates" },
                ],
              },
              {
                label: "Academic Achievements",
                key: "achievements",
                links: [
                  { name: "Board Positions", path: "/board-position" },
                  { name: "University Position", path: "/university-position" },
                  // { name: "Research Highlights", path: "/research" },
                ],
              },
               
            ].map((menu) => (
              <div
                key={menu.key}
                className="relative"
                onMouseEnter={() => setOpenDropdown(menu.key)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  className="w-full text-left py-2 md:py-4 hover:text-yellow-300 transition duration-200 cursor-pointer flex justify-between items-center md:block"
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      setOpenDropdown(
                        openDropdown === menu.key ? null : menu.key
                      );
                    }
                  }}
                >
                  {menu.label}
                  <span className="md:hidden">
                    {openDropdown === menu.key ? "▴" : "▾"}
                  </span>
                  <span className="hidden md:inline">▾</span>
                </button>
                <div
                  ref={dropdownRefs[menu.key]}
                  className="md:absolute left-0 md:top-full mt-0 md:mt-2 w-full md:w-52 bg-white text-black rounded-lg shadow-lg overflow-hidden"
                  style={{ height: 0, opacity: 0, display: "none" }}
                >
                  {menu.links.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="block px-4 py-2 hover:bg-gray-200 transition"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Single links */}
            <Link
              to="/faculty"
              className="block py-2 md:py-4 hover:text-yellow-300 transition duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Faculty
            </Link>
            <Link
              to="/examination"
              className="block py-2 md:py-4 hover:text-yellow-300 transition duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Examination & Results
            </Link>
              <Link
              to="/fee-submission"
              className="block py-2 md:py-4 hover:text-yellow-300 transition duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Fee Submission
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
