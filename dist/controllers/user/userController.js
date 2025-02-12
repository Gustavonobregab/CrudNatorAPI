"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getAllUsers = exports.loginUser = exports.signUp = void 0;
const userService_1 = require("../user/userService");
/**
 * Handles user sign-up by validating the request parameters, creating a new user,
 * and returning a success response with the new user data.
 */
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, description } = req.body;
    try {
        // Validating if username, email, and password are provided
        if (!username || !email || !password) {
            res.status(400).json({ message: 'Parameters Missing!' });
            return;
        }
        // Creating a new user
        const newUser = yield (0, userService_1.createUser)(username, email, password, description);
        res.status(201).json({ message: 'User created successfully!', user: newUser });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            next(error);
        }
    }
});
exports.signUp = signUp;
/**
 * Handles user login by verifying the provided email and password.
 * If valid, returns a JWT token for authentication.
 */
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const foundUser = yield (0, userService_1.loginUsers)(email, password);
        // You should return the JWT or any necessary response here, such as:
        res.status(200).json({ message: 'Login successful', token: foundUser });
    }
    catch (error) {
        next(error); // Forwarding the error to the error-handling middleware
    }
});
exports.loginUser = loginUser;
/**
 * Fetches all users and returns them in the response.
 */
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userService_1.getAllUsers)();
        res.status(200).json({ users });
    }
    catch (error) {
        next(error); // Forwarding the error to the error-handling middleware
    }
});
exports.getAllUsers = getAllUsers;
/**
 * Fetches a user by their ID and returns the user data in the response.
 * @param id - The ID of the user to fetch.
 */
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, userService_1.getUserById)(id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({ user });
    }
    catch (error) {
        next(error); // Forwarding the error to the error-handling middleware
    }
});
exports.getUserById = getUserById;
