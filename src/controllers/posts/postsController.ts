import { Request, Response, NextFunction } from 'express';
import { 
  createPost, 
  getAllPosts as fetchAllPosts, 
  getPostsByUser as fetchPostsByUser,
  getPostById as fetchPostById, 
  updatePost as modifyPost, 
  deletePostById as removePost 
} from './postsService';

/**
 * Cria um novo post verificando se todos os parâmetros necessários estão presentes
 */
export const newPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { title, content, area, link} = req.body;
  const imgFile = req.file
  const userId = req.params.userId;  // O ID do usuário vem do middleware de autenticação, assumindo que req.user está presente


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
    const newPost = await createPost(userId, title, content, area, link, imgFile);
    res.status(201).json({ message: 'Post created successfully!', post: newPost });
  } catch (error) {
    next(error); 
  }
};

/**
 * Obtém todos os posts e os retorna na resposta
 */
export const getAllPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const posts = await fetchAllPosts();
    res.status(200).json({ posts });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtém todos os posts de um usuário específico
 */
export const getPostsByUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId } = req.params;

  try {
    const posts = await fetchPostsByUser(userId); // Chama a função que busca os posts do usuário
    if (posts.length === 0) {
      res.status(404).json({ message: 'No posts found for this user' });
      return;
    }
    res.status(200).json({ posts });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtém um post pelo ID e retorna os dados do post, incluindo o usuário que o criou
 */
export const getPostById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  try {
    const post = await fetchPostById(id); // Chama a função que busca o post com o usuário populado
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }
    res.status(200).json({ post }); // A resposta agora inclui o post e o usuário
  } catch (error) {
    next(error);
  }
};

/**
 * Atualiza um post pelo ID com os novos dados fornecidos
 */
export const updatePost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedPost = await modifyPost(id, updatedData);
    if (!updatedPost) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }
    res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
  } catch (error) {
    next(error); 
  }
};

/**
 * Deleta um post pelo ID
 */
export const deletePostById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedPost = await removePost(id);
    if (!deletedPost) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    next(error); 
  }
};
