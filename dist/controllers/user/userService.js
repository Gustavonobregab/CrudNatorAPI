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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getAllUsers = exports.loginUsers = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config/config");
/**
 * Creates a new user by checking if the email and username are already taken,
 * hashes the password, and stores the new user in the database.
 * @param username - The username of the new user.
 * @param email - The email of the new user.
 * @param passwordRaw - The raw password to be hashed.
 */
const createUser = (username, email, passwordRaw, _description) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield userModel_1.default.findOne({ email }).exec();
    if (existingUser) {
        throw new Error('Email already taken. Please choose a different one.');
    }
    const existingUsername = yield userModel_1.default.findOne({ username }).exec();
    if (existingUsername) {
        throw new Error('Username already taken. Please choose a different one.');
    }
    const passwordHashed = yield bcrypt_1.default.hash(passwordRaw, 10);
    console.log("PasswordHashed:", passwordHashed);
    const newUser = yield userModel_1.default.create({
        username: username,
        email: email,
        password: passwordHashed,
        description: _description,
    });
    return newUser;
});
exports.createUser = createUser;
/**
 * Logs in a user by verifying their email and password.
 * If valid, returns a JWT token for further authentication.
 * @param email - The email of the user attempting to log in.
 * @param password - The password provided by the user.
 */
const loginUsers = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    // Checking user, remember the password must be handled separately for security
    const user = yield userModel_1.default.findOne({ email }).select('+password').exec();
    if (!user) {
        throw new Error('User not found.');
    }
    // Verifying if the password is correct
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials.');
    }
    // Creating the JWT
    const token = jsonwebtoken_1.default.sign({ id: user.id }, config_1.config.jwt.secret, { expiresIn: '8h' });
    console.log('JWT Token:', token);
    return token;
});
exports.loginUsers = loginUsers;
/**
 * Fetches all users from the database.
 */
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userModel_1.default.find();
    return users;
});
exports.getAllUsers = getAllUsers;
/**
 * Fetches a user by their ID.
 * @param id - The ID of the user to fetch.
 */
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(id);
    return user;
});
exports.getUserById = getUserById;
