import request from 'supertest';
import express from 'express';
import { sportRouter } from '../user/sport.routes.js';
import { expect } from 'chai';
import { orm } from '../shared/db/orm.js';
import { RequestContext } from '@mikro-orm/core';
const app = express();
app.use(express.json());
app.use((req, res, next) => {
    RequestContext.create(orm.em, () => next());
});
app.use('/sports', sportRouter);
app.use((_, res) => {
    return res.status(404).send({ message: 'Resource not found' });
});
describe('Deportes API', function () {
    describe('Integración con base de datos', function () {
        it('debe devolver deportes con datos correctos desde la base de datos', async function () {
            const response = await request(app).get('/sports');
            expect(response.status).to.equal(200);
            expect(response.body.data).to.be.an('array');
            expect(response.body.data[0]).to.have.property('sportName');
            expect(response.body.data[0]).to.have.property('schedule');
        });
    });
    describe('GET /sports', function () {
        it('debe retornar una lista de deportes', async function () {
            const response = await request(app).get('/sports');
            console.log(response.status);
            console.log(response.body);
            expect(response.status).to.equal(200);
            expect(response.body.data).to.be.an('array');
        });
    });
    describe('POST /sports', function () {
        it('debe retornar un error 400 si falta un campo obligatorio', async function () {
            const response = await request(app).post('/sports').send({
                schedule: '10:00',
                scheduleEnd: '12:00',
                price: 5000,
                memberships: []
            });
            console.log(response.status);
            console.log(response.body);
            expect(response.status).to.equal(400);
        });
    });
});
//# sourceMappingURL=sport.controller.test.js.map