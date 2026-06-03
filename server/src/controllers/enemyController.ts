// Responsible for handling enemy data

// Dependencies
import { Request, Response } from "express";
import Enemy from "../models/Enemy";

async function getEnemies(req: Request, res: Response) {
    try {
        const enemies = await Enemy.find({});
        return res.status(200).json(enemies);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Enemy Error: Internal Server Error"
        });
    }
}

export default getEnemies;