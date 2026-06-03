// Responsible for handling profile and stats
// User-related request logic
// Dependencies
import { Response } from "express";
import AuthRequest from "../types/AuthRequest";
import User from "../models/User";



async function getProfile(req: AuthRequest, res: Response) {
    try {
        // Read player id populated by auth middleware.
        const playerId = req.user?.userId;

        // Block requests that do not have a valid authenticated user.
        if (!playerId) {
            return res.status(400).json({ message: "Profile Error: Invalid/Missing Credentials" });
        }

        // Load the user record tied to this player id.
        const user = await User.findById(playerId);
        if (!user) {
            return res.status(404).json({ message: "Profile Error: User Not Found" });
        }

        // Return only profile and stats fields needed by the client.
        return res.status(200).json({
            username: user.username,
            wins: user.wins,
            losses: user.losses,
            totalMatches: user.totalMatches,
            highestWpm: user.highestWpm
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Profile Error: Internal Server Error"
        });
    }
}

export default getProfile;