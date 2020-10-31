import { Router } from 'express';
import ProfileControllers from '../controllers/ProfileControllers';
import ensureAuthenticated from '../middlewares/ensureAuthenticate';

const profileControllers = new ProfileControllers();
const profileRouter = Router();
profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileControllers.show);
profileRouter.put('/', profileControllers.passwordupdate);

export default profileRouter;
