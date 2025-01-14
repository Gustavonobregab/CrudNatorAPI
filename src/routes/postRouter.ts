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

const router = express.Router();

// Create a new post
router.post('/createPost/:userId', newPost);

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

//Search posts by params
router.get("/search/:param", searchPosts);

//Filter posts by his area
router.get("/filter/:param", filterPostsButton )



export default router;


