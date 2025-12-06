// BlogHome.jsx - Fixed layout to prevent overlapping
import Navbar from '@/components/shared/Navbar';
import React, { useEffect, useState } from 'react';
import Post from '../Post';
import { Link } from 'react-router-dom';
import { BLOG_API_END_POINT } from '@/utils/constant';
import Pagination from '@mui/material/Pagination';

const BlogHome = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPosts = async (pageNum = 1) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${BLOG_API_END_POINT}/getPosts?page=${pageNum}&limit=6`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      
      const data = await response.json();
      setPosts(data.blogs);
      setTotalPages(data.pagination.pages);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
    fetchPosts(value);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-extrabold text-4xl">Recent Blogs</h1>
          <div className="flex gap-3">
            <Link to="/blog/myBlogs">
              <button className="font-semibold px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition">
                My Blogs
              </button>
            </Link>
            <Link to="/blog/createPost">
              <button className="font-semibold px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition">
                Create New Post
              </button>
            </Link>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            Error: {error}
          </div>
        )}
        
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-900 border-r-transparent"></div>
            <p className="mt-2">Loading posts...</p>
          </div>
        ) : (
          <>
            {posts.length > 0 ? (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post) => (
                    <div key={post._id} className="h-full flex">
                      <Post {...post} />
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-center mt-10 mb-6">
                  <Pagination 
                    count={totalPages} 
                    page={page}
                    color="secondary" 
                    onChange={handlePageChange}
                    size="large"
                    siblingCount={1}
                    boundaryCount={1}
                  />
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <p className="text-xl text-gray-600">No posts available</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BlogHome;