import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// interface UserPayload {
//     id: string;
//     email: string;
// }

declare global {
    namespace Express {
        interface Request {
            currentUser?: any;
        }
    }
}

export const currentUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.cookies.jwt) {
        return next();
    }

    try {
        const payload = jwt.verify(
            req.cookies.jwt,
            process.env.JWT_KEY!
        );
        req.currentUser = payload;
    } catch (err) { }

    next();
};
