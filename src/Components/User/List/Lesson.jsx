import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Play, Pause, ChevronRight } from 'lucide-react';

const LessonList = () => {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/courses/${courseId}/lessons/`);
        setLessons(response.data);
        if (response.data.length > 0) {
          setSelectedLesson(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching lessons:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Here you would typically control the video playback
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Top Navigation */}
     

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          {selectedLesson ? selectedLesson.title : 'Course Lessons'}
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content area */}
          <div className="lg:col-span-2">
            {selectedLesson && (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative aspect-w-16 aspect-h-9">
                  <video
                    src={selectedLesson.video_url}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={togglePlayPause}
                    className="absolute bottom-4 left-4 bg-white rounded-full p-4 shadow-lg transition-transform transform hover:scale-105"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 text-blue-500" />
                    ) : (
                      <Play className="w-6 h-6 text-blue-500" />
                    )}
                  </button>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-3 text-gray-800">{selectedLesson.title}</h2>
                  <p className="text-gray-600 mb-4">{selectedLesson.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      45sec
                    </span>
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Exercise
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Lesson list */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">Exercises</h3>
              <ul className="space-y-4">
                {lessons.length === 0 ? (
                  <p className="text-gray-500">No lessons available.</p>
                ) : (
                  lessons.map((lesson) => (
                    <li
                      key={lesson.id}
                      className={`cursor-pointer transition-all ${
                        selectedLesson && selectedLesson.id === lesson.id
                          ? 'bg-blue-50 border-blue-200'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedLesson(lesson)}
                    >
                      <div className="flex items-center p-3 rounded-xl border">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg mr-4 overflow-hidden">
                          <img
                            src={lesson.thumbnail || '/placeholder.svg'}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{lesson.title}</h4>
                          <p className="text-sm text-gray-500">45sec • Exercise</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonList;

