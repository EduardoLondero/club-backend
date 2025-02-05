import { orm } from '../shared/db/orm.js';
import { Locality } from './locality.entity.js';
import { Province } from '../user/province.entity.js';
const em = orm.em;
async function sanitizeLocalityInput(req, res, next) {
    try {
        req.body.sanitizedInput = {
            name: req.body.name,
            postalCode: req.body.postalCode,
            users: req.body.users,
            province: req.body.province,
        };
        Object.keys(req.body.sanitizedInput).forEach((key) => {
            if (req.body.sanitizedInput[key] === undefined) {
                delete req.body.sanitizedInput[key];
            }
        });
        if (req.body.oProvinciaId) {
            const province = await em.findOne(Province, { id: req.body.oProvinciaId });
            if (!province) {
                return res.status(404).json({ message: 'Provincia no encontrada' });
            }
            req.body.sanitizedInput.province = province;
        }
        else {
            return res.status(400).json({ message: 'ID de provincia requerido' });
        }
        next();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findAll(req, res) {
    try {
        const localities = await em.find(Locality, {}, { populate: (['province']) });
        res.status(200).json({ message: 'Todas las localidades encontradas', data: localities });
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
        const locality = await em.findOneOrFail(Locality, { id }, { populate: (['province']) });
        res.status(200).json({ message: 'Localidad encontrada', data: locality });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const { sanitizedInput } = req.body;
        const locality = em.create(Locality, sanitizedInput);
        await em.flush();
        res.status(201).json({ message: 'Localidad creada', data: locality });
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
        const locality = await em.findOneOrFail(Locality, { id });
        em.assign(locality, req.body.sanitizedInput);
        await em.flush();
        res.status(200).json({ message: 'Localidad actualizada correctamente' });
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
        const locality = await em.findOne(Locality, { id }, { populate: ['users'] });
        if (!locality) {
            return res.status(404).json({ message: 'Localidad no encontrada' });
        }
        if (locality.users.length > 0) {
            return res.status(400).json({
                message: 'No se puede remover localidad con usuarios asociados',
            });
        }
        await em.removeAndFlush(locality);
        res.status(200).json({ message: 'Localidad removida correctamente' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findLocalitiesByProvinceId(req, res) {
    try {
        const provinceId = parseInt(req.params.id, 10);
        if (isNaN(provinceId)) {
            return res.status(400).json({ message: 'ID de provincia invalido' });
        }
        const localities = await em.find(Locality, { province: { id: provinceId } });
        if (localities.length === 0) {
            return res.status(404).json({ message: 'No se encontraron localidades para esta provincia' });
        }
        res.status(200).json({ message: 'Localidad encontrada', data: localities });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizeLocalityInput, findAll, findOne, add, update, remove, findLocalitiesByProvinceId };
//# sourceMappingURL=locality.controler.js.map