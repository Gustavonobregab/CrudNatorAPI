import userModel from '../../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../../config/config';

/**
 * Creates a new user by checking if the email and username are already taken, 
 * hashes the password, and stores the new user in the database.
 * @param username - The username of the new user.
 * @param email - The email of the new user.
 * @param passwordRaw - The raw password to be hashed.
 */
export const createUser = async (username: string, email: string, passwordRaw: string, _description: any) => {
  const existingUser = await userModel.findOne({ email }).exec();
  if (existingUser) {
    throw new Error('Email already taken. Please choose a different one.');
  }

  const existingUsername = await userModel.findOne({ username }).exec();
  if (existingUsername) {
    throw new Error('Username already taken. Please choose a different one.');
  }

  const passwordHashed = await bcrypt.hash(passwordRaw, 10);
  console.log("PasswordHashed:", passwordHashed);

  const newUser = await userModel.create({
    username: username,
    email: email,
    password: passwordHashed,
    description: _description,
  });

  return newUser;
};

/**
 * Logs in a user by verifying their email and password.
 * If valid, returns a JWT token for further authentication.
 * @param email - The email of the user attempting to log in.
 * @param password - The password provided by the user.
 */
export const loginUsers = async (email: string, password: string) => { 

    // Checking user, remember the password must be handled separately for security
    const user = await userModel.findOne({ email }).select('+password').exec();
    if (!user) {
      throw new Error('User not found.');
    }

    // Verifying if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials.');
    }

    // Creating the JWT
    const token = jwt.sign({ id: user.id }, config.jwt.secret, { expiresIn: '8h' });
    console.log('JWT Token:', token);

    return token;
};

/**
 * Fetches all users from the database.
 */
export const getAllUsers = async () => {
  const users = await userModel.find();
  return users;
};

/**
 * Fetches a user by their ID.
 * @param id - The ID of the user to fetch.
 */
export const getUserById = async (id: string) => {
  const user = await userModel.findById(id);
  return user;
};
