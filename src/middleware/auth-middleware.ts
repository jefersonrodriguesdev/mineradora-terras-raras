import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ error: "Token não fornecido" });
        return;
    }

    const [, token] = authHeader.split(' '); // Separa o "Bearer" do "token"

    try {
        const decoded = jwt.verify(token, "minera-secret-key-2026");
        (req as any).user = decoded; // Anexa os dados do operador à requisição
        next();
    } catch (err) {
        res.status(401).json({ error: "Token inválido ou expirado" });
    }
};