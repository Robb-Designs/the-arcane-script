// Responsible for handling enemy data

// Dependencies
import { Request, Response } from "express";
import Enemy from "../models/Enemy";

async function getEnemies(req: Request, res: Response) {
    try {
        // Get every enemy document from the database.
        const enemies = await Enemy.find({});

        // Send full enemy list to client.
        return res.status(200).json(enemies);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Enemy Error: Internal Server Error"
        });
    }
}

async function getEnemyByDifficulty(req: Request, res: Response) {
    try {
        // Read requested difficulty from route params.
        const { difficulty } = req.params;

        // Allowed difficulty values for validation.
        const validDifficulties = [
            'novice',
            'adept',
            'master'
        ];

        // Reject invalid param shapes.
        if (Array.isArray(difficulty)) {
            return res.status(400).json({
                message: 'Invalid difficulty'
            });
        }

        // Reject missing or unsupported difficulty values.
        if (!difficulty || !validDifficulties.includes(difficulty)) {
            return res.status(400).json({
                message: 'Invalid difficulty'
            });
        }

        // Fetch enemies that match the requested difficulty.
        const enemies = await Enemy.find({ difficulty: difficulty as "novice" | "adept" | "master" });

        // Return 404 when no enemies exist for that tier.
        if (enemies.length === 0) {
            return res.status(404).json({
                message: "No enemies found for this difficulty"
            });
        };

        // Pick one random enemy from the filtered results.
        const randomIndex = Math.floor(Math.random() * enemies.length);
        const enemy = enemies[randomIndex];

        // Send the selected enemy.
        return res.status(200).json(enemy);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Enemy Error: Internal Server Error"
        });
    }
}

export { getEnemies, getEnemyByDifficulty };