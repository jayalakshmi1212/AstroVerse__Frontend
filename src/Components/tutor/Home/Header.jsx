import React, { useState } from 'react';
import { Telescope, User, Calendar, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import LogoutButton from '../../User/Login/LogoutButton';
import { useSelector } from 'react-redux';

const Header = () => {
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);

  return (
    <header className="bg-gradient-to-r from-blue-900 to-purple-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Telescope className="w-8 h-8" />
          <span className="text-2xl font-bold">AstroVerse</span>
        </div>
        
        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-6">
          <li>
              <Link
                to="/tutor/tutor-home"
                className="text-white hover:text-blue-200 transition-colors duration-200"
              >
               Home
              </Link>
            </li>
            <li>
              <Link
                to="/tutor/courselist"
                className="text-white hover:text-blue-200 transition-colors duration-200"
              >
                Courses
              </Link>
            </li>
            <li>
              <a href="#" className="flex items-center hover:text-blue-200 transition-colors duration-200">
                <Calendar className="w-5 h-5 mr-1" />
                Schedule
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center hover:text-blue-200 transition-colors duration-200">
                <MessageCircle className="w-5 h-5 mr-1" />
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Profile and Logout */}
        <div className="flex items-center space-x-4">
          {user && (
            <Link
              to="/tutor/tutorprofile"
              className="flex items-center hover:text-blue-200 transition-colors duration-200"
            >
              <User className="w-5 h-5 mr-1" />
              {user.username}
            </Link>
          )}
          <LogoutButton className="text-white hover:text-blue-200 transition-colors duration-200">
            Logout
          </LogoutButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
