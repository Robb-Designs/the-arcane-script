// Enemy endpoints

// Dependencies
import {Router} from 'express';
import {getEnemies, getEnemyByDifficulty} from '../controllers/enemyController';
const enemyRoutes = Router();

// Routes
enemyRoutes.get('/', getEnemies);

enemyRoutes.get('/difficulty/:difficulty', getEnemyByDifficulty);

export default enemyRoutes;