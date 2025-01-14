import { InferSchemaType, model, Schema, Types } from 'mongoose';

const postSchema = new Schema(
  {
    author: { type: Types.ObjectId, ref: 'User', required: true }, // Referência ao modelo User
    title: { type: String, required: true },
    content: { type: String, required: true },
    area: { type: String, required: true },
    link: { type: String, required: true }, 
    image: { type: String, required: true}
  },
  { timestamps: true } // Campos automáticos de criação e atualização
);

// Definindo o tipo para o Post com base no schema
type Post = InferSchemaType<typeof postSchema>;

// Exportando o modelo para ser usado no controlador
export default model<Post>('Post', postSchema);
