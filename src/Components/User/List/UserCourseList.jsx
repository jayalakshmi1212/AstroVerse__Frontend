import React, { useState, useEffect } from "react";
import axios from "../../../utils/axiosInstance";
import { Link } from "react-router-dom";
import { Star, ArrowBigDown, Clock, Search } from 'lucide-react';
import Starsky from "../../../assets/images/Stars.jpg";

const UserCourseList = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [categories, setCategories] = useState([]); // State for dynamic categories
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/courses/");
        const fetchedCourses = response.data.courses;
        
        setCourses(fetchedCourses);
        setFilteredCourses(fetchedCourses);

        // Extract unique categories from courses
        const uniqueCategories = [
          ...new Set(fetchedCourses.map((course) => course.category)),
        ];
        setCategories(uniqueCategories); // Set unique categories in state
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const filtered = courses.filter((course) => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === "all" || course.category === categoryFilter;
      const matchesDifficulty = difficultyFilter === "all" || course.difficulty === difficultyFilter;
      const matchesPrice = priceFilter === "all" || (
        priceFilter === "0-50" && course.price <= 50 ||
        priceFilter === "51-100" && course.price > 50 && course.price <= 100 ||
        priceFilter === "101+" && course.price > 100
      );

      return matchesSearch && matchesCategory && matchesDifficulty && matchesPrice;
    });

    setFilteredCourses(filtered);
  }, [courses, searchQuery, categoryFilter, difficultyFilter, priceFilter]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

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
              src={Starsky || "/placeholder.svg"}
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

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="w-full md:w-1/3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="w-full md:w-2/3 flex flex-wrap gap-4">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full md:w-auto px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="w-full md:w-auto px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="w-full md:w-auto px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Prices</option>
              <option value="0-50">$0 - $50</option>
              <option value="51-100">$51 - $100</option>
              <option value="101+">$101+</option>
            </select>
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
        
        {filteredCourses.length === 0 ? (
          <div className="text-center text-indigo-600 font-bold text-lg">
            No courses available matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="block group"
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
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
