import { orm } from '../shared/db/orm.js';
import { MembershipType } from './membershipType.entity.js';
import { Membership } from './membership.entity.js';
const em = orm.em;
async function sanitizeMembershipTypeInput(req, res, next) {
    try {
        const memberships = [];
        if (Array.isArray(req.body.memberships)) {
            for (const membershipId of req.body.memberships) {
                const membership = await em.findOne(Membership, { id: membershipId });
                if (membership) {
                    memberships.push(membership);
                }
            }
        }
        req.body.sanitizedInput = {
            description: req.body.description,
            price: req.body.price,
            benefits: req.body.benefits,
            requirements: req.body.requirements,
            memberships,
        };
        Object.keys(req.body.sanitizedInput).forEach((key) => {
            if (req.body.sanitizedInput[key] === undefined) {
                delete req.body.sanitizedInput[key];
            }
        });
        next();
    }
    catch (error) {
        res.status(500).json({ message: `Error sanitizing input: ${error.message}` });
    }
}
async function findAll(req, res) {
    try {
        const membershipTypes = await em.find(MembershipType, {}, { populate: ['memberships'] });
        res.status(200).json({ message: 'Todos los tipos de membresia encontrados', data: membershipTypes });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Formato de ID invalido' });
        }
        const membershipTypes = await em.findOneOrFail(MembershipType, {}, { populate: ['memberships'] });
        res.status(200).json({ message: 'Tipo de membresia encontrado', data: membershipTypes });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const { sanitizedInput } = req.body;
        const membershipType = em.create(MembershipType, {
            description: sanitizedInput.description,
            price: sanitizedInput.price,
            benefits: sanitizedInput.benefits,
            requirements: sanitizedInput.requirements,
            memberships: sanitizedInput.memberships,
        });
        await em.flush();
        res.status(201).json({ message: 'Tipo de membresia creado', data: membershipType });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Formato de ID invalido' });
        }
        const membershipTypeToChange = await em.findOneOrFail(MembershipType, { id });
        const { sanitizedInput } = req.body;
        em.assign(membershipTypeToChange, {
            description: sanitizedInput.description,
            price: sanitizedInput.price,
            benefits: sanitizedInput.benefits,
            requirements: sanitizedInput.requirements,
            memberships: sanitizedInput.memberships,
        });
        await em.flush();
        res.status(200).json({ message: 'Tipo de Membresia actualizado correctamente' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Formato de ID invalido' });
        }
        const membershipType = await em.findOne(MembershipType, { id });
        if (!membershipType) {
            return res.status(404).json({ message: 'Tipo de membresia no encontrado' });
        }
        await em.removeAndFlush(membershipType);
        res.status(200).json({ message: 'Tipo de membresia eliminado correctamente' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizeMembershipTypeInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=membershipType.controler.js.map