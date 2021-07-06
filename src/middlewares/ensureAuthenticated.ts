import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).end();
    }

    const [, token] = authHeader.split(' ');

    try {
        const { sub } = verify(
            token,
            'ead3ffd5c8e34197722a2db745b81b82',
        ) as IPayload;

        request.user_id = sub;
    } catch (err) {
        return response.status(401).end();
    }

    return next();
}
