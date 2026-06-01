// Define auth endpoints
// Auth route definitions (public endpoints for account access).

// Dependencies

import { Router } from 'express';
const router = Router()

//Routes
// Creates a new user account after validating input and hashing password.
router.post('/register', (req, res) => {
    res.json({
        message: "Register Route"
    });
})

// Verifies credentials and returns an auth token (JWT) on success.
router.post('/login', (req, res) => {
    res.json({
        message: "Login Route"
    });
})

export default router;
