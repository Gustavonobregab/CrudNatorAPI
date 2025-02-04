import dotenv from 'dotenv'

dotenv.config()

const MONGO_USERNAME = process.env.MONGO_USERNAME  
const MONGO_PASSWORD = process.env.MONGO_PASSWORD  
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@crudnatordb.whkxk.mongodb.net/?retryWrites=true&w=majority&appName=CrudNatorDB`

const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 1337

const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecretKey'

export const config = {
  mongo: {
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
  },
  jwt: {
    secret: JWT_SECRET,
  }
}

