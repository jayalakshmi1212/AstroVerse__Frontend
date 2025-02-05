import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Search, Plus, ArrowLeft } from 'lucide-react';

const ChatListComponent = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const tutorId = useSelector((state) => state.auth.user.id);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/chat-students");
        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }
        const data = await response.json();

        // Filter out the tutor and only include students who sent messages
        const filteredStudents = data.filter(student => student.id !== tutorId);
        setStudents(filteredStudents);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [tutorId]);

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="p-4 bg-purple-600">
        <h2 className="text-xl font-semibold text-white">Messages</h2>
        <div className="text-sm text-purple-200 mt-1">48 Messages</div>
      </div>
      
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search messages..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="overflow-y-auto flex-1">
        {students.map((student) => (
          <Link
            key={student.id}
            to={`/chat/${tutorId}/${student.id}`}
            className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
          >
            <div className="h-12 w-12 rounded-full bg-purple-200 flex items-center justify-center">
              <span className="text-purple-600 font-medium">
                {student.username.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-sm font-medium">{student.username}</h3>
              <p className="text-sm text-gray-500">Click to start chatting</p>
            </div>
          </Link>
        ))}
      </div>

      <button className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-purple-600 flex items-center justify-center text-white shadow-lg hover:bg-purple-700 transition-colors">
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
};

export default ChatListComponent;
