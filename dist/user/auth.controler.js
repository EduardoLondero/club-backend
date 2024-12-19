
import { User } from '../user/user.entity.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { orm } from '../shared/db/orm.js';
const em = orm.em;
// Función para generar un JWT
async function generateToken(user) {
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1h' });
    return token;
}
// Función de inicio de sesión
async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Correo electrónico y contraseña son requeridos' });
        }
        // Buscar el usuario por email
        const user = await em.findOne(User, { email });
        if (!user) {
            return res.status(401).json({ message: 'Correo electrónico no encontrado' });
        }
        // Comparar las contraseñas
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Contraseña inválida' });
        }
        // Generar el token
        const token = await generateToken(user);
        // Responder con el token y los datos del usuario
        res.json({ token, user: { id: user.id, name: user.name } });
    }
    catch (error) {
        res.status(500).json({ message: 'Error interno', error: error.message });
    }
}
// Función de autenticación (verificación de JWT)
async function authenticate(req, res) {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }
        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
        const user = await em.findOne(User, { id: decoded.userId });
        if (!user) {
            return res.status(401).json({ message: 'Token inválido' });
        }
        // Si el token es válido, responder con el mensaje de éxito
        res.json({ message: 'Autenticado con éxito' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al verificar el token', error: error.message });
    }
}
export { login, authenticate };
//# sourceMappingURL=auth.controler.js.map