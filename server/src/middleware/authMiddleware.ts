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

