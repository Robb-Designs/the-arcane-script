// Game endpoints
// Dependencies
import { Router } from 'express';
import tokenAuth from '../middleware/authMiddleware';
import startBattle from '../controllers/gameController';

const gameRoutes = Router();

// Router Points
gameRoutes.post('/battle/start', tokenAuth, startBattle);

export default gameRoutes;