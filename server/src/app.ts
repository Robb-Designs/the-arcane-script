// App configuration

// Dependencies
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
const app = express();

// MidddleWare
app.use(cors()); // Allows my React frontend to talk to my Express backend
app.use(express.json()); // Parsing the incoming json before reaching any routes
app.use('/api/auth', authRoutes)


// Routes
app.get('/', (req, res) => {
    res.json({
        message: "The Arcane Script API"
    });
})

export default app;