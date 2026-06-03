// Responsible for defining the enemy model blueprint

// Dependencies
import mongoose from "mongoose";


// Interface
interface IEnemy {
    name: string;
    difficulty: 'novice' | 'adept' | 'master';
    baseWpm: number;
    health: number
};

// Enemy schema model
const enemySchema = new mongoose.Schema<IEnemy>({
    name: { type: String, required: true },
    difficulty: { type: String, enum: ['novice', 'adept', 'master'], required: true },
    baseWpm: { type: Number, required: true },
    health: { type: Number, required: true }
},
    {
        timestamps: true
    });

const Enemy = mongoose.model('Enemy', enemySchema);

export default Enemy;
