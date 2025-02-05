
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Book, Users, Bell, ChevronRight } from 'lucide-react';
import Header from './Header';
function TutorHome() {
  const user = useSelector((state) => state.auth.user);

  const recentCourses = [
    { id: 1, title: 'Introduction to Astrophysics', students: 25, lastUpdated: '2023-06-15' },
    { id: 2, title: 'Planetary Science', students: 18, lastUpdated: '2023-06-10' },
    { id: 3, title: 'Stellar Evolution', students: 30, lastUpdated: '2023-06-05' },
  ];

  const upcomingClasses = [
    { id: 1, title: 'Black Holes and Neutron Stars', date: '2023-06-20', time: '14:00' },
    { id: 2, title: 'Galaxies and Cosmology', date: '2023-06-22', time: '15:30' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Welcome back, {user?.username}!</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Recent Courses</h2>
            <ul className="space-y-4">
              {recentCourses.map((course) => (
                <li key={course.id} className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">{course.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{course.students} students • Last updated: {course.lastUpdated}</p>
                  </div>
                  <Link to={`/course/${course.id}`} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/courses" className="mt-4 inline-block text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
              View all courses
            </Link>
          </section>

          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Upcoming Classes</h2>
            <ul className="space-y-4">
              {upcomingClasses.map((class_) => (
                <li key={class_.id} className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">{class_.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{class_.date} at {class_.time}</p>
                  </div>
                  <Link to={`/class/${class_.id}`} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/schedule" className="mt-4 inline-block text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
              View full schedule
            </Link>
          </section>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <Link to="/tutor/mycourse" className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150 ease-in-out">
            <div className="flex items-center">
              <Book className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mr-3" />
              <span className="text-lg font-medium text-gray-800 dark:text-white">My Courses</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>

          <Link to="/students" className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150 ease-in-out">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mr-3" />
              <span className="text-lg font-medium text-gray-800 dark:text-white">Students</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>

          <Link to="/tutor/reviews" className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150 ease-in-out">
    <div className="flex items-center">
        <Bell className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mr-3" />
        <span className="text-lg font-medium text-gray-800 dark:text-white">Reviews</span>
    </div>
    <ChevronRight className="h-5 w-5 text-gray-400" />
</Link>

        </div>
      </main>
    </div>
  );
}

export default TutorHome;


