// Responsible for verifying JWT token
// Dependencies
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AuthRequest from '../types/AuthRequest';

function tokenAuth(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        // Read the Authorization header: "Bearer <token>"
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).json({
                message: "Invalid/Missing credentials"
            });
            
        }
        // Split header into scheme and token, then validate format
        const [scheme, token] = authHeader.split(" ");
        if (scheme !== "Bearer" || !token) {
            return res.status(401).json({ message: "Invalid/Missing credentials" });
            
        }
        // Use server-side secret to verify signature and token
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("Signature is missing");
        }
        // Decode token payload and attach authenticated user context to request
        const payload = jwt.verify(token, secret) as { userId: string }; // TypeScript explicity...
        req.user = { userId: payload.userId };

        next();

    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Invalid token" });
    }
}

export default tokenAuth;