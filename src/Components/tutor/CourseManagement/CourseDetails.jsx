import React, { useState, useEffect } from "react";
import axios from "../../../utils/axiosInstance";
import uploadImageToCloudinary from "../../../utils/cloudinary";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { MessageSquare, ChevronRight } from 'lucide-react';
import CommentModal from '../../Utils/comment-modal';

const CourseDetails = () => {
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [lessonData, setLessonData] = useState({
    title: "",
    video: null,
    description: "",
  });
  const [lessonComments, setLessonComments] = useState({});
  const [activeCommentModal, setActiveCommentModal] = useState(null);
  const { id } = useParams();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const userId = useSelector((state) => state.auth.user.id);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/coursedetail/${id}/`);
        setCourse(response.data);
        
        // Fetch comments for each lesson
        const commentsPromises = response.data.lessons.map(lesson =>
          axios.get(`http://localhost:8000/lessons/${lesson.id}/comments/`)
        );
        const commentsResponses = await Promise.all(commentsPromises);
        const newLessonComments = {};
        commentsResponses.forEach((response, index) => {
          newLessonComments[response.data.lessons[index].id] = response.data;
        });
        setLessonComments(newLessonComments);
      } catch (error) {
        console.error("Failed to fetch course details:", error);
      }
    };

    if (id) {
      fetchCourseDetails();
    }
  }, [id]);

  const handleDeleteCourse = async () => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(`http://localhost:8000/coursedetail/${id}/`);
        navigate('/tutor/courselist');
      } catch (error) {
        console.error("Failed to delete course:", error);
        alert("Failed to delete course. Please try again.");
      }
    }
  };

  const handleAddLesson = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const uploadedMediaData = await uploadImageToCloudinary(lessonData.video);
      const uploadedMediaUrl = uploadedMediaData.secure_url;

      const response = await axios.post(
        `http://localhost:8000/lessons/add/${id}/`,
        {
          title: lessonData.title,
          video_url: uploadedMediaUrl,
          description: lessonData.description,
          course: id,
        }
      );

      setCourse((prev) => ({
        ...prev,
        lessons: [...prev.lessons, response.data],
      }));
      setShowModal(false);
      setLessonData({ title: "", video: null, description: "" });
    } catch (error) {
      console.error("Failed to add lesson:", error);
      alert("Failed to add lesson. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (lessonId, content, parentId = null) => {
    if (content.trim() === '') {
      console.warn('Cannot add an empty comment');
      return;
    }

    try {
      await axios.post(
        `http://localhost:8000/lessons/${lessonId}/comments/`,
        { content, user: userId, lesson: lessonId, parent: parentId },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      const updatedComments = await axios.get(
        `http://localhost:8000/lessons/${lessonId}/comments/`
      );
      setLessonComments(prev => ({
        ...prev,
        [lessonId]: updatedComments.data || []
      }));
    } catch (error) {
      console.error('Error adding comment or reply:', error);
    }
  };

  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-red-500 font-semibold">Error: Course ID is missing</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative h-64 sm:h-80 md:h-96">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/placeholder.svg?height=400&width=600";
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center">
              {course.title}
            </h1>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-600 mb-6">{course.about}</p>
          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={handleDeleteCourse}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Delete Course
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Add Lesson
            </button>
          </div>
          <h2 className="text-2xl font-bold mb-4">Lessons</h2>
          <div className="space-y-4">
            {course.lessons.map((lesson) => (
              <div key={lesson.id} className="bg-gray-50 p-4 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">{lesson.title}</h3>
                <p className="text-gray-600 mb-4">{lesson.description}</p>
                <video src={lesson.video_url} controls className="w-full rounded-lg mb-4" />
                <button
                  onClick={() => setActiveCommentModal(lesson.id)}
                  className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Comments ({lessonComments[lesson.id]?.length || 0})</span>
                </button>
                <CommentModal
                  isOpen={activeCommentModal === lesson.id}
                  onClose={() => setActiveCommentModal(null)}
                  comments={lessonComments[lesson.id] || []}
                  onAddComment={(content) => handleAddComment(lesson.id, content)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <form onSubmit={handleAddLesson} className="p-6">
              <h3 className="text-2xl font-bold mb-4">Add Lesson</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Lesson Title"
                  value={lessonData.title}
                  onChange={(e) => setLessonData({ ...lessonData, title: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <textarea
                  placeholder="Lesson Description"
                  value={lessonData.description}
                  onChange={(e) => setLessonData({ ...lessonData, description: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  required
                />
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setLessonData({ ...lessonData, video: e.target.files[0] })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Lesson"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;

