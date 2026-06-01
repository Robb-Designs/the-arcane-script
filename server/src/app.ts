// App configuration

// Dependencies
import express from 'express';
const app = express();

// MidddleWare
app.use(express.json()); //parsing the incoming json before reaching any routes

export default app;