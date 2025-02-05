import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { Bell, Calendar, ChevronRight, Home, Settings, User, Users,User2 ,Book} from 'lucide-react';
import CategoryManagement from './Category/CategoryManagement';
import LogoutButton from '../../Components/User/Login/LogoutButton';

export const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { icon: <Home size={20} />, label: 'Overview', path: '/admin/admindashboard' },
    { icon: <Users size={20} />, label: 'Students', path: '/admin/users' },
    { icon: <User2 size={20} />, label: 'Tutor', path: '/admin/tutors' },
    { icon: <Book size={20} />, label: 'Course', path: '/admin/courselist' },
    { icon: <Calendar size={20} />, label: 'Category', path: '/admin/category' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
    <LogoutButton className="text-white hover:text-blue-200 transition-colors duration-200">
    Logout
  </LogoutButton>
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200">
    <div className="p-6">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <span className="h-6 w-6 rounded-lg bg-purple-600"></span>
        Dashboard
      </h2>
    </div>
    <nav className="px-4 space-y-2">
      {navItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm ${
            location.pathname === item.path
              ? 'bg-purple-50 text-purple-600'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          {item.icon}
          {item.label}
        </Link>
      ))}
      {/* Logout Button */}
      <div className="px-4 py-3 mt-4">
        <LogoutButton className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
          Logout
        </LogoutButton>
      </div>
    </nav>
  </aside>
);
};

export const Header = () => (
  <header className="flex justify-between items-center mb-8">
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Hello, jaya</h1>
      <p className="text-gray-600">Welcome back to your dashboard</p>
    </div>
    <div className="flex items-center gap-4">
      <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200">
        <Bell size={20} />
      </button>
      <div className="flex items-center gap-3">
        <img
          src="/placeholder.svg?height=40&width=40"
          alt="Profile"
          className="h-10 w-10 rounded-full"
        />
        <div>
          <p className="font-medium text-gray-900">jaya</p>
          <p className="text-sm text-gray-600">Admin</p>
        </div>
      </div>
    </div>
  </header>
);

const Overview = () => (
  <>
    <div className="grid grid-cols-3 gap-6 mb-6">
      {[
        { title: 'Total Students', value: '1,234', change: '+12%', bg: 'bg-purple-500' },
        { title: 'Active Courses', value: '32', change: '+8%', bg: 'bg-teal-500' },
        { title: 'Total Revenue', value: '$12,345', change: '+23%', bg: 'bg-orange-500' },
      ].map((stat, index) => (
        <div key={index} className={`${stat.bg} rounded-2xl p-6 text-white`}>
          <h3 className="text-lg font-medium mb-2">{stat.title}</h3>
          <div className="flex items-end justify-between">
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm">{stat.change}</p>
          </div>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-9">
        <div className="bg-white rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Tasks for today</h3>
            <button className="text-purple-600 flex items-center gap-1 text-sm">
              View all <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-4">
            {[
              { task: 'Review course content', progress: 75 },
              { task: 'Prepare new materials', progress: 50 },
              { task: 'Student evaluations', progress: 25 },
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{item.task}</span>
                  <span>{item.progress}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div
                    className="h-full bg-purple-600 rounded-full"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-3">
        <div className="bg-white rounded-2xl p-6">
          <h3 className="text-lg font-medium mb-4">Calendar</h3>
          <div className="space-y-4">
            {[
              { time: '09:00', event: 'Team Meeting' },
              { time: '11:00', event: 'Course Review' },
              { time: '14:00', event: 'Student Workshop' },
              { time: '16:00', event: 'Content Planning' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="text-sm text-gray-600">{item.time}</div>
                <div className="flex-1 text-sm font-medium">{item.event}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </>
);

const AdminDashboard = () => {
  return (
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <Header />
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/category" element={<CategoryManagement/>} />
            <Route path="/students" element={<div>Students Page</div>} />
            <Route path="/settings" element={<div>Settings Page</div>} />
          </Routes>
        </main>
      </div>
  );
};

export default AdminDashboard;

