import React from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { BLOG_API_END_POINT } from '@/utils/constant';
import { Link } from 'react-router-dom';

const MyBlog = ({ blog, onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await axios.delete(
          `${BLOG_API_END_POINT}/author/delete/${blog._id}`,
          { withCredentials: true }
        );
        
        if (response.data.success) {
          toast.success(response.data.message || 'Post deleted successfully.');
          onDelete(blog._id);
        }
      } catch (error) {
        console.error('Delete Error:', error);
        toast.error(error.response?.data?.message || 'Error deleting post');
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 p-6 m-4">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {blog.title}
        </h3>
        <p className="text-gray-600 line-clamp-3">
          {blog.content}
        </p>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <Link 
          to={`/blog/post/${blog._id}`}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg hover:from-purple-600 hover:to-indigo-600 transition-all"
        >
          Read More
        </Link>
        
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 px-4 py-2 text-red-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5"
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">Delete</span>
        </button>
      </div>
    </div>
  );
};

export default MyBlog;