import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { roleRouter } from './user/role.routes.js';
import { provinceRouter } from './user/province.routes.js';
import { localityRouter } from './user/locality.routes.js';
import { userRouter } from './user/user.routes.js';
import { membershipRouter } from './user/membership.routes.js';
import { membershipTypeRouter } from './user/membershipType.routes.js';
import { paymentRouter } from './user/payment.routes.js';
import { sportRouter } from './user/sport.routes.js';
import { orm } from './shared/db/orm.js';
import { RequestContext } from '@mikro-orm/core';
import { authRouter } from './user/auth.routes.js';
export const app = express();
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.use(express.json());
app.use((req, res, next) => {
    RequestContext.create(orm.em, next);
});
app.use('/api/user/role', roleRouter);
app.use('/api/user/sport', sportRouter);
app.use('/api/user/payment', paymentRouter);
app.use('/api/user/membershipType', membershipTypeRouter);
app.use('/api/user/membership', membershipRouter);
app.use('/api/user/province', provinceRouter);
app.use('/api/user/locality', localityRouter);
app.use('/api/user/user', userRouter);
app.use('/api/user/auth', authRouter);
app.use((_, res) => {
    return res.status(404).send({ message: 'Resource not found' });
});
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
//# sourceMappingURL=app.js.map