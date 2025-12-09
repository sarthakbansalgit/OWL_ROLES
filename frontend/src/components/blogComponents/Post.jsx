// Post.jsx - Updated with fixed routing
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Post = ({ _id, title, content, author, createdAt, image, tags }) => {
  const navigate = useNavigate();
  
  // Format date for display
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  const truncatedContent = content ? content.substring(0, 150) + (content.length > 150 ? '...' : '') : '';
  
  const formattedTags = tags?.map(tag => `#${typeof tag === 'string' ? tag : typeof tag === 'object' && tag?.name ? tag.name : String(tag)}`).join(' ') || '';

  const fallbackImage = "./src/assets/blog_default.webp";

  const handleReadMore = (e) => {
    e.preventDefault();
    navigate(`/blog/post/${_id}`);
  };

  return (
    <div className="post-card bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden w-full">
      <div className="post-image">
        <img 
          src={image || fallbackImage} 
          alt={title}
          className="w-full object-cover"
          style={{ maxHeight: '250px' }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackImage;
          }}
        />
      </div>
      
      <div className="post-content p-4">
        {/* Title as clickable link */}
        <div 
          onClick={() => navigate(`/blog/post/${_id}`)}
          className="cursor-pointer"
        >
          <h2 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors">{title}</h2>
        </div>
        
        <div className="post-meta text-sm text-gray-600 mb-2">
          <span>@{author?.fullname?.split(' ')[0] || 'user'}</span>
          <span className="mx-2">{formattedDate}</span>
        </div>
        
        {formattedTags && (
          <div className="tags text-sm text-blue-600 mb-3">
            {formattedTags}
          </div>
        )}
        
        <p className="text-gray-700 mb-4">{truncatedContent}</p>
        
        {/* Read more as button with onClick handler instead of Link */}
        <button 
          onClick={handleReadMore}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          <span>Read more</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 ml-1" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Post;