// Responsible for defining the enemy model blueprint

// Dependencies
import mongoose from "mongoose";


// Interface
interface IEnemy {
    name: string;
    sprite: string;
    difficulty: 'novice' | 'adept' | 'master';
    arena: string;
    baseWpm: number;
    health: number;
    introText: string;
    defeatText: string;
    victoryText: string;
};

// Enemy schema model
const enemySchema = new mongoose.Schema<IEnemy>({
    name: { type: String, required: true },
    sprite: {type: String, required: true},
    difficulty: { type: String, enum: ['novice', 'adept', 'master'], required: true },
    arena: {type: String, required: true},
    baseWpm: { type: Number, required: true },
    health: { type: Number, required: true },
    introText: {type: String, required: true},
    defeatText: {type: String, required: true},
    victoryText: {type: String, required: true}
},
    {
        timestamps: true
    });

const Enemy = mongoose.model<IEnemy>('Enemy', enemySchema);

export default Enemy;
