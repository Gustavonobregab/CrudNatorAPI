"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterPostsButton = exports.searchPosts = exports.deletePostById = exports.updatePost = exports.getPostById = exports.getPostsByUser = exports.getAllPosts = exports.newPost = void 0;
const postsService_1 = require("./postsService");
/**
 * Cria um novo post verificando se todos os parâmetros necessários estão presentes
 */
const newPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, area, link } = req.body;
    const imgFile = req.file;
    const userId = req.params.userId; // O ID do usuário vem do middleware de autenticação, assumindo que req.user está presente
    try {
        // Validando 
        if (!title || !content || !area || !link) {
            res.status(400).json({ message: 'Parameters Missing!' });
            return;
        }
        if (!imgFile) {
            res.status(400).json({ message: 'Image file is required!' });
            return;
        }
        // Criando um novo post
        const newPost = yield (0, postsService_1.createPost)(userId, title, content, area, link, imgFile);
        res.status(201).json({ message: 'Post created successfully!', post: newPost });
    }
    catch (error) {
        next(error);
    }
});
exports.newPost = newPost;
/**
 * Obtém todos os posts e os retorna na resposta
 */
const getAllPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield (0, postsService_1.getAllPosts)();
        res.status(200).json({ posts });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllPosts = getAllPosts;
/**
 * Obtém todos os posts de um usuário específico
 */
const getPostsByUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const posts = yield (0, postsService_1.getPostsByUser)(userId);
        if (posts.length === 0) {
            res.status(404).json({ message: 'No posts found for this user' });
            return;
        }
        res.status(200).json({ posts });
    }
    catch (error) {
        next(error);
    }
});
exports.getPostsByUser = getPostsByUser;
/**
 * Obtém um post pelo ID e retorna os dados do post, incluindo o usuário que o criou
 */
const getPostById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const post = yield (0, postsService_1.getPostById)(id);
        if (!post) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        res.status(200).json({ post });
    }
    catch (error) {
        next(error);
    }
});
exports.getPostById = getPostById;
/**
 * Atualiza um post pelo ID com os novos dados fornecidos
 */
const updatePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const updatedPost = yield (0, postsService_1.updatePost)(id, updatedData);
        if (!updatedPost) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
    }
    catch (error) {
        next(error);
    }
});
exports.updatePost = updatePost;
/**
 * Deleta um post pelo ID
 */
const deletePostById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedPost = yield (0, postsService_1.deletePostById)(id);
        if (!deletedPost) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        res.status(200).json({ message: 'Post deleted successfully' });
    }
    catch (error) {
        next(error);
    }
});
exports.deletePostById = deletePostById;
/**
 * Busca posts com base em um parâmetro de consulta
 */
const searchPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const param = req.params.param;
    try {
        console.log(param);
        const filteredPosts = yield (0, postsService_1.searchPost)(param);
        res.status(200).json({ filteredPosts });
    }
    catch (error) {
        next(error);
    }
});
exports.searchPosts = searchPosts;
const filterPostsButton = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const param = req.params.param;
    try {
        const filteredPosts = yield (0, postsService_1.filteredPostsButton)(param);
        res.status(200).json({ filteredPosts });
    }
    catch (error) {
        next(error);
    }
});
exports.filterPostsButton = filterPostsButton;
