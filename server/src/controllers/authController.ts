// Responsible for handling registry, login, JWT logic
//Handle auth requests

import User from "../models/User";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';


// Handle user signup request
async function registerUser(req: Request, res: Response) {
    try {
        // Define required fields from request body
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
                message: 'User already exist'
            });
            return;
        }

        // Create user, hash password, and return success 
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);
        //User.create(); Placeholder for later
    } catch {

    }
}

async function loginUser(req: Request, res: Response) {
    try {

    } catch {

    }
}