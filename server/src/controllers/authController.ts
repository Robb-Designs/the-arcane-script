// Responsible for handling registry, login, JWT logic
//Handle auth requests

import User from '../models/User';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';


// reates a new account after validating required fields and checking for existing email or username
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

        if (!email || !password) {
            res.status(400).json({
                message: "Request Error: Account details missing"
            });
            return;
        }

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

        return res.status(200).json({ message: "Login Successful!" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

}

export {registerUser, loginUser};