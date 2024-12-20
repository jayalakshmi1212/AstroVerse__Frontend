import React from 'react';
import { User, BookOpen, CreditCard, MessageCircle, Video } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-20 bg-white shadow-lg flex flex-col items-center py-8 space-y-8">
      <button className="p-2 rounded-lg bg-gray-100">
        <User className="w-6 h-6 text-gray-600" />
      </button>
      <button className="p-2 rounded-lg hover:bg-gray-100">
        <BookOpen className="w-6 h-6 text-gray-600" />
      </button>
      <button className="p-2 rounded-lg hover:bg-gray-100">
        <CreditCard className="w-6 h-6 text-gray-600" />
      </button>
      <button className="p-2 rounded-lg hover:bg-gray-100">
        <MessageCircle className="w-6 h-6 text-gray-600" />
      </button>
      <button className="p-2 rounded-lg hover:bg-gray-100">
        <Video className="w-6 h-6 text-gray-600" />
      </button>
    </div>
  );
};

export default Sidebar;