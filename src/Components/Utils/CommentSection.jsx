import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentSection = ({ lessonId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      const response = await axios.get(`/api/lessons/${lessonId}/comments/`);
      setComments(response.data);
    };
    fetchComments();
  }, [lessonId]);

  const handleAddComment = async () => {
    if (newComment.trim() === '') return;

    const response = await axios.post(`/api/lessons/${lessonId}/comments/`, {
      content: newComment,
    });
    setComments([response.data, ...comments]);
    setNewComment('');
  };

  return (
    <div>
      <h2>Comments</h2>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
      />
      <button onClick={handleAddComment}>Post Comment</button>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.content} - {comment.user.username}</p>
            {comment.replies && (
              <ul>
                {comment.replies.map((reply) => (
                  <li key={reply.id}>
                    <p>{reply.content} - {reply.user.username}</p>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
