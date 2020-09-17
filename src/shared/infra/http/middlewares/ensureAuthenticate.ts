import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}
export default function ensureAuthenticate(
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    const { authorization } = req.headers;

    if (!authorization) {
        throw new AppError('JWT token is missing', 401);
    }

    const [, token] = authorization.split(' ');

    const { secret } = authConfig.jwt;
    try {
        const decoded = verify(token, secret);
        const { sub } = decoded as TokenPayload;

        req.user = {
            id: sub,
        };

        return next();
    } catch {
        throw new AppError('Invalid JWT Token', 401);
    }
}
