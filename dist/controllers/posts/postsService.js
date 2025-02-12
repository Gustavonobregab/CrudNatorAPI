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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filteredPostsButton = exports.searchPost = exports.deletePostById = exports.updatePost = exports.getPostById = exports.getPostsByUser = exports.getAllPosts = exports.createPost = void 0;
const postModel_1 = __importDefault(require("../../models/postModel"));
/**
 * Cria um novo post no banco de dados
 * @param title - O título do post
 * @param content - O conteúdo do post
 * @param area - A área do post (por exemplo, tecnologia, ciência, etc.)
 * @param link - O link relacionado ao post
 */
const createPost = (userId, title, content, area, link, imgFile) => __awaiter(void 0, void 0, void 0, function* () {
    const newPost = yield postModel_1.default.create({ author: userId, title, content, area, link, image: imgFile.path });
    return newPost;
});
exports.createPost = createPost;
/**
 * Obtém todos os posts do banco de dados
 */
const getAllPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield postModel_1.default.find();
    return posts;
});
exports.getAllPosts = getAllPosts;
/**
 * Obtém todos os posts de um usuário específico
 * @param userId - O ID do usuário cujos posts serão retornados
 */
const getPostsByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield postModel_1.default.find({ author: userId }); // Filtra os posts pelo author (userId)
    return posts;
});
exports.getPostsByUser = getPostsByUser;
/**
 * Obtém um post pelo ID e retorna os dados do post, incluindo o usuário que o criou
 * @param id - O ID do post
 */
const getPostById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield postModel_1.default.findById(id).populate('author', 'username email'); // Popula o campo 'author' com os dados do usuário
    console.log(post); // Adicione um log para garantir que a referência foi populada corretamente
    return post;
});
exports.getPostById = getPostById;
/**
 * Atualiza um post pelo ID
 * @param id - O ID do post a ser atualizado
 * @param updatedData - Os dados para atualização (como title, content, area, link, etc.)
 */
const updatePost = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedPost = yield postModel_1.default.findByIdAndUpdate(id, updatedData, { new: true });
    return updatedPost;
});
exports.updatePost = updatePost;
/**
 * Deleta um post pelo ID
 * @param id - O ID do post a ser deletado
 */
const deletePostById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedPost = yield postModel_1.default.findByIdAndDelete(id);
    return deletedPost;
});
exports.deletePostById = deletePostById;
/**
 * Busca posts com base em um parâmetro de consulta (termo)
 * @param searchTerm - O termo de busca
 */
const searchPost = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const regex = new RegExp(searchTerm, 'i');
    const posts = yield postModel_1.default.find({
        $or: [
            { title: { $regex: regex } }, // Busca no campo 'title'
            { content: { $regex: regex } } // Busca no campo 'content'
        ],
    });
    return posts;
});
exports.searchPost = searchPost;
const filteredPostsButton = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const validAreas = ['backend', 'frontend', 'devops', 'uxui'];
    // Verifica se o searchTerm está dentro das áreas válidas
    if (validAreas.includes(searchTerm.toLowerCase())) {
        const posts = yield postModel_1.default.find({ area: searchTerm });
        return posts;
    }
    return [];
});
exports.filteredPostsButton = filteredPostsButton;
