// Word prompts model for database

// Dependencies
import mongoose from "mongoose";

// Interface
interface IWordPrompt {
    text: string;
    arena: string;
    difficulty: 'novice' | 'adept' | 'master';
}

const wordPromptSchema = new mongoose.Schema<IWordPrompt>({
    text: { type: String, required: true },
    arena: { type: String, required: true },
    difficulty: { type: String, enum: ['novice', 'adept', 'master'], required: true }
}, {
    timestamps: true
})

const WordPrompt = mongoose.model<IWordPrompt>('WordPrompt', wordPromptSchema)

export default WordPrompt;