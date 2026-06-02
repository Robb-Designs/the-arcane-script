// Dependencies
import { Request } from 'express';

// Types
// Define interface structure for token payload
interface AuthRequest extends Request {
    user?: {
        userId: string;
    };
}

export default AuthRequest;