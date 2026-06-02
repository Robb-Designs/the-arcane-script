// Battle result endpoints
import { Router } from 'express';
const resultRouter = Router()
import tokenAuth from '../middleware/authMiddleware';
import { createMatch, getMatchHistory } from '../controllers/resultController';


// Router Points
resultRouter.post('/match', tokenAuth, createMatch);

resultRouter.get('/history', tokenAuth, getMatchHistory);

export default resultRouter;