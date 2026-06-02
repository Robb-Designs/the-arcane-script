// Define auth endpoints
// Auth route definitions (public endpoints for account access).

// Dependencies

import { Router } from 'express';
const router = Router()
import {registerUser, loginUser} from '../controllers/authController'


//Routes
// Creates a new user account after validating input and hashing password.
router.post('/register', registerUser)

// Verifies credentials and returns an auth token (JWT) on success.
router.post('/login', loginUser)

export default router;
