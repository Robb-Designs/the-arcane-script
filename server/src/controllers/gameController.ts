// Responsible for handling battle init, generate enemy, generate typing prompts
// Respond to game requests
//Dependencies
import Battle from "../models/Battle";
import { Response } from "express";
import AuthRequest from "../types/AuthRequest";
import User from "../models/User";

async function startBattle(req: AuthRequest, res: Response) {
    try {
        const playerId = req.user?.userId;
    } catch (error) {

    }
}