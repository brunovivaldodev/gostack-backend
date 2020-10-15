import { Router } from 'express';
import SessionControllers from '../controllers/SessionControllers';

const sessionControllers = new SessionControllers();
const sessionsRouter = Router();

sessionsRouter.post('/', sessionControllers.create);

export default sessionsRouter;
