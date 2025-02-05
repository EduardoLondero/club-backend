import { User } from './user.entity.js';
import jwt from 'jsonwebtoken';
import { orm } from '../shared/db/orm.js';
import dotenv from 'dotenv';
dotenv.config();
const em = orm.em;
function generateToken(user) {
    const payload = { userId: user.id, roleId: user.role?.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1h' });
    return token;
}
export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Correo electrónico y contraseña son requeridos' });
        }
        const user = await em.findOne(User, { email });
        if (!user) {
            return res.status(401).json({ message: 'Correo electrónico no encontrado' });
        }
        if (password !== user.password) {
            return res.status(401).json({ message: 'Contraseña inválida' });
        }
        const token = generateToken(user);
        res.json({
            message: 'Inicio de sesión exitoso',
            token,
            user: { id: user.id, email: user.email, rolId: user.role, fullName: user.fullName },
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error interno', error: error.message });
    }
}
//# sourceMappingURL=auth.controler.js.map