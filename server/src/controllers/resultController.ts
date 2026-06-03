// Responsible for handling saving match results
// Save and retrieve battle stats.
//Dependencies
import Match from '../models/MatchResult';
import { Response } from 'express';
import AuthRequest from '../types/AuthRequest';
import User from '../models/User';
import Battle from '../models/Battle';
import Enemy from '../models/Enemy';

async function createMatch(req: AuthRequest, res: Response) {
    try {
        // playerId is injected by auth middleware after JWT verification.
        const playerId = req.user?.userId;

        // Expected match payload from client after a battle ends.
        const { battleId, result, wpm, accuracy } = req.body;

        // Guard against unauthenticated requests or incomplete match stats.
        if (!battleId || !playerId || !result || wpm === undefined || accuracy === undefined) {
            return res.status(400).json({ message: "Match Result Error: Invalid/Missing Credentials" });
        };

        const battle = await Battle.findById(battleId);
        if (!battle) {
            // Token was valid, but the related user record no longer exists.
            return res.status(404).json({ message: "Battle Error: Battle Not Found" });
        }

        // Prevent users from submitting results for someone else's battle.
        if (battle.playerId.toString() !== playerId) {
            return res.status(403).json({
                message: "Battle Error: Unauthorized Battle Access"
            });
        }

        // Stop duplicate submissions once this battle has already been finalized.
        if (battle.status === 'completed') {
            return res.status(409).json({
                message: 'Battle Error: Battle Already Completed'
            });
        }

        const enemy = await Enemy.findById(battle.enemyId);
        if (!enemy) {
            return res.status(404).json({ message: 'Battle Error: Enemy Not Found' })
        }

        // Single match result document for later stats/history queries.
        const match = await Match.create({
            playerId,
            battleId: battle._id,
            enemyId: enemy._id,
            enemyName: enemy.name,
            arena: enemy.arena,
            result,
            wpm,
            accuracy
        });

        battle.status = 'completed';

        await battle.save();

        const resultText = result === 'win' ? enemy.defeatText : enemy.victoryText;

        // Load the player document so we can update battle stats.
        const RUser = await User.findById(playerId);
        if (!RUser) {
            // Token was valid, but the related user record no longer exists.
            return res.status(404).json({ message: "Match Result Error: Credentials Not Found" });
        }

        // Apply match outcome to lifetime counters (win or loss), then increment total matches played.
        result === 'win' ? RUser.wins++ : RUser.losses++;
        RUser.totalMatches++;

        if (wpm > RUser.highestWpm) {
            RUser.highestWpm = wpm;
        }

        // Persist the updated user stats after saving this match.
        await RUser.save();

        return res.status(201).json({
            message: "Match Saved Successfully!",
            match: match,
            resultText
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Match Results Error: Internal Server Error"
        });
    }
}

async function getMatchHistory(req: AuthRequest, res: Response) {
    try {
        const playerId = req.user?.userId;
        if (!playerId) {
            return res.status(401).json({ message: "Match History Error: Invalid/Missing Credentials" });
        }

        const matches = await Match.find({ playerId }).sort({ createdAt: -1 });
        return res.status(200).json(matches);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Match History Error: Internal Server Error"
        });
    }
}

export { createMatch, getMatchHistory };