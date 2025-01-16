import multer from "multer";
import path from "path";
import { Request } from "express";  // Importando o tipo 'Request' do Express

// Tipagem do arquivo
type File = Express.Multer.File; // Usando 'Express.Multer.File' para tipar o 'file'

// Configuração do armazenamento (storage)
const storage = multer.diskStorage({
    // Função de destino
    destination: function(req: Request, file: File, cb: (error: any, destination: string) => void) {
        cb(null, "uploads/");  // Diretório onde o arquivo será salvo
    },
    // Função de nome do arquivo
    filename: function(req: Request, file: File, cb: (error: any, filename: string) => void) {
        cb(null, Date.now() + path.extname(file.originalname));  // Gerando um nome único para o arquivo com base no timestamp
    }
});

// Criação do middleware de upload com o armazenamento configurado
const upload = multer({ storage });

export default upload;  // Exportando o middleware de upload
