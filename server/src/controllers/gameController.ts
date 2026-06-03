// Responsible for handling battle init, generate enemy, generate typing prompts
// Respond to game requests
//Dependencies
import Battle from "../models/Battle";
import { Response } from "express";
import AuthRequest from "../types/AuthRequest";
import Enemy from "../models/Enemy";


const validDifficulties = [
    'novice',
    'adept',
    'master'
];

async function startBattle(req: AuthRequest, res: Response) {
    try {
        // Read the current player and chosen difficulty from the request.
        const playerId = req.user?.userId;
        const { difficulty } = req.body;

        // Reject missing or unsupported values.
        if (!playerId) {
            return res.status(401).json({
                message: 'Game Start Error: Invalid/Missing Credentials'
            });
        }

        if (!difficulty || !validDifficulties.includes(difficulty)) {
            return res.status(400).json({
                message: 'Invalid difficulty'
            });
        }

        // Load enemies that match the selected difficulty tier.
        const enemies = await Enemy.find({
            difficulty: difficulty as 'novice' | 'adept' | 'master'
        });

        if (enemies.length === 0) {
            return res.status(404).json({
                message: "No enemies found for this difficulty"
            });
        };

        // Pick one random enemy from the filtered results.
        const randomIndex = Math.floor(Math.random() * enemies.length);
        const enemy = enemies[randomIndex];

        if (!enemy) {
            return res.status(500).json({
                message: "Enemy selection failed"
            });
        }

        // Create and store a new battle session for this player/enemy pair.
        const battle = await Battle.create({
            playerId,
            enemyId: enemy._id
        });

        // Return battle id plus enemy info the client needs to render the encounter.
        return res.status(201).json({
            battleId: battle._id,

            enemy: {
                id: enemy._id,
                name: enemy.name,
                difficulty: enemy.difficulty,
                baseWpm: enemy.baseWpm,
                health: enemy.health,
                introText: enemy.introText
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Game Start Error: Internal Server Error'
        });
    }
}

export default startBattle;