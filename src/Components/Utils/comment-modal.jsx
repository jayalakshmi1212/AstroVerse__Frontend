import React, { useState } from 'react';
import { X, ThumbsUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const CommentModal = ({
  isOpen,
  onClose,
  comments,
  onAddComment,
  newComment,
  setNewComment,
  userId,
  onLikeComment,
}) => {
  const [replyContent, setReplyContent] = useState('');
  const [replyParentId, setReplyParentId] = useState(null);

  if (!isOpen) return null;

  const handleReply = async (parentId) => {
    if (!replyContent.trim()) {
      console.warn('Reply content is empty.');
      return;
    }
    try {
      await onAddComment(replyContent, parentId);
      setReplyContent('');
      setReplyParentId(null);
    } catch (error) {
      console.error('Failed to add reply:', error);
    }
  };

  const renderComments = (comments, parentId = null) => {
    return comments
      .filter(comment => comment.parent === parentId)
      .map(comment => (
        <div key={comment.id} className="border-l-2 pl-4 ml-4">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              {comment.user ? (
                <span className="text-gray-600 font-semibold">
                  {comment.user[0].toUpperCase()}
                </span>
              ) : (
                'A'
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-semibold">{comment.user?.split('@')[0] || 'Anonymous'}</span>
                <span className="text-gray-500 text-sm">
                  {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                </span>
              </div>
              <p className="text-gray-700 mt-1">{comment.content}</p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  className="text-blue-500 text-sm"
                  onClick={() => setReplyParentId(comment.id)}
                >
                  Reply
                </button>
              </div>

              {/* Render reply input field if replying */}
              {replyParentId === comment.id && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleReply(comment.id);
                  }}
                >
                  <input
                    className="border rounded px-2 py-1 text-sm mt-2"
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Write a reply..."
                  />
                </form>
              )}

              {/* Recursively render replies */}
              {renderComments(comments, comment.id)}
            </div>
          </div>
        </div>
      ));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Comments</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[60vh] p-4">
          {Array.isArray(comments.results) && comments.results.length > 0 ? (
            <div className="space-y-4">{renderComments(comments.results)}</div>
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onAddComment(newComment);
          }}
          className="p-4 border-t flex items-center"
        >
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 border rounded px-4 py-2 text-sm"
          />
          <button
            type="submit"
            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentModal;
