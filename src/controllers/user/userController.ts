import { Request, Response, NextFunction } from 'express';
import { createUser, getAllUsers as fetchAllUsers, getUserById as fetchUserById, loginUsers } from '../user/userService';

/**
 * Handles user sign-up by validating the request parameters, creating a new user, 
 * and returning a success response with the new user data.
 */
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, email, password, description } = req.body;

  try {
    // Validating if username, email, and password are provided
    if (!username || !email || !password) {
      res.status(400).json({ message: 'Parameters Missing!' });
      return;
    }

    // Creating a new user
    const newUser = await createUser(username, email, password, description);
    res.status(201).json({ message: 'User created successfully!', user: newUser });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      next(error);
    }
  }
};

/**
 * Handles user login by verifying the provided email and password.
 * If valid, returns a JWT token for authentication.
 */
export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    console.log('Received email:', email); // Log the email
    console.log('Received password:', password); // Log the password
    
    // Validating if email and password are provided
    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required.' });
      return;
    }

    // Logging in the user and obtaining JWT
    const foundUser = await loginUsers(email, password);
    // You should return the JWT or any necessary response here, such as:
    res.status(200).json({ message: 'Login successful', token: foundUser });
  } catch (error) {
    next(error); // Forwarding the error to the error-handling middleware
  }
};

/**
 * Fetches all users and returns them in the response.
 */
export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await fetchAllUsers();
    res.status(200).json({ users });
  } catch (error) {
    next(error); // Forwarding the error to the error-handling middleware
  }
};

/**
 * Fetches a user by their ID and returns the user data in the response.
 * @param id - The ID of the user to fetch.
 */
export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await fetchUserById(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json({ user });
  } catch (error) {
    next(error); // Forwarding the error to the error-handling middleware
  }
};
