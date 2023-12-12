import { NextFunction, Response } from 'express';
import { AuthService } from '../services/AuthService';

export const authenticateUser = (req: any, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.replace('Bearer ', '');

    if (!token) {
        res.status(401).json({ error: 'Token não fornecido.' });
        return;
    }

    const userId = AuthService.verifyAuthToken(token);

    if (!userId) {
        res.status(401).json({ error: 'Token inválido.' });
        return;
    }

    req.user = {
        id: userId,
    };

    next();
};