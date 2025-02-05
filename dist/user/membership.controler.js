import { orm } from '../shared/db/orm.js';
import { Membership } from './membership.entity.js';
import { User } from '../user/user.entity.js';
import { MembershipType } from '../user/membershipType.entity.js';
import { Sport } from '../user/sport.entity.js';
const em = orm.em;
function sanitizeMembershipInput(req, res, next) {
    req.body.sanitizedInput = {
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        expireDate: req.body.expireDate,
        userId: req.body.oUsuarioId,
        typeId: req.body.oTipo_MembresiaId,
        sportsIds: req.body.sportsIds,
        payments: req.body.payments,
    };
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}
async function findAll(req, res) {
    try {
        const memberships = await em.find(Membership, {}, { populate: ['user', 'type', 'sports', 'payments'] });
        res.status(200).json({ message: 'Todas las membresias encontradas', data: memberships });
    }
    catch (error) {
        console.error('Error al encontrar las membresías:', error);
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Formato de ID invalido' });
        }
        const membership = await em.findOne(Membership, { id }, { populate: ['user', 'type', 'sports', 'payments'] });
        if (!membership) {
            return res.status(404).json({ message: 'Membresia no encontrada' });
        }
        res.status(200).json({ message: 'Membresia encontrada', data: membership });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const { userId, typeId, startDate, expireDate, endDate, sportsIds, payments } = req.body;
        const user = await em.findOne(User, { id: userId });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const type = await em.findOne(MembershipType, { id: typeId });
        if (!type) {
            return res.status(404).json({ message: 'Tipo de membresía no encontrado' });
        }
        const activeMembership = await em.findOne(Membership, {
            user,
            endDate: { $eq: null },
        });
        if (activeMembership) {
            return res.status(400).json({ message: 'Ya tienes una membresía activa' });
        }
        const sports = sportsIds ? await em.find(Sport, { id: sportsIds }) : [];
        const membership = em.create(Membership, {
            startDate,
            endDate,
            expireDate,
            user,
            type,
            sports,
            payments,
        });
        await em.flush();
        res.status(201).json({ message: 'Membresía creada', data: membership });
    }
    catch (error) {
        console.error('Error al crear la membresía:', error);
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Formato de ID invalido' });
        }
        const membership = await em.findOne(Membership, { id });
        if (!membership) {
            return res.status(404).json({ message: 'Membresia no encontrada' });
        }
        const { sanitizedInput } = req.body;
        if (sanitizedInput.userId) {
            const user = await em.findOne(User, { id: sanitizedInput.userId });
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            sanitizedInput.user = user;
        }
        if (sanitizedInput.typeId) {
            const type = await em.findOne(MembershipType, { id: sanitizedInput.typeId });
            if (!type) {
                return res.status(404).json({ message: 'Tipo de membresía no encontrado' });
            }
            sanitizedInput.type = type;
        }
        if (sanitizedInput.sportsIds) {
            sanitizedInput.sports = await em.find(Sport, { id: sanitizedInput.sportsIds });
        }
        em.assign(membership, sanitizedInput);
        await em.flush();
        res.status(200).json({ message: 'Membresia actualizada correctamente', data: membership });
    }
    catch (error) {
        console.error('Error al actualizar la membresía:', error);
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Formato de ID invalido' });
        }
        const membership = await em.findOne(Membership, { id });
        if (!membership) {
            return res.status(404).json({ message: 'Membresia no encontrada' });
        }
        await em.removeAndFlush(membership);
        res.status(200).json({ message: 'Membresia eliminada correctamente' });
    }
    catch (error) {
        console.error('Error al eliminar la membresía:', error);
        res.status(500).json({ message: error.message });
    }
}
async function getMembershipsByUser(req, res) {
    try {
        const userId = parseInt(req.params.userId, 10);
        if (isNaN(userId)) {
            return res.status(400).json({ message: 'ID de usuario inválido' });
        }
        const user = await em.findOne(User, { id: userId }, { populate: ['memberships', 'memberships.type', 'memberships.sports', 'memberships.payments', 'memberships.user'] });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        return res.status(200).json(user.memberships);
    }
    catch (error) {
        console.error('Error al obtener membresías del usuario:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}
async function cancelMembership(req, res) {
    try {
        const membershipId = parseInt(req.params.id, 10);
        if (isNaN(membershipId)) {
            return res.status(400).json({ message: 'ID de membresía inválido' });
        }
        const membership = await em.findOne(Membership, { id: membershipId }, { populate: ['sports'] });
        if (!membership) {
            return res.status(404).json({ message: 'Membresía no encontrada' });
        }
        if (membership.sports.length > 0) {
            return res.status(400).json({ message: 'No puedes cancelar una membresía con deportes asociados. Elimina los deportes primero.' });
        }
        membership.endDate = new Date().toISOString();
        await em.flush();
        return res.status(200).json({ message: 'Membresía cancelada con éxito.', membership });
    }
    catch (error) {
        console.error('Error al cancelar membresía:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}
async function removeSportFromMembership(req, res) {
    try {
        const membershipId = parseInt(req.params.membershipId, 10);
        const sportId = parseInt(req.params.sportId, 10);
        if (isNaN(membershipId) || isNaN(sportId)) {
            return res.status(400).json({ message: 'ID de membresía o deporte inválido' });
        }
        const membership = await em.findOne(Membership, { id: membershipId }, { populate: ['sports'] });
        if (!membership) {
            return res.status(404).json({ message: 'Membresía no encontrada' });
        }
        const sport = membership.sports.getItems().find(s => s.id === sportId);
        if (!sport) {
            return res.status(404).json({ message: 'El deporte no está asociado a esta membresía.' });
        }
        membership.sports.remove(sport);
        await em.flush();
        return res.status(200).json({ message: 'Deporte eliminado de la membresía.', membership });
    }
    catch (error) {
        console.error('Error al eliminar deporte de la membresía:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}
export { sanitizeMembershipInput, findAll, findOne, add, update, remove, getMembershipsByUser, cancelMembership, removeSportFromMembership };
//# sourceMappingURL=membership.controler.js.map