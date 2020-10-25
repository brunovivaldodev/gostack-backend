import { Router } from 'express';
import ForgotPasswordControllers from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const forgotPasswordControllers = new ForgotPasswordControllers();
const resetPasswordControllers = new ResetPasswordController();

const passwordRouter = Router();

passwordRouter.post('/forgot', forgotPasswordControllers.create);
passwordRouter.post('/reset', resetPasswordControllers.create);

export default passwordRouter;
