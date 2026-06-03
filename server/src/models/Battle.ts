// Responsible for defining battle session records
// Tracks active and completed battles between players and enemies.
// Dependencies
import mongoose from "mongoose";

// Interface
interface IBattle {
    playerId: mongoose.Types.ObjectId;
    enemyId:mongoose.Types.ObjectId;
    status: 'active' | 'completed';
    startedAt: Date;
}

const battleSchema = new mongoose.Schema<IBattle>({
    playerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    enemyId: {type: mongoose.Schema.Types.ObjectId, ref: 'Enemy', required: true},
    status: {type: String, enum: ['active', 'completed'], default: 'active', required: true},
    startedAt: {type: Date, default: Date.now}
}, {
    timestamps: true
})

const Battle = mongoose.model<IBattle>('Battle', battleSchema);

export default Battle;