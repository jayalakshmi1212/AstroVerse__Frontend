import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Star, Globe } from 'lucide-react';

const courses = [
  { id: 1, title: 'Introduction to Astronomy', icon: Sun, description: 'Learn the basics of our solar system and beyond.' },
  { id: 2, title: 'Planetary Science', icon: Globe, description: 'Explore the diverse worlds within our solar system.' },
  { id: 3, title: 'Stars and Galaxies', icon: Star, description: 'Discover the life cycles of stars and the structure of galaxies.' },
  { id: 4, title: 'Cosmology', icon: Moon, description: 'Unravel the mysteries of the universe\'s origin and evolution.' },
];

function FeaturedCourses() {
  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Featured Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300">
              <course.icon className="h-12 w-12 text-indigo-600 dark:text-indigo-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{course.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{course.description}</p>
              <Link to={`/courses/${course.id}`} className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedCourses;