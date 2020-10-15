import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UserControllers from '../controllers/UsersControllers';
import UserAvatarControllers from '../controllers/UserAvatarController';
import ensureAuthenticated from '../middlewares/ensureAuthenticate';

const userControllers = new UserControllers();
const userAvatarControllers = new UserAvatarControllers();
const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', userControllers.create);

usersRouter.patch(
    '/',
    ensureAuthenticated,
    upload.single('avatar'),
    userAvatarControllers.update,
);
export default usersRouter;
