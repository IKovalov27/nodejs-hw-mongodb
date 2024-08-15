import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserSchema, loginUserSchema } from '../validation/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  registerUserController,
  loginUserController,
  refreshTokenUserSessionController,
  logoutUserController,
} from '../controllers/auth.js';

const authRouter = Router();

authRouter.post('/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

authRouter.post('/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

authRouter.post('/logout', ctrlWrapper(logoutUserController));

authRouter.post('/refresh', ctrlWrapper(refreshTokenUserSessionController));

export default authRouter;
