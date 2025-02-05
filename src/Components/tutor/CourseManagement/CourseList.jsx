
import React, { useEffect, useState } from "react";
import axios from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8000/api/courses/");
        setCourses(response.data.courses);
        console.log(response.data)
      } catch (err) {
        setError("Failed to fetch courses. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
              <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Courses</h2>
        <button
  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
  onClick={() => navigate("/tutor/course")}
>
  Add Your Course Now
</button>

      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
            <img 
              src={course.thumbnail} 
              alt={course.title}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder.svg?height=200&width=200";
              }}
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{course.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{course.tag_line}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  {course.category}
                </span>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  {course.difficulty}
                </span>
              </div>
             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

