import Navbar from '@/components/shared/Navbar';
import { BLOG_API_END_POINT } from '@/utils/constant';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import MyBlog from '../MyBlog';
import backButton from '@/assets/backButton.png';
import { Button, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ArrowBack } from '@mui/icons-material';

const MyBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useSelector((store) => store.auth); 

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${BLOG_API_END_POINT}/author/${user?._id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setBlogs(data.blogs || data || []);
      } catch (err) {
        setError("Error fetching blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [user, navigate]);

  const handleDelete = async (deletedBlogId) => {
    setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== deletedBlogId));
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <CircularProgress size={60} thickness={4} className="text-blue-500" />
      <p className="mt-4 text-gray-600 text-lg font-medium">Loading Your Creative Works...</p>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-6">
      <div className="max-w-md text-center bg-white p-8 rounded-xl shadow-lg border border-red-100">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</h3>
        <p className="text-gray-600 mb-6">{error}</p>
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Try Again
        </Button>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <Link 
            to="/blog" 
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowBack className="mr-2" />
            <span className="font-medium">All Blogs</span>
          </Link>
          
          <Link to="/blog/createPost" className="w-full sm:w-auto ">
            <Button
              variant="contained"
              startIcon={<AddIcon className="text-white" />}
              className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md transition-all"
            >
              Create New
            </Button>
          </Link>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-300 bg-clip-text text-transparent">
              My Blog Posts
            </h1>
          </div>

          <div className="p-6">
            {blogs.length === 0 ? (
              <div className="text-center py-12">
                <div className="mb-8">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Your Story Starts Here
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    You haven't created any blogs yet. Share your knowledge and experiences with the community!
                  </p>
                </div>
                <Link to="/blog/createPost">
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<AddIcon />}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Write First Blog
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                  <MyBlog 
                    key={blog._id} 
                    blog={blog}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBlogs;