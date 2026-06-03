// Enemy endpoints

// Dependencies
import {Router} from 'express';
import getEnemies from '../controllers/enemyController';
const enemyRoutes = Router();

// Routes
enemyRoutes.get('/', getEnemies);

export default enemyRoutes;