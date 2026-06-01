// Launch App

// Dependencies
import app from './src/app';
import dotenv from 'dotenv';

dotenv.config();
const PORT = Number(process.env.PORT) || 5000; // Number: explicity for TypeScript

// PORT
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})