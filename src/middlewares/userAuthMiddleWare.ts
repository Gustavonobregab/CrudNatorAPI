import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import userModel from '../models/userModel';
import { config } from '../config/config';

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"

  if (!token) {
    res.status(401).json({ message: 'Authentication token is required.' });
    return;
  }

  try {
    // Verifies the token
    const decoded = jwt.verify(token, config.jwt.secret) as { id: string };

    // Fetch user information from the database to ensure the user still exists
    const user = await userModel.findById(decoded.id);
    if (!user) {
      res.status(404).json({ message: 'User not found. Authentication failed.' });
      return;
    }

    // Attach user ID to the request object
    (req as any).authenticatedUserId = user.id;

    next(); // Proceed to the next middleware/controller
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
};
