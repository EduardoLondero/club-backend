import { Router } from 'express';
import { login, authenticate } from './auth.controler.js';
export const authRouter = Router();
authRouter.post('/login', login);
authRouter.post('/authenticate', authenticate);
//# sourceMappingURL=auth.routes.js.map