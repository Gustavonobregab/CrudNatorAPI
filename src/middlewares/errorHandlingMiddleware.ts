import { Request, Response, NextFunction } from 'express';

/**
 * Classe de erro personalizada para capturar erros específicos da aplicação.
 */
class AppError extends Error {
    public errorCode?: string;

    public statusCode: number;
  
    constructor(message: string, statusCode: number, errorCode?: string) {
        super(message);
        this.errorCode = errorCode;
        this.statusCode = statusCode;

    }
}

/**
 * Middleware global de tratamento de erros
 */
const errorHandlingMiddleware = (error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            message: error.message,
            errorCode: error.errorCode || 'UNKNOWN_ERROR'
        });
    }

    return res.status(500).json({
        message: 'Internal Server Error'
    });
};

export { AppError, errorHandlingMiddleware };
