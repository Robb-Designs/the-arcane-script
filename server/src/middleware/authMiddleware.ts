// Responsible for verifying JWT token
// Dependencies
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define interface structure for token payload
interface AuthRequest extends Request {
    user?: {
        userId: string;
    };
}

function tokenAuth(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            res.status(401).json({
                message: "Invalid/Missing credentials"
            });
            return;
        }

        const [scheme, token] = authHeader.split(" ");
        if (scheme !== "Bearer" || !token) {
            res.status(401).json({ message: "Invalid/Missing credentials" });
            return;
        }
    } catch {

    }
}