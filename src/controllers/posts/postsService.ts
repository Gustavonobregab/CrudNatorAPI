import postModel from '../../models/postModel';

/**
 * Cria um novo post no banco de dados
 * @param title - O título do post
 * @param content - O conteúdo do post
 * @param area - A área do post (por exemplo, tecnologia, ciência, etc.)
 * @param link - O link relacionado ao post
 */
export const createPost = async (userId: string, title: string, content: string, area: string, link: string, /* imgFile: Express.Multer.File */) => {
  const newPost = await postModel.create({author: userId, title, content, area, link,/* image: imgFile.path */});
  return newPost;
};

export const getAllPosts = async (page: number, limit: number) => {
  const skip = (page - 1) * limit; // Calcula o offset
  const posts = await postModel.find().skip(skip).limit(limit); // Adiciona paginação
  const total = await postModel.countDocuments(); // Total de posts no banco
  return { posts, total };
};

/**
 * Obtém todos os posts de um usuário específico
 * @param userId - O ID do usuário cujos posts serão retornados
 */
export const getPostsByUser = async (userId: string) => {
  const posts = await postModel.find({ author: userId }); // Filtra os posts pelo author (userId)
  return posts;
};

/**
 * Obtém um post pelo ID e retorna os dados do post, incluindo o usuário que o criou
 * @param id - O ID do post
 */
export const getPostById = async (id: string) => {
  const post = await postModel.findById(id).populate('author', 'username email'); // Popula o campo 'author' com os dados do usuário
  console.log(post); // Adicione um log para garantir que a referência foi populada corretamente

  return post;
};

/**
 * Atualiza um post pelo ID
 * @param id - O ID do post a ser atualizado
 * @param updatedData - Os dados para atualização (como title, content, area, link, etc.)
 */
export const updatePost = async (id: string, updatedData: { title?: string; content?: string; area?: string; link?: string }) => {
  const updatedPost = await postModel.findByIdAndUpdate(id, updatedData, { new: true });
  return updatedPost;
};

/**
 * Deleta um post pelo ID
 * @param id - O ID do post a ser deletado
 */
export const deletePostById = async (id: string) => {
  const deletedPost = await postModel.findByIdAndDelete(id);
  return deletedPost;
};

/**
 * Busca posts com base em um parâmetro de consulta (termo)
 * @param searchTerm - O termo de busca
 */
export const searchPost = async (searchTerm: string) => {
  const regex = new RegExp(searchTerm, 'i'); 
  const posts = await postModel.find({
    $or: [
      { title: { $regex: regex } },   // Busca no campo 'title'
      { content: { $regex: regex } } // Busca no campo 'content'
    ],
  });

  return posts; 
};  

export const filteredPostsButton = async (searchTerm: string, page: number, limit: number) => {
  const validAreas = ['backend', 'frontend', 'devops', 'uxui'];
  if (!validAreas.includes(searchTerm.toLowerCase())) {
    return { posts: [], total: 0 };
  }

  const skip = (page - 1) * limit;
  const posts = await postModel.find({ area: searchTerm }).skip(skip).limit(limit);
  const total = await postModel.countDocuments({ area: searchTerm });
  
  return { posts, total };
};
