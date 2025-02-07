import { Router } from 'express';
import express from 'express';
import {
  newPost,
  getPostById,
  getAllPosts,
  updatePost,
  deletePostById,
  getPostsByUser,
  searchPosts,
  filterPostsButton
  
} from '../controllers/posts/postsController';
import { authenticateTokenMiddleWare } from '../middlewares/userAuthMiddleWare';

const router = express.Router();

import upload from '../config/multer'

// Create a new post
router.post('/createPost/:userId',authenticateTokenMiddleWare,/* upload.single("file")*/ newPost);

// Return all user posts
router.get('/postsByUser/:userId', authenticateTokenMiddleWare, getPostsByUser)

// Fetch all posts
router.get('/', getAllPosts);

// Fetch a post by ID
router.get('/:id',authenticateTokenMiddleWare, getPostById);

// Update an existing post
router.patch('/:id',authenticateTokenMiddleWare, updatePost);

// Delete a post by ID
router.delete('/:id', authenticateTokenMiddleWare, deletePostById);

//Search posts by params
router.get("/search/:param", searchPosts);

//Filter posts by his area
router.get("/filter/:param", filterPostsButton )



export default router;


