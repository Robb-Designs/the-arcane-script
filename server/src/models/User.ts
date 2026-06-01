// Responsible for defining the user model blueprint
import mongoose from "mongoose";

interface IUser {
    username: string,
    email: string,
    password: string,
}

const userSchema = new mongoose.Schema({
    username: { type: String, trim: true, required: true, unique: true },
    email: { type: String, trim: true, lowercase: true, required: true, unique: true },
    password: { type: String, minlength: 8, required: true },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    totalMatches: { type: Number, default: 0 },
    averageAccuracy: { type: Number, default: 0 },
    highestWpm: { type: Number, default: 0 },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);