import { InferSchemaType, model, Schema } from 'mongoose'

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    get: obfuscate, 
    required: true,
    select: false,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  description: { 
    type: String,
    select: true,
  }
});

function obfuscate(value: string): string {
  if (!value) return ''; 
  const separatorIndex = value.indexOf('@');
  if (separatorIndex < 3) {
    return value.slice(0, separatorIndex).replace(/./g, '*') + value.slice(separatorIndex);
  }
  return value.slice(0, 2) + value.slice(2, separatorIndex).replace(/./g, '*') + value.slice(separatorIndex);
}



type User = InferSchemaType<typeof userSchema>
export default model<User>('User', userSchema)
