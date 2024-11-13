import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Star, Menu } from 'lucide-react';
import LogoutButton from '../Login/LogoutButton'


function Header() {
  const user = useSelector((state) => state.auth.user); // Get user from Redux state
 
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Star className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xl font-bold text-gray-800 dark:text-white">AstroVerse</span>
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link to="/courses" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Courses</Link>
          <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">About</Link>
          <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Contact</Link>
        </nav>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-600 dark:text-gray-300">{`Welcome, ${user.username}`}</span>
              
            </>
          ) : (
            <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
              Sign In
            </Link>
          )}
          <LogoutButton className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                Logout
              </LogoutButton>
        </div>
        <button className="md:hidden">
          <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </header>
  );
}

export default Header;
