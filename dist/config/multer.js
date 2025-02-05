"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Configuração do armazenamento (storage)
const storage = multer_1.default.diskStorage({
    // Função de destino
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Diretório onde o arquivo será salvo
    },
    // Função de nome do arquivo
    filename: function (req, file, cb) {
        cb(null, Date.now() + path_1.default.extname(file.originalname)); // Gerando um nome único para o arquivo com base no timestamp
    }
});
// Criação do middleware de upload com o armazenamento configurado
const upload = (0, multer_1.default)({ storage });
exports.default = upload; // Exportando o middleware de upload
