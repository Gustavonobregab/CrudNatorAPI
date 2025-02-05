"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const postRouter_1 = __importDefault(require("./routes/postRouter"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const body_parser_1 = __importDefault(require("body-parser"));
const server = (0, express_1.default)();
const route = (0, express_2.Router)();
server.use(express_1.default.json());
server.use(route);
server.use(express_1.default.urlencoded({ limit: '10mb', extended: true }));
server.use(body_parser_1.default.json({ limit: '10mb' })); // Ajuste o valor conforme necessário
server.use(body_parser_1.default.urlencoded({ limit: '10mb', extended: true }));
mongoose_1.default
    .connect(config_1.config.mongo.url)
    .then(() => console.log('Connected!'))
    .catch((err) => console.error('Connection error:', err));
server.use('/api/post', postRouter_1.default); //Routes for create costumers info
server.use('/api/users', userRouter_1.default); //Routes for login
exports.default = server;
