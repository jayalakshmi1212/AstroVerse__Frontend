import React, { useState, useEffect } from "react";
import axios from "../../../utils/axiosInstance";
import { Link } from "react-router-dom";
import { Star, ArrowBigDown, Clock } from 'lucide-react';
import Starsky from "../../../assets/images/Stars.jpg";
import Telescope from "../../../assets/images/telescope.jpg"

const UserCourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:8000/courses/");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-blue-100 to-purple-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 p-8 md:p-12 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img
              src={Starsky}
              alt="Stars in the night sky"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Explore the Cosmos
              </h1>
              <p className="text-indigo-100 mb-6">
                Embark on a journey through the stars with our astronomy courses
              </p>
              <button className="inline-flex items-center px-4 py-2 bg-white text-indigo-600 rounded-full text-sm hover:bg-indigo-100 transition-colors">
                Discover Courses
                <ArrowBigDown className="ml-2 h-4 w-4" />
              </button>
            </div>
            
          </div>
        </div>
      </div>

      {/* Popular Courses Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-indigo-900">Popular Now</h2>
          <Link to="/courses" className="text-sm text-indigo-600 hover:text-indigo-800">
            View All
          </Link>
        </div>
        
        {courses.length === 0 ? (
          <div className="text-center text-indigo-600 font-bold text-lg">
            No courses available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course) => (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="block group"
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="text-sm text-indigo-600 mb-2">{course.category}</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {course.tag_line}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                      <span className="font-bold text-gray-900">${course.price}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mt-2">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">{course.duration}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCourseList;

