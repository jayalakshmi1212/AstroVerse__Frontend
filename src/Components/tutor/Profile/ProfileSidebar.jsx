import React from 'react';

const Sidebar = ({ profileImage, username }) => {
  const menuItems = [
    { label: 'Profile', active: true },
    { label: 'Work Opportunities' },
    { label: 'Password' },
    { label: 'Social Profiles' },
    { label: 'Invitations' },
    { label: 'Sessions' },
    { label: 'Applications' },
  ];

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 p-6">
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
          <img
            src={profileImage || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-lg font-semibold text-gray-800">
          {username || 'Guest User'}
        </h2>
      </div>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <a
                href="#"
                className={`block px-4 py-2 rounded-lg text-sm ${
                  item.active
                    ? 'text-rose-500 bg-rose-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
