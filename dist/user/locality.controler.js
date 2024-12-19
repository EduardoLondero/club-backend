import { orm } from '../shared/db/orm.js';
import { Locality } from './locality.entity.js';
import { ObjectId } from '@mikro-orm/mongodb';
const em = orm.em;
function sanitizeLocalityInput(req, res, next) {
    req.body.sanitizedInput = {
        name: req.body.name,
        postalCode: req.body.postalCode,
        users: req.body.users
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
        const locality = await em.find(Locality, {});
        res
            .status(200)
            .json({ message: 'found all localities', data: locality });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = req.params.id;
        const locality = await em.findOneOrFail(Locality, { _id: new ObjectId(id) });
        res
            .status(200)
            .json({ message: 'found character class', data: locality });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const locality = em.create(Locality, req.body.sanitizedInput);
        await em.flush();
        res.status(201).json({ message: 'locality created', data: locality });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = req.params.id;
        // Asegúrate de esperar el resultado de `findOneOrFail`
        const locality = await em.findOneOrFail(Locality, { _id: new ObjectId(id) });
        // Asignar los valores actualizados desde `req.body.sanitizedInput`
        em.assign(locality, req.body.sanitizedInput);
        // Guardar los cambios en la base de datos
        await em.flush();
        res.status(200).json({ message: 'Locality updated successfully' });
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
        const character = await em.findOne(Locality, { _id: new ObjectId(id) });
        if (!character) {
            return res.status(404).json({ message: 'Character not found' });
        }
        await em.removeAndFlush(character);
        res.status(200).json({ message: 'Character removed successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizeLocalityInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=locality.controler.js.map