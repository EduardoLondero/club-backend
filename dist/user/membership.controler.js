import { orm } from '../shared/db/orm.js';
import { Membership } from './membership.entity.js';
import { ObjectId } from '@mikro-orm/mongodb';
const em = orm.em;
function sanitizeMembershipInput(req, res, next) {
    req.body.sanitizedInput = {
        membershipNumber: req.body.membershipNumber,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        user: req.body.user,
        type: req.body.type,
        payments: req.body.payments,
        sports: req.body.sports
    };
    Object.keys(req.body.sanitizedInput).forEach(key => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}
async function findAll(req, res) {
    try {
        console.log('Iniciando consulta para encontrar todas las membresías...');
        const memberships = await em.find(Membership, {}, { populate: ['sports', 'payments'] });
        res.status(200).json({ message: 'found all Memberships', data: memberships });
    }
    catch (error) {
        console.error('Error al encontrar las membresías:', error);
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = req.params.id;
        const membership = await em.findOneOrFail(Membership, { _id: new ObjectId(id) }, { populate: ['sports', 'payments'] });
        res.status(200).json({ message: 'found user', data: membership });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const membership = em.create(Membership, req.body.sanitizedInput);
        await em.flush();
        res.status(201).json({ message: 'Membership created', data: membership });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = req.params.id;
        // Asegúrate de esperar el resultado de `findOneOrFail`
        const memberhsip = await em.findOneOrFail(Membership, { _id: new ObjectId(id) });
        // Asignar los valores actualizados desde `req.body.sanitizedInput`
        em.assign(memberhsip, req.body.sanitizedInput);
        // Guardar los cambios en la base de datos
        await em.flush();
        res.status(200).json({ message: 'Membership updated successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = req.params.id;
        // Verificar que el ID sea válido (si es necesario)
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        // Verificar si el Character existe
        const membership = await em.findOne(Membership, { _id: new ObjectId(id) });
        if (!membership) {
            return res.status(404).json({ message: 'Membership not found' });
        }
        await em.removeAndFlush(membership);
        res.status(200).json({ message: 'Membership removed successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizeMembershipInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=membership.controler.js.map