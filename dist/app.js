import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { neigbourhoodRouter } from './user/neighbourhood.routes.js';
import { localityRouter } from './user/locality.routes.js';
import { userRouter } from './user/user.routes.js';
import { membershipRouter } from './user/membership.routes.js';
import { membershipTypeRouter } from './user/membershipType.routes.js';
import { paymentRouter } from './user/payment.routes.js';
import { sportRouter } from './user/sport.routes.js';
import { orm } from './shared/db/orm.js';
import { RequestContext } from '@mikro-orm/core';
import { authRouter } from './user/auth.routes.js';
const app = express();
// Configurar CORS
app.use(cors());
// Middleware para parsing de JSON
app.use(express.json());
// Middleware de contextos de MikroORM (no lo muevas)
app.use((req, res, next) => {
    RequestContext.create(orm.em, next);
});
// Rutas de la aplicación
app.use('/api/user/sport', sportRouter);
app.use('/api/user/payment', paymentRouter);
app.use('/api/user/membershipType', membershipTypeRouter);
app.use('/api/user/membership', membershipRouter);
app.use('/api/user/neighbourhood', neigbourhoodRouter);
app.use('/api/user/locality', localityRouter);
app.use('/api/user', userRouter);
app.use('/api/user/auth', authRouter);
// Manejo de errores (404)
app.use((_, res) => {
    return res.status(404).send({ message: 'Resource not found' });
});
// Inicializa el servidor
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
//# sourceMappingURL=app.js.map