// User-related URLs.

// Dependencies
import { Router } from 'express';
import tokenAuth from '../middleware/authMiddleware';
import getProfile from '../controllers/userController';

const userRoutes = Router();

// Route Points
userRoutes.get('/profile', tokenAuth, getProfile);

export default userRoutes;