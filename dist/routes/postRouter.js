"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postsController_1 = require("../controllers/posts/postsController");
const userAuthMiddleWare_1 = require("../middlewares/userAuthMiddleWare");
const router = express_1.default.Router();
const multer_1 = __importDefault(require("../config/multer"));
// Create a new post
router.post('/createPost/:userId', userAuthMiddleWare_1.authenticateTokenMiddleWare, multer_1.default.single("file"), postsController_1.newPost);
// Return all user posts
router.get('/postsByUser/:userId', userAuthMiddleWare_1.authenticateTokenMiddleWare, postsController_1.getPostsByUser);
// Fetch all posts
router.get('/', postsController_1.getAllPosts);
// Fetch a post by ID
router.get('/:id', userAuthMiddleWare_1.authenticateTokenMiddleWare, postsController_1.getPostById);
// Update an existing post
router.patch('/:id', userAuthMiddleWare_1.authenticateTokenMiddleWare, postsController_1.updatePost);
// Delete a post by ID
router.delete('/:id', userAuthMiddleWare_1.authenticateTokenMiddleWare, postsController_1.deletePostById);
//Search posts by params
router.get("/search/:param", postsController_1.searchPosts);
//Filter posts by his area
router.get("/filter/:param", postsController_1.filterPostsButton);
exports.default = router;
