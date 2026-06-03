// Responsible for defining the battle result model blueprint
// Dependencies
import mongoose from "mongoose";

interface IMatch {
    playerId: mongoose.Types.ObjectId;
    battleId: mongoose.Types.ObjectId;
    enemyId: mongoose.Types.ObjectId;

    enemyName: string;
    arena: string;

    result: 'win' | 'loss';
    wpm: number;
    accuracy: number;
    completedAt: Date;
};

const matchSchema = new mongoose.Schema<IMatch>({
    playerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },// Stores a reference to the User collection for lookups/population
    battleId: {type: mongoose.Schema.Types.ObjectId, ref: 'Battle', required: true},
    enemyId: {type: mongoose.Schema.Types.ObjectId, ref: 'Enemy', required: true},
    enemyName: {type: String, required: true},
    arena: {type: String, required: true},
    result: { type: String, enum: ["win", "loss"], required: true },
    wpm: { type: Number, default: 0, required: true },
    accuracy: { type: Number, default: 0, required: true },
    completedAt: { type: Date, default: Date.now }

}, {
    timestamps: true
});

const Match = mongoose.model<IMatch>('Match', matchSchema);

export default Match;