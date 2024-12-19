import { orm } from '../shared/db/orm.js';
import { ObjectId } from '@mikro-orm/mongodb';
import { Sport } from './sport.entity.js';
import { Membership } from './membership.entity.js';
const em = orm.em;
function sanitizeSportTypeInput(req, res, next) {
    req.body.sanitizedInput = {
        sportName: req.body.sportName,
        schedule: req.body.schedule,
        price: req.body.price,
        memberships: req.body.memberships
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
        const sports = await em.find(Sport, {}, { populate: ['memberships'] });
        res
            .status(200)
            .json({ message: 'found all Sports', data: sports });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = req.params.id;
        const sport = await em.findOneOrFail(Sport, { _id: new ObjectId(id) }, { populate: ['memberships'] });
        res
            .status(200)
            .json({ message: 'found Sport', data: sport });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const { sportName, schedule, price, memberships } = req.body;
        const sport = em.create(Sport, { sportName, schedule, price });
        for (const membershipId of memberships) {
            const membership = await em.findOneOrFail(Membership, { _id: new ObjectId(membershipId) });
            sport.memberships.add(membership);
            membership.sports.add(sport);
        }
        await em.persistAndFlush(sport);
        res.status(201).json({ message: 'Sport created', data: sport });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = req.params.id;
        // Asegúrate de esperar el resultado de `findOneOrFail`
        const SportToChange = await em.findOneOrFail(Sport, { _id: new ObjectId(id) });
        // Asignar los valores actualizados desde `req.body.sanitizedInput`
        em.assign(SportToChange, req.body.sanitizedInput);
        // Guardar los cambios en la base de datos
        await em.flush();
        res.status(200).json({ message: 'Sport updated successfully' });
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
        const sport = await em.findOne(Sport, { _id: new ObjectId(id) });
        if (!sport) {
            return res.status(404).json({ message: 'Sport not found' });
        }
        await em.removeAndFlush(sport);
        res.status(200).json({ message: 'Sport removed successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizeSportTypeInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=sport.controler.js.map