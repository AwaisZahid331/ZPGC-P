import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const departmentsData = [
  {
    id: "physics",
    title: "Physics Department",
    desc: "Strong focus on theoretical & experimental physics. Lab facilities and research projects available.",
    teachers: [
      { name: "Dr. Ayesha Khan", title: "Professor", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=60" },
      { name: "Mr. Salman Riaz", title: "Assistant Professor", img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=400&q=60" },
      { name: "Ms. Noor Fatima", title: "Lecturer", img: "https://images.unsplash.com/photo-1545996124-1b5f8b6b0f30?auto=format&fit=crop&w=400&q=60" },
    ],
  },
  {
    id: "chemistry",
    title: "Chemistry Department",
    desc: "Industry-connected curriculum with well-equipped chemical labs and safety protocols.",
    teachers: [
      { name: "Dr. Imran Shah", title: "Associate Professor", img: "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?auto=format&fit=crop&w=400&q=60" },
      { name: "Ms. Sana Tariq", title: "Senior Lecturer", img: "https://images.unsplash.com/photo-1545996103-0f8d5b271d0b?auto=format&fit=crop&w=400&q=60" },
      { name: "Mr. Bilal Ahmed", title: "Lecturer", img: "https://images.unsplash.com/photo-1544005317-ec3a67c0f0b1?auto=format&fit=crop&w=400&q=60" },
    ],
  },
  {
    id: "computer",
    title: "Computer Science",
    desc: "Modern CS curriculum covering algorithms, web, and AI; project-based learning.",
    teachers: [
      { name: "Dr. Sana Malik", title: "Head of Department", img: "https://images.unsplash.com/photo-1545996124-1b5f8b6b0f30?auto=format&fit=crop&w=400&q=60" },
      { name: "Mr. Omar Farooq", title: "Assistant Professor", img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=400&q=60" },
      { name: "Ms. Amina Iqbal", title: "Lecturer", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=60" },
    ],
  },
];

export default function Faculty() {
  const heroRef = useRef(null);
  const deptRefs = useRef([]);
  deptRefs.current = [];

  const addToRefs = (el) => {
    if (el && !deptRefs.current.includes(el)) {
      deptRefs.current.push(el);
    }
  };

  useEffect(() => {
    // Hero animation on mount
    const hero = heroRef.current;
    gsap.fromTo(
      hero,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: "power3.out" }
    );

    // Stagger departments animation on scroll
    deptRefs.current.forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          delay: i * 0.15,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // animate teacher cards inside each department slightly
      const teachers = el.querySelectorAll(".teacher-card");
      gsap.fromTo(
        teachers,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <main className="w-full bg-gray-50 min-h-screen">
      {/* HERO */}
      <section
        ref={heroRef}
        className="w-full bg-gradient-to-r from-white via-blue-50 to-white py-12 md:py-20"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* left text */}
            <div className="md:w-7/12">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 leading-tight">
                Faculty & Departments
              </h1>
              <p className="mt-4 text-gray-600 max-w-2xl">
                Meet our experienced faculty members across departments — dedicated to teaching,
                research and mentoring students. Each department blends strong academics with
                hands-on labs and project work.
              </p>
              <div className="mt-6 flex gap-3">
                <a
                  href="#departments"
                  className="inline-block bg-blue-900 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-800 transition"
                >
                  View Departments
                </a>
                <a
                  href="#contact"
                  className="inline-block border border-blue-900 text-blue-900 px-5 py-2 rounded-lg hover:bg-blue-50 transition"
                >
                  Contact Faculty
                </a>
              </div>
            </div>

            {/* right hero image */}
            <div className="md:w-5/12">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80"
                  alt="Faculty group"
                  className="object-cover w-full h-56 md:h-64"
                />
                <div className="absolute bottom-4 left-4 bg-blue-900 text-white px-3 py-1 rounded-full text-sm shadow">
                  Quality Education
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section id="departments" className="container mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Departments</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {departmentsData.map((dept) => (
            <article
              key={dept.id}
              ref={addToRefs}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold text-gray-800">{dept.title}</h3>
              <p className="text-gray-600 mt-2 text-sm">{dept.desc}</p>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Faculty Members</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {dept.teachers.map((t, i) => (
                    <div
                      key={t.name + i}
                      className="teacher-card flex items-center gap-3 p-2 rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition"
                    >
                      <img
                        src={t.img}
                        alt={t.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-sm font-semibold text-gray-800">{t.name}</div>
                        <div className="text-xs text-gray-500">{t.title}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <a
                    href={`/faculty/${dept.id}`}
                    className="text-sm inline-block text-blue-900 hover:underline"
                  >
                    View full {dept.title.split(" ")[0]} profile →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* animated CTA / small carousel of highlights */}
      <section className="container mx-auto px-6 py-10">
        <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl p-6 shadow-inner flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Faculty Achievements</h3>
            <p className="text-sm text-gray-600 mt-1">Recent publications, awards and completed research projects.</p>
          </div>

          <div className="flex gap-4">
            <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
              <div className="text-xl font-bold text-blue-900">12</div>
              <div className="text-xs text-gray-500">Publications (2024)</div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
              <div className="text-xl font-bold text-blue-900">8</div>
              <div className="text-xs text-gray-500">Research Grants</div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
              <div className="text-xl font-bold text-blue-900">5</div>
              <div className="text-xs text-gray-500">Awards</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / CTA */}
      <section id="contact" className="container mx-auto px-6 py-10">
        <div className="bg-white rounded-xl p-6 shadow-md flex flex-col md:flex-row gap-6 items-center">
          <div className="md:w-3/4">
            <h3 className="text-lg font-semibold text-gray-800">Want to contact a faculty member?</h3>
            <p className="text-gray-600 text-sm mt-2">Email the department office or use the contact form to reach faculty directly.</p>
          </div>
          <div className="md:w-1/4 flex gap-3">
            <a href="/contact" className="bg-blue-900 text-white px-4 py-2 rounded-lg">Contact Office</a>
            <a href="/faculty" className="border border-blue-900 text-blue-900 px-4 py-2 rounded-lg">All Faculty</a>
          </div>
        </div>
      </section>
    </main>
  );
}