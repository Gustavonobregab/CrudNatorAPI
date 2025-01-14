import { InferSchemaType, model, Schema, Types } from 'mongoose';

const postSchema = new Schema(
  {
    author: { type: Types.ObjectId, ref: 'User', required: true }, 
    title: { type: String, required: true },
    content: { type: String, required: true },
    area: { type: String, required: true },
    link: { type: String, required: false }, 
  },
  { timestamps: true } 
);

type Post = InferSchemaType<typeof postSchema>;

export default model<Post>('Post', postSchema);
