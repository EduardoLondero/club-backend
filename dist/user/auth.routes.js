import { Router } from 'express';
import { login } from './auth.controler.js';
import { verifyToken } from './auth.middleware.js';
export const authRouter = Router();
authRouter.post('/login', login);
authRouter.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Acceso autorizado', user: req.user });
});
//# sourceMappingURL=auth.routes.js.map