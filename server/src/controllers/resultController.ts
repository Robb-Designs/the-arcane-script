// Responsible for handling saving match results
// Save and retrieve battle stats.
//Dependencies
import Match from '../models/MatchResult';
import { Response } from 'express';
import AuthRequest from '../types/AuthRequest';

async function createMatch(req: AuthRequest, res: Response) {
    try {
        // playerId is injected by auth middleware after JWT verification.
        const playerId = req.user?.userId;

        // Expected match payload from client after a battle ends.
        const { result, wpm, accuracy } = req.body;

        // Guard against unauthenticated requests or incomplete match stats.
        if (!playerId || !result || wpm === undefined || accuracy === undefined) {
            return res.status(400).json({ message: "Match Result Error: Invalid/Missing Credentials" })
        };

        // Single match result document for later stats/history queries.
        const match = await Match.create({
            playerId,
            result,
            wpm,
            accuracy
        });

        return res.status(201).json({
            message: "Match Saved Successfully!",
            match: match
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Match Results Error: Internal Server Error"
        });
    }
}

export default createMatch;