import express from 'express'
import { Router } from 'express'
import mongoose from 'mongoose'
import { config } from './config/config'
import postRouter from './routes/postRouter'
import userRoutes from './routes/userRouter'
import bodyParser from 'body-parser';
import cors from 'cors';

const server = express()
const route = Router()

// Middlewares
server.use(express.json())
server.use(route)
server.use(express.urlencoded({ limit: '10mb', extended: true }));
server.use(bodyParser.json({ limit: '10mb' }));
server.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
server.use(cors())

// Database connection
mongoose
  .connect(config.mongo.url)
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.error('Connection error:', err))

// Routes
server.use('/api/post', postRouter) // Routes for creating customer info
server.use('/api/users', userRoutes) // Routes for login

// Server listener
const PORT = config.server.port || 3000
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})