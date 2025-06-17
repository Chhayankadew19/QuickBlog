import express from 'express';
import { addBlog, addComment, DeleteBlogById, generateContent, getAllBlogs, getBlogById, getBlogComments, togglePublish } from '../controllers/blogControllers.js';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';

const blogRouter=express.Router();

blogRouter.post('/add',upload.single('image'),auth , addBlog);
blogRouter.get('/all',getAllBlogs);
blogRouter.get('/:blogId',getBlogById);
blogRouter.post('/delete', auth, DeleteBlogById);
blogRouter.post('/toggle-publish', auth, togglePublish);
blogRouter.post('/add-comment', addComment);
blogRouter.post('/comments', getBlogComments);
blogRouter.post('/generate', auth , generateContent);


export default blogRouter;