// Enemy endpoints

// Dependencies
import {Router} from 'express';
const enemyRouter = Router();
import getEnemies from '../controllers/enemyController';

// Routes
enemyRouter.get('/enemies', getEnemies);

export default enemyRouter;