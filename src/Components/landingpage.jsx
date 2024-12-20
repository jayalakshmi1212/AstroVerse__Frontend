import React from 'react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900 text-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <a href="/" className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-2xl font-bold">AstroVerse</span>
          </a>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#courses" className="hover:text-purple-300">Courses</a>
            <a href="#about" className="hover:text-purple-300">About</a>
            <a href="#contact" className="hover:text-purple-300">Contact</a>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
              Sign Up
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Explore the Universe <br />
              <span className="text-purple-400">in a new way</span>
            </h1>
            <p className="text-lg text-gray-300">
              Join our interactive astronomy learning platform and discover the wonders of space
              through expert-led courses and immersive experiences.
            </p>
            <div className="flex gap-4">
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded">
                Get Started
              </button>
              <button className="border border-purple-600 text-purple-300 hover:bg-purple-800 font-bold py-2 px-6 rounded">
                Watch Demo
              </button>
            </div>
          </div>
          <div className="relative">
            <img
              src="/placeholder.svg?height=500&width=500"
              alt="Space visualization"
              className="rounded-2xl w-full h-auto"
            />
            <div className="absolute -bottom-6 -left-6 bg-purple-800 rounded-xl p-4 shadow-xl">
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-bold">4.9/5</span>
                <span className="text-sm text-gray-300">(2.5k Reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-purple-800 bg-opacity-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Search Courses</h2>
          <div className="max-w-2xl mx-auto relative">
            <input
              type="search"
              placeholder="Search for astronomy courses..."
              className="w-full bg-white bg-opacity-10 border border-purple-600 rounded-full py-3 px-5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
            <button className="absolute right-3 top-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">Featured Online Learning</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {["Solar System Basics", "Deep Space Exploration", "Astrophotography", "Celestial Navigation"].map((course, index) => (
            <div key={index} className="bg-purple-800 bg-opacity-30 rounded-xl p-4 hover:bg-opacity-50 transition duration-300">
              <div className="aspect-video relative mb-4">
                <img
                  src={`/placeholder.svg?height=200&width=300&text=${encodeURIComponent(course)}`}
                  alt={course}
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>
              <h3 className="font-semibold mb-2">{course}</h3>
              <div className="flex items-center justify-between text-sm text-gray-300">
                <span>4 weeks</span>
                <span>Beginner</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Courses */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">Popular Courses</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Introduction to Astronomy", price: "$49.99", lessons: "12 lessons" },
            { title: "Planetary Science", price: "$59.99", lessons: "15 lessons" },
            { title: "Space Exploration History", price: "$44.99", lessons: "10 lessons" }
          ].map((course, index) => (
            <div key={index} className="bg-gradient-to-br from-purple-800 to-indigo-800 rounded-xl p-6">
              <div className="aspect-video relative mb-4">
                <img
                  src={`/placeholder.svg?height=200&width=300&text=${encodeURIComponent(course.title)}`}
                  alt={course.title}
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>
              <h3 className="font-semibold mb-2">{course.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-purple-400 font-bold">{course.price}</span>
                <span className="text-sm text-gray-300">{course.lessons}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Teacher Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-purple-800 bg-opacity-30 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Become a Certified Teacher</h2>
              <p className="text-gray-300">
                Share your astronomy knowledge with students worldwide. Join our platform as an instructor
                and help others explore the cosmos.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                  <span>Create engaging astronomy courses</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>Earn from your expertise</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                  </svg>
                  <span>Join a global community of space enthusiasts</span>
                </li>
              </ul>
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded">
                Start Teaching
              </button>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=400&text=Teacher"
                alt="Teacher"
                className="rounded-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-800 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <a href="/" className="flex items-center space-x-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLineJoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-xl font-bold">AstroVerse</span>
              </a>
              <p className="text-sm text-gray-400">
                Your gateway to understanding the cosmos
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-purple-400">About Us</a></li>
                <li><a href="#" className="hover:text-purple-400">Courses</a></li>
                <li><a href="#" className="hover:text-purple-400">Teachers</a></li>
                <li><a href="#" className="hover:text-purple-400">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-purple-400">Help Center</a></li>
                <li><a href="#" className="hover:text-purple-400">Terms of Service</a></li>
                <li><a href="#" className="hover:text-purple-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-purple-400">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Email: hello@astroverse.com</li>
                <li>Phone: (555) 123-4567</li>
                <li>Address: 123 Space Street</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-purple-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} AstroVerse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

