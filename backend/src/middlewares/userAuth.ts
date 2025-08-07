import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.headers;

    if (!token || typeof token !== "string") {
        return res.status(403).json({ 
            success: false, 
            message: "Not Authorized. Login Again"
    });
    }

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