import { orm } from '../shared/db/orm.js';
import { Role } from './role.entity.js';
const em = orm.em;
function sanitizeRoleInput(req, res, next) {
    req.body.sanitizedInput = {
        descriptionRole: req.body.descriptionRole,
        dateRole: req.body.dateRole,
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
        const roles = await em.find(Role, {});
        res.status(200).json({ message: 'Todos los roles encontrados', data: roles });
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
        const role = await em.findOneOrFail(Role, { id });
        res.status(200).json({ message: 'Rol encontrado', data: role });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const sanitizedInput = req.body.sanitizedInput;
        const dateRole = sanitizedInput.dateRole
            ? new Date(sanitizedInput.dateRole).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0];
        const role = em.create(Role, { ...sanitizedInput, dateRole });
        await em.flush();
        res.status(201).json({ message: 'Rol creado', data: role });
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
        const role = await em.findOneOrFail(Role, { id });
        if (req.body.sanitizedInput.dateRole) {
            req.body.sanitizedInput.dateRole = new Date(req.body.sanitizedInput.dateRole).toISOString().split('T')[0];
        }
        em.assign(role, req.body.sanitizedInput);
        await em.flush();
        res.status(200).json({ message: 'Rol actualizado correctamente', data: role });
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
        const role = await em.findOne(Role, { id });
        if (!role) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }
        await em.removeAndFlush(role);
        res.status(200).json({ message: 'Rol eliminado correctamente' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizeRoleInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=role.controler.js.map