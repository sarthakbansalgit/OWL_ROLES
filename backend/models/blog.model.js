// Backend - models/Blog.js
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true 
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true 
    },
    tags: [{ 
      type: String,
      index: true
    }],
    image: {
      type: String
    },
  },
  { 
    timestamps: true 
  }
);

blogSchema.index({ createdAt: -1, author: 1 });

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;