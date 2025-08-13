import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({
            success: false,
            message: "Not Authorized. Login Again"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET!);
        //@ts-ignore
        req.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "Token verification failed"
        });
    }
};


export default authMiddleware;