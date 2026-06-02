// Responsible for defining the battle result model blueprint
// Dependencies
import mongoose from "mongoose";

interface IMatch {
    playerId: mongoose.Types.ObjectId;
    result: 'win' | 'loss';
    wpm: number;
    accuracy: number;
    completedAt: Date
};