import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from "../../../utils/axiosInstance";
import { Play, Pause, ChevronRight, MessageSquare } from 'lucide-react';
import { useSelector } from 'react-redux';
import CommentModal from '../../Utils/comment-modal';

const LessonList = () => {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const videoRef = useRef(null);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const userId = useSelector((state) => state.auth.user.id);

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

  useEffect(() => {
    const fetchComments = async () => {
      if (selectedLesson) {
        try {
          const response = await axios.get(`/lessons/${selectedLesson.id}/comments/`);
          setComments(response.data || []);
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      }
    };
    fetchComments();
  }, [selectedLesson]);

  const handleAddComment = async (content, parentId = null) => {
    if (content.trim() === '') return;
    try {
      await axios.post(
        `http://localhost:8000/lessons/${selectedLesson.id}/comments/`,
        { content, user: userId, lesson: selectedLesson.id, parent: parentId },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const updatedComments = await axios.get(`/lessons/${selectedLesson.id}/comments/`);
      setComments(updatedComments.data || []);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment or reply:', error);
    } 
  };
  

  const togglePlayPause = () => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 border-b pb-4">
          {selectedLesson ? selectedLesson.title : 'Course Lessons'}
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {selectedLesson && (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative aspect-w-16 aspect-h-9">
                  <video ref={videoRef} src={selectedLesson.video_url} className="w-full h-full object-cover" />
                  <button
                    onClick={togglePlayPause}
                    className="absolute bottom-4 left-4 bg-white rounded-full p-4 shadow-lg transition-transform transform hover:scale-105"
                  >
                    {isPlaying ? <Pause className="w-6 h-6 text-blue-500" /> : <Play className="w-6 h-6 text-blue-500" />}
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">{selectedLesson.title}</h2>
                    <button
                      onClick={() => setIsCommentModalOpen(true)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                    >
                      <MessageSquare className="w-5 h-5" />
                      <span>Comments ({comments.results?.length || 0})</span>
                    </button>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{selectedLesson.description}</p>
                </div>
              </div>
            )}
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">Lessons</h3>
              <ul className="space-y-4">
                {lessons.map((lesson) => (
                  <li
                    key={lesson.id}
                    className={`cursor-pointer transition-all ${
                      selectedLesson?.id === lesson.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedLesson(lesson)}
                  >
                    <div className="flex items-center p-3 rounded-xl border">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg mr-4 overflow-hidden">
                        <img src={lesson.thumbnail || '/placeholder.svg'} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{lesson.title}</h4>
                        <p className="text-sm text-gray-500">45sec • Exercise</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        comments={comments}
        onAddComment={handleAddComment}
        newComment={newComment}
        setNewComment={setNewComment}
        userId={userId}
        onLikeComment={async (commentId) => {
          try {
            await axios.post(`/comments/${commentId}/like/`);
            const updatedComments = await axios.get(`/lessons/${selectedLesson.id}/comments/`);
            setComments(updatedComments.data || []);
          } catch (error) {
            console.error('Error liking comment:', error);
          }
        }}
      />
    </div>
  );
};

export default LessonList;