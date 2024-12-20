import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Star, Menu, User } from 'lucide-react';
import LogoutButton from '../Login/LogoutButton';

function Header() {
  const { user } = useSelector((state) => state.auth); // Get user from Redux state

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Star className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xl font-bold text-gray-800 dark:text-white">AstroVerse</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-4">
        <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
          <Link to="/courses" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Courses</Link>
          <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">About</Link>
          <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Contact</Link>
        </nav>

        {/* User Section */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {/* User Icon and Username */}
              <Link to="/profile" className="flex items-center space-x-2 hover:text-indigo-600 dark:hover:text-indigo-400">
                <User className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                <span className="text-gray-600 dark:text-gray-300">{user.username}</span>
              </Link>
              
              {/* Logout Button */}
              <LogoutButton className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                Logout
              </LogoutButton>
            </>
          ) : (
            <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden">
          <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </header>
  );
}

export default Header;
