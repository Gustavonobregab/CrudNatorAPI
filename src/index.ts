import express from 'express'
import rateLimit from 'express-rate-limit';
import { Router, Request, Response } from 'express'
import mongoose from 'mongoose'
import { config } from './config/config'
import postRouter from './routes/postRouter'
import userRoutes from './routes/userRouter'
import bodyParser from 'body-parser';
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger_output.json");
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

// Middlewares
server.use(express.json())
server.use(route)
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
server.use(express.urlencoded({ limit: '10mb', extended: true }));
server.use(bodyParser.json({ limit: '10mb' }));  
server.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
server.use(limiter);

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
  console.log(`Server running on http://localhost:${PORT}`),
  console.log(`Documentation running on http://localhost:${PORT}/docs`)
})