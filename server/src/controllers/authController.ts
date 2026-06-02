// Responsible for handling registry, login, JWT logic
//Handle auth requests

import User from '../models/User';
import { Request, Response } from 'express';
import AuthRequest from '../types/AuthRequest';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// creates a new account after validating required fields and checking for existing email or username
async function registerUser(req: Request, res: Response) {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            res.status(400).json({
                message: 'Account details missing'
            });
            return;
        }

        // Prevent duplicate accounts by email or username
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });

        if (existingUser) {
            res.status(400).json({
                message: 'User already exists'
            });
            return;
        }

        // Create user, hash password, and return success 
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            username: username,
            email: email,
            password: hashedPassword
        });

        return res.status(201).json({ message: "Registration Successful!" })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

async function loginUser(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        // Reject incomplete login requests
        if (!email || !password) {
            res.status(400).json({
                message: "Request Error: Account details missing"
            });
            return;
        }

        // Look up the user by email before checking the password
        const user = await User.findOne({ email })
        if (!user) {
            res.status(401).json({
                message: "Invalid credentials"
            });
            return;
        }
        // Compare incoming password against stored hash
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(401).json({
                message: "Invalid credentials"
            });
            return;
        }
        // Checking if secret key exist
        if (!process.env.JWT_SECRET) {
            throw new Error("Signature is missing");
        }

        // Creating jwt for login memory for later reqs
        const token = jwt.sign(
            { userId: user._id, },
            process.env.JWT_SECRET,
            { expiresIn: '3d' }
        );

        return res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

}

async function getCurrentUser(req: AuthRequest, res: Response) {
    try {
        // Read authenticated user id set earlier by tokenAuth middleware
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized/ Missing Credentials"
            })
        }
        // Query database for the currently authenticated user
        const foundUser = await User.findById(userId)
        if (!foundUser) {
            return res.status(404).json({
                message: "Unable to find user"
            })
        }
        // Return profile data (exclude password and sensitive info)
        return res.status(200).json({
            id: foundUser._id,
            username: foundUser.username,
            email: foundUser.email,
            wins: foundUser.wins,
            losses: foundUser.losses,
            totalMatches: foundUser.totalMatches,
            averageAccuracy: foundUser.averageAccuracy,
            highestWpm: foundUser.highestWpm
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error getting user: Internal Server Error"
        });
    }

}

export { registerUser, loginUser, getCurrentUser };