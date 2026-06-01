// Launch App

// Dependencies
import app from './src/app';
import dotenv from 'dotenv';
import connectDB from './src/config/db';

dotenv.config();
const PORT = Number(process.env.PORT) || 5000; // Number: explicity for TypeScript

//Database Connection
const startServer = async () => {
     try {
      await connectDB();
      app.listen(PORT, () => {
         console.log(`Server running on http://localhost:${PORT}`)
      });
   } catch(error) {
      console.error('Connection Error: ', error);
   }
};

startServer();

