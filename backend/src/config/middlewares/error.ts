import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../helpers/Api-error';

export const errosMiddlware = (
    error: Error & Partial<ApiError>,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = error instanceof ApiError ? error.statusCode : 500;
    const message = error.message || 'Internal server Error';

    return res.status(statusCode).json({ message });
};
