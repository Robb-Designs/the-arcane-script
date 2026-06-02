// Battle result endpoints
import { Router } from 'express';
const resultRouter = Router()
import tokenAuth from '../middleware/authMiddleware';
import createMatch from '../controllers/resultController';

resultRouter.post('/match', tokenAuth, createMatch);

export default resultRouter;