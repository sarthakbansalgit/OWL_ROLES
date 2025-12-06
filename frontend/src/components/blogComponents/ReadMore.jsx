
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ReadMore = ({ postId }) => {
  return (
    <Link 
      to={`/blog/post/${postId}`} 
      className="read-more inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
    >
      <span>Read more</span>
      <ArrowRight size={18} className="ml-1" />
    </Link>
  );
};

export default ReadMore;