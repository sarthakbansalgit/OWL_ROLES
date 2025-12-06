import Blog from "../models/blog.model.js";
import Comment from "../models/comment.model.js";
import cloudinary from 'cloudinary';

export const createBlog = async (req, res) => {
    try {
        const { title, content, tags, image, author } = req.body;

        if (!title || !content) {
            return res.status(400).json({ success: false, message: "Title and content are required." });
        }

        const newBlog = new Blog({
            title,
            content,
            author,
            image, 
            tags: tags.split(','),
        });

        await newBlog.save();
        res.status(201).json({ success: true, message: 'Blog post created successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};


// Get blogs with pagination and sorting
export const getAllBlogs = async (req, res) => {
    try {
      const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = -1 } = req.query;
      const skip = (parseInt(page) - 1) * parseInt(limit);
      
      // Create sort object
      const sort = {};
      sort[sortBy] = parseInt(sortOrder);
      
      // Query with pagination, sorting and field selection
      const blogs = await Blog.find()
        .select('title content tags image createdAt updatedAt')
        .populate("author", "fullname email")
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(); // Use lean() for faster queries
      
      // Get total count for pagination info
      const total = await Blog.countDocuments();
      
      res.status(200).json({
        blogs,
        pagination: {
          total,
          page: parseInt(page),
          pages: Math.ceil(total / parseInt(limit))
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching blogs", error: error.message });
    }
  };
  

// Get a single blog by ID
export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("author", "fullname email");
        if (!blog) return res.status(404).json({ message: "Blog not found" });
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: "Error fetching blog", error });
    }
};

// Get blogs by Author ID
export const getBlogByAuthorId = async (req, res) => {
    try {
        const blogs = await Blog.find({ author: req.params.id }).populate("author", "fullname email");
        if (blogs.length === 0) return res.status(200).json({ blogs:[], message: "No blogs found for this author" });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching blogs by author", error });
    }
};


// Update a blog
export const updateBlog = async (req, res) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true }
        );
        if (!updatedBlog) return res.status(404).json({ message: "Blog not found" });
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({ message: "Error updating blog", error });
    }
};

// Delete a blog
export const deleteBlog = async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) return res.status(404).json({ success: false, message: "Blog not found" });
        res.status(200).json({ success: true, message: "Blog deleted successfully", deletedBlog });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting blog", error: error.message });
    }
};


// Add a comment to a blog
export const addComment = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        console.log('User ID from auth:', req.id);
        console.log('Blog ID:', req.params.blogId);
        
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({ message: "Comment content is required" });
        }

        const newComment = new Comment({
            content,
            author: req.id,
            blog: req.params.blogId,
        });

        console.log('New comment to be saved:', newComment);
        const savedComment = await newComment.save();
        console.log('Comment saved successfully:', savedComment);
        
        res.status(201).json(savedComment);
    } catch (error) {
        console.error('Error in addComment:', error);
        res.status(500).json({ message: "Error adding comment", error: error.message });
    }
};

// GET /blogs/:blogId/comments?skip=0&limit=10
export const getCommentsByBlogId = async (req, res) => {
    const { blogId } = req.params;
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 10;
  
    try {
      const comments = await Comment.find({ blog: blogId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("author", "fullname email");
  
      const totalComments = await Comment.countDocuments({ blog: blogId });
  
      res.status(200).json({ comments, total: totalComments });
    } catch (error) {
      res.status(500).json({ message: "Error fetching comments", error });
    }
  };
  
