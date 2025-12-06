import express from "express";
import { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog, addComment, getCommentsByBlogId, getBlogByAuthorId } from "../controllers/blog.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";  
import { singleUpload } from "../middlewares/mutler.js";
import cacheMiddleware from '../middlewares/cacheMiddleware.js';

const router = express.Router();

// Blog Routes
router.post("/createPost", isAuthenticated, singleUpload, createBlog);  // working
router.get("/getPosts",  getAllBlogs);  
router.get("/:id", cacheMiddleware(10), getBlogById); 
router.get("/author/:id", cacheMiddleware(300), getBlogByAuthorId); 
router.delete("/author/delete/:id", isAuthenticated, deleteBlog);  //working

// Comment Routes
router.post("/:blogId/comments", isAuthenticated, addComment);  // working
router.get("/:blogId/comments", cacheMiddleware(300), getCommentsByBlogId); 

export default router;
