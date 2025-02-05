import { orm } from '../shared/db/orm.js';
import { Sport } from './sport.entity.js';
import { Membership } from './membership.entity.js';
const em = orm.em;
function sanitizeSportTypeInput(req, res, next) {
    req.body.sanitizedInput = {
        sportName: req.body.sportName,
        schedule: req.body.schedule,
        scheduleEnd: req.body.scheduleEnd,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        memberships: req.body.memberships,
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
        const sports = await em.find(Sport, {}, { populate: ['memberships'] });
        res.status(200).json({ message: 'Todos los deportes encontrados', data: sports });
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
        const sport = await em.findOneOrFail(Sport, { id }, { populate: ['memberships'] });
        res.status(200).json({ message: 'Deporte encontrado', data: sport });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const { sportName, schedule, scheduleEnd, price, memberships, imageUrl } = req.body.sanitizedInput;
        if (!Array.isArray(memberships)) {
            return res.status(400).json({ message: "'memberships' debe ser un array válido" });
        }
        const existingSport = await em.findOne(Sport, { sportName });
        if (existingSport) {
            return res.status(400).json({ message: 'El deporte ya existe' });
        }
        if (!sportName || !schedule || !scheduleEnd || !price) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }
        const sport = em.create(Sport, { sportName, schedule, scheduleEnd, price, imageUrl });
        for (const membershipId of memberships) {
            const membership = await em.findOneOrFail(Membership, { id: membershipId });
            sport.memberships.add(membership);
            membership.sports.add(sport);
        }
        await em.persistAndFlush(sport);
        res.status(201).json({ message: 'Deporte creado', data: sport });
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
        const sportToUpdate = await em.findOneOrFail(Sport, { id });
        em.assign(sportToUpdate, req.body.sanitizedInput);
        await em.flush();
        res.status(200).json({ message: 'Deporte actualizado correctamente', data: sportToUpdate });
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
        const sport = await em.findOne(Sport, { id }, { fields: ['memberships'] });
        if (!sport) {
            return res.status(404).json({ message: 'Deporte no encontrado' });
        }
        if (sport.memberships && sport.memberships.length > 0) {
            return res.status(400).json({ message: 'No se puede eliminar un deporte con membresías asociadas' });
        }
        await em.removeAndFlush(sport);
        res.status(200).json({ message: 'Deporte eliminado correctamente' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findByName(req, res) {
    try {
        const sportName = req.params.name;
        const sport = await em.find(Sport, {
            sportName: sportName
        });
        if (!sport || sport.length === 0) {
            return res.status(404).json({ message: `Deporte con el nombre '${sportName}' no encontrado` });
        }
        res.status(200).json({ message: 'Deporte encontrado', data: sport });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const inscribirDeporte = async (req, res) => {
    const { sportId, membershipId } = req.body;
    try {
        console.log('Recibidos:', { sportId, membershipId });
        const sport = await em.findOne(Sport, { id: sportId }, { populate: ['memberships'] });
        if (!sport) {
            return res.status(404).json({ message: `Deporte con el ID '${sportId}' no encontrado` });
        }
        console.log('Deporte encontrado:', sport);
        const membership = await em.findOne(Membership, { id: membershipId });
        if (!membership) {
            return res.status(404).json({ message: 'Membresía no encontrada' });
        }
        console.log('Membresía encontrada:', membership);
        const isAlreadyInscribed = sport.memberships.contains(membership);
        if (isAlreadyInscribed) {
            return res.status(400).json({ message: 'Ya estás inscrito en este deporte' });
        }
        sport.memberships.add(membership);
        await em.persistAndFlush(sport);
        return res.status(200).json({ message: 'Inscripción exitosa', sport });
    }
    catch (error) {
        console.error('Error al inscribir al deporte:', error);
        return res.status(500).json({ message: 'Error al inscribirse en el deporte', error: error.message });
    }
};
export { sanitizeSportTypeInput, findAll, findOne, add, update, remove, findByName, inscribirDeporte };
//# sourceMappingURL=sport.controler.js.map