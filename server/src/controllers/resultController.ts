// Responsible for handling saving match results
// Save and retrieve battle stats.
//Dependencies
import Match from '../models/MatchResult';
import { Response } from 'express';
import AuthRequest from '../types/AuthRequest';

async function createMatch(req: AuthRequest, res: Response) {
    try {
        const playerId = req.user?.userId;
        const { result, wpm, accuracy } = req.body;
        if (!playerId || !result || wpm === undefined || accuracy === undefined) {
            return res.status(400).json({ message: "Match Result Error: Invalid/Missing Credentials" })
        };

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