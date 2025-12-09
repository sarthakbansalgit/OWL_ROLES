// PostDetail.jsx - Component to display full blog post with comments
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BLOG_API_END_POINT } from '@/utils/constant';
import Navbar from '@/components/shared/Navbar';
import { useSelector } from 'react-redux';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentError, setCommentError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [commentPage, setCommentPage] = useState(0);
  const [hasMoreComments, setHasMoreComments] = useState(true);
  const COMMENTS_LIMIT = 5;
  const { user } = useSelector((store) => store.auth);
  const fallbackImage = './src/assets/blog_default.webp';

  useEffect(() => {
    setIsAuthenticated(!!user);

    const fetchPostDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BLOG_API_END_POINT}/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPostDetail();
      fetchPaginatedComments(0);
    }
  }, [id, user]);

  // Add this sorting function near your other utility functions
  const sortCommentsByDate = (comments) => {
    return [...comments].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  // Modify the fetchPaginatedComments function
  const fetchPaginatedComments = async (page = 0) => {
    try {
      const skip = page * COMMENTS_LIMIT;
      const response = await fetch(
        `${BLOG_API_END_POINT}/${id}/comments?skip=${skip}&limit=${COMMENTS_LIMIT}`
      );
      if (!response.ok) throw new Error('Failed to fetch comments');
      const data = await response.json();

      if (page === 0) {
        setComments(sortCommentsByDate(data.comments));
      } else {
        setComments((prev) => sortCommentsByDate([...prev, ...data.comments]));
      }

      setHasMoreComments(skip + data.comments.length < data.total);
      setCommentPage(page);
    } catch (err) {
      setCommentError(err.message);
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  // Modify the handleSubmitComment function where you update the comments state
  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    try {
        setCommentLoading(true);
        setCommentError(null);

        if (!user) {
            navigate('/login', { state: { from: `/post/${id}` } });
            return;
        }

        const response = await fetch(`${BLOG_API_END_POINT}/${id}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ content: newComment }),
        });

        if (!response.ok) {
            throw new Error('Failed to add comment');
        }

        const data = await response.json();
        
        const newCommentData = {
            _id: data._id,
            content: data.content,
            author: {
              _id: user._id,
              fullname: user.fullname,
              email: user.email
            },
            createdAt: data.createdAt,
        };
        
        // Update comments state and sort
        setComments(prevComments => sortCommentsByDate([newCommentData, ...prevComments]));        // Reset comment input
        setNewComment('');
        
    } catch (err) {
        setCommentError(err.message);
        console.error('Error submitting comment:', err);
    } finally {
        setCommentLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 md:px-14 py-8">
        <button
          onClick={handleGoBack}
          className="mb-6 inline-flex items-center text-gray-700 hover:text-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to blogs
        </button>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-900 border-r-transparent"></div>
            <p className="mt-2">Loading post...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error: {error}
          </div>
        ) : post ? (
          <>
            <article className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              {post.image && (
                <div className="w-full">
                  <img
                    src={post.image || fallbackImage}
                    alt={post.title}
                    className="w-full object-cover"
                    style={{ maxHeight: '400px' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = fallbackImage;
                    }}
                  />
                </div>
              )}

              <div className="p-6 md:p-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

                <div className="flex items-center text-gray-600 mb-6">
                  <span className="font-medium">
                    By {post.author?.fullname || 'Unknown Author'}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{formatDate(post.createdAt)}</span>
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                      >
                        #{typeof tag === 'string' ? tag : typeof tag === 'object' && tag?.name ? tag.name : String(tag)}
                      </span>
                    ))}
                  </div>
                )}

                <div className="prose prose-lg max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
              </div>
            </article>

            {/* Comments Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">Comments</h2>

              {isAuthenticated ? (
                <form onSubmit={handleSubmitComment} className="mb-8">
                  <div className="mb-4">
                    <label htmlFor="comment" className="block text-gray-700 font-medium mb-2">
                      Add a comment
                    </label>
                    <textarea
                      id="comment"
                      name="comment"
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newComment}
                      onChange={handleCommentChange}
                      placeholder="Share your thoughts..."
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={commentLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {commentLoading ? 'Posting...' : 'Post Comment'}
                  </button>
                  {commentError && <p className="mt-2 text-red-600 text-sm">{commentError}</p>}
                </form>
              ) : (
                <div className="bg-gray-50 p-4 rounded-md mb-8">
                  <p className="text-gray-700">
                    Please{' '}
                    <a href="/login" className="text-blue-600 hover:underline">
                      login
                    </a>{' '}
                    to post a comment.
                  </p>
                </div>
              )}

              {comments.length > 0 ? (
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="border-b border-gray-200 pb-6 last:border-b-0"
                    >
                      <div className="flex items-center mb-2">
                        <span className="font-medium">
                          {comment.author?.fullname || 'Anonymous'}
                        </span>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-gray-500 text-sm">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                  ))}
                  {hasMoreComments && (
                    <button
                      onClick={() => fetchPaginatedComments(commentPage + 1)}
                      className="mt-6 px-4 py-2 bg-black text-white rounded hover:bg-gray-700"
                    >
                      Load more comments
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  No comments yet. Be the first to comment!
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-xl text-gray-600">Post not found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
