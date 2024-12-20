import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const navigate=useNavigate()
  // Get token from Redux store
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!accessToken) {
        setError('You need to be logged in to view your courses');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/tutorcourses/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setCourses(response.data);
      } catch (err) {
        setError('Failed to fetch courses');
      }
    };

    fetchCourses();
  }, [accessToken]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
     <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Your Courses</h2>
        <button
  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
  onClick={() => navigate("/tutor/course")}
>
  Add New Course
</button>

      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105"
            >
              {/* Display Course Thumbnail */}
              <img
                src={course.thumbnail || '/placeholder.svg?height=200&width=200'} // Fallback image if no thumbnail
                alt={course.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/placeholder.svg?height=200&width=200';
                }}
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{course.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {course.category}
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {course.difficulty}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-800">${course.price}</span>
                  <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                onClick={() => course?.id && navigate(`/tutor/coursedetail/${course.id}`)}

              >
                View Details
              </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">You haven't created any courses yet.</p>
        )}
      </div>
    </div>
  );
};

export default CourseManagement;
