import React, { useState } from 'react';
import { MessageCircle, ThumbsUp, Reply, Send, User } from 'lucide-react';

const CommentSection = ({ articleId }) => {
  const [comments, setComments] = useState([
    {
      id: '1',
      author: 'Sarah Johnson',
      content: 'This is such an insightful article! I had no idea about the connection between gut health and mental well-being. Thank you for sharing this valuable information.',
      timestamp: '2 hours ago',
      likes: 12,
      replies: [
        {
          id: '1-1',
          author: 'Dr. Michael Chen',
          content: 'Thank you for your kind words, Sarah! The gut-brain connection is indeed fascinating and we\'re learning more about it every day.',
          timestamp: '1 hour ago',
          likes: 5,
          replies: []
        }
      ]
    },
    {
      id: '2',
      author: 'Alex Rodriguez',
      content: 'I\'ve been struggling with anxiety for years. After reading this, I\'m definitely going to look into improving my gut health. Any specific probiotic recommendations?',
      timestamp: '4 hours ago',
      likes: 8,
      replies: []
    },
    {
      id: '3',
      author: 'Emma Thompson',
      content: 'Great article! I\'ve been following a Mediterranean diet for the past year and have noticed significant improvements in my mood and energy levels.',
      timestamp: '6 hours ago',
      likes: 15,
      replies: []
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now().toString(),
      author: 'You',
      content: newComment,
      timestamp: 'Just now',
      likes: 0,
      replies: []
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleSubmitReply = (parentId) => {
    if (!replyContent.trim()) return;

    const reply = {
      id: `${parentId}-${Date.now()}`,
      author: 'You',
      content: replyContent,
      timestamp: 'Just now',
      likes: 0,
      replies: []
    };

    setComments(comments.map(comment =>
      comment.id === parentId
        ? { ...comment, replies: [...comment.replies, reply] }
        : comment
    ));

    setReplyContent('');
    setReplyingTo(null);
  };

  const handleLike = (commentId, isReply = false, parentId) => {
    if (isReply && parentId) {
      setComments(comments.map(comment =>
        comment.id === parentId
          ? {
              ...comment,
              replies: comment.replies.map(reply =>
                reply.id === commentId ? { ...reply, likes: reply.likes + 1 } : reply
              )
            }
          : comment
      ));
    } else {
      setComments(comments.map(comment =>
        comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
      ));
    }
  };

  const CommentItem = ({ comment, isReply = false, parentId }) => (
    <div className={`${isReply ? 'ml-12 mt-4' : 'mb-6'}`}>
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </div>
        </div>
        <div className="flex-1">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">{comment.author}</h4>
              <span className="text-sm text-gray-500 dark:text-gray-400">{comment.timestamp}</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-3">{comment.content}</p>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleLike(comment.id, isReply, parentId)}
                className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
              >
                <ThumbsUp className="w-4 h-4" />
                <span className="text-sm">{comment.likes}</span>
              </button>
              {!isReply && (
                <button
                  onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                >
                  <Reply className="w-4 h-4" />
                  <span className="text-sm">Reply</span>
                </button>
              )}
            </div>
          </div>

          {/* Reply Form */}
          {replyingTo === comment.id && (
            <div className="mt-3 ml-3">
              <div className="flex space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </div>
                </div>
                <div className="flex-1">
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Write a reply..."
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                  <div className="flex justify-end space-x-2 mt-2">
                    <button
                      onClick={() => setReplyingTo(null)}
                      className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSubmitReply(comment.id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      <span>Reply</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Replies */}
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} isReply={true} parentId={comment.id} />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8 lg:px-20">
      <div className="flex items-center space-x-3 mb-8">
        <MessageCircle className="w-6 h-6 text-red-500" />
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          Comments ({comments.length})
        </h3>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-8">
        <div className="flex space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </div>
          </div>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              rows={4}
            />
            <div className="flex justify-end mt-3">
              <button
                type="submit"
                className="flex items-center space-x-2 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!newComment.trim()}
              >
                <Send className="w-4 h-4" />
                <span>Post Comment</span>
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>

      {comments.length === 0 && (
        <div className="text-center py-12">
          <MessageCircle className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">No comments yet. Be the first to share your thoughts!</p>
        </div>
      )}
    </section>
  );
};

export default CommentSection;
