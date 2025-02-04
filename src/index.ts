import express from 'express'
import rateLimit from 'express-rate-limit';
import { Router, Request, Response } from 'express'
import mongoose from 'mongoose'
import { config } from './config/config'
import postRouter from './routes/postRouter'
import userRoutes from './routes/userRouter'
import bodyParser from 'body-parser';
import cors from 'cors';


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, 
  legacyHeaders: false, 
});



const server = express()
const route = Router()

// 🛑 Adicione o middleware CORS antes das rotas
server.use(cors({
  origin: 'http://localhost:3001', // Permitir apenas essa origem
  methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
  allowedHeaders: 'Content-Type,Authorization' // Cabeçalhos permitidos
}));


server.use(express.json())
server.use(route)
server.use(express.urlencoded({ limit: '10mb', extended: true }));
server.use(bodyParser.json({ limit: '10mb' }));  
server.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
server.use(limiter);



mongoose
  .connect(config.mongo.url)
  .then(() => console.log('Connected!'))
  .catch((err) => console.error('Connection error:', err))


server.use('/api/post', postRouter) //Routes for create costumers info
server.use('/api/users', userRoutes) //Routes for login

server.listen(3000, () => console.log(`Server is running on port ${3000}`))
