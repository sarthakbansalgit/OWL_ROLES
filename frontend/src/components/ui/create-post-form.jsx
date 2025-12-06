import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BLOG_API_END_POINT } from '@/utils/constant';
import { Button } from '@mui/material';
import backButton from '@/assets/backButton.png'

export default function CreatePostForm() {
  const { user } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    image: '',
  });
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
    script.async = true;
    script.onload = () => {
      console.log('Cloudinary widget loaded');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = () => {
    if (window.cloudinary) {
      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName: 'dczj69wck', // Replace with your actual cloud name
          sources: ['local', 'url', 'camera'],
          multiple: false,
          clientAllowedFormats: ['jpg', 'png', 'gif'],
          maxFileSize: 10 * 1024 * 1024, // Max file size 10MB
          uploadPreset: 'owlroles_unsigned_preset',
        },
        (error, result) => {
          if (error) {
            console.error('Error uploading image:', error);
            return;
          }

          if (result && result.event === 'success') {
            const imageUrl = result.info.secure_url;
            setFormData({ ...formData, image: imageUrl });
            setImagePreview(imageUrl);
            console.log('Uploaded image URL:', imageUrl);
          }
        }
      );
      widget.open();
    } else {
      console.error('Cloudinary widget not loaded');
    }
  };

  const createPostSubmitHandler = async (e) => {
    e.preventDefault();
    const { title, content, tags, image } = formData;
    if (!user) {
      return alert('User not authenticated');
    }

    const postData = {
      title,
      content,
      tags,
      image,  // Send the Cloudinary image URL
      author: user._id,
    };

    setLoading(true);
    try {
      const res = await axios.post(`${BLOG_API_END_POINT}/createPost`, postData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setFormData({ title: '', content: '', tags: '', image: '' });
        setImagePreview(null);
        navigate('/blog');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={createPostSubmitHandler}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
        <Button className='bg-transparent' onClick={() => navigate(-1)}><img src={backButton} alt="Back" width='40rem'/></Button>
          <h2 className="text-2xl font-bold text-gray-900">Create a New Post</h2>
          <p className="mt-1 text-lg text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="title" className="block text-xl font-medium text-gray-900">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleInputChange}
                placeholder="My New Job/Experience..."
                className="block w-full py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 outline outline-1 outline-gray-300 focus:outline-indigo-600"
              />
            </div>

            <div className="col-span-full">
              <label htmlFor="content" className="block text-xl font-medium text-gray-900">
                Description
              </label>
              <textarea
                id="content"
                name="content"
                rows={3}
                required
                value={formData.content}
                onChange={handleInputChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 outline outline-1 outline-gray-300 focus:outline-indigo-600"
                placeholder="Today, I would like to share..."
              />
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="tags" className="block text-xl font-medium text-gray-900">
                Tags
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                required
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="Any tags"
                className="block w-full py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 outline outline-1 outline-gray-300 focus:outline-indigo-600"
              />
            </div>

            <div className="col-span-full">
              <label htmlFor="image" className="block text-xl font-medium text-gray-900">
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleImageUpload}
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Upload a file
                  </button>
                  <p className="pl-1">or drag and drop</p>
                  <p className="text-xs text-gray-600">PNG, JPG, GIF up to 10MB</p>
                  {/* Image preview */}
                  {imagePreview && (
                    <div className="mt-4">
                      <img
                        src={imagePreview}
                        alt="Image preview"
                        className="h-40 w-40 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="font-semibold text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className={`rounded-md ${loading ? 'bg-gray-500' : 'bg-indigo-600'} px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600`}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
}
