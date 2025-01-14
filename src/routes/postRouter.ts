import { Router } from 'express';
import express from 'express';
import {
  newPost,
  getPostById,
  getAllPosts,
  updatePost,
  deletePostById,
  getPostsByUser
} from '../controllers/posts/postsController';

const router = express.Router();

import upload from '../config/multer'

// Create a new post
router.post('/createPost/:userId', upload.single("file"), newPost);

// Return all user posts
router.get('/postsByUser/:userId', getPostsByUser)

// Fetch all posts
router.get('/', getAllPosts);

// Fetch a post by ID
router.get('/:id', getPostById);


// Update an existing post
router.patch('/:id', updatePost);

// Delete a post by ID
router.delete('/:id', deletePostById);



export default router;


