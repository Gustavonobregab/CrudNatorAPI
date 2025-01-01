import { Request, Response, NextFunction } from 'express';
import { 
  createPost, 
  getAllPosts as fetchAllPosts, 
  getPostsByUser as fetchPostsByUser,
  getPostById as fetchPostById, 
  updatePost as modifyPost, 
  deletePostById as removePost,
  searchPost as searchPost,
} from './postsService';

/**
 * Cria um novo post verificando se todos os parâmetros necessários estão presentes
 */
export const newPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { title, content, area, link } = req.body;
  const userId = req.params.userId;

  try {
    if (!title || !content || !area) {
      res.status(400).json({ message: 'Parameters Missing!' });
      return;
    }

    const newPost = await createPost(userId, title, content, area, link);
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
    const posts = await fetchPostsByUser(userId);
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
    const post = await fetchPostById(id);
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }
    res.status(200).json({ post });
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

/**
 * Busca posts com base em um parâmetro de consulta
 */
export const searchPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const param  = req.params.param; 
  try {
    console.log(param)
    const filteredPosts = await searchPost(param)
   
    res.status(200).json({filteredPosts});
  } catch (error) {
    next(error);
  }
};
