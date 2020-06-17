import { Router } from 'express';

import ForgotPasswordControler from '../controllers/ForgotPasswordControler';
import ResetPasswordControler from '../controllers/ResetPasswordControler';

const passwordRouter = Router();
const forgotPasswordControler = new ForgotPasswordControler();
const resetPasswordControler = new ResetPasswordControler();

passwordRouter.post('/forgot', forgotPasswordControler.create);
passwordRouter.post('/reset', resetPasswordControler.create);

export default passwordRouter;
