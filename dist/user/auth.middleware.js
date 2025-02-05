import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export async function verifyToken(req, res, next) {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
        req.user = { id: decoded.userId, rolId: decoded.rolId };
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Token inválido o expirado', error: error.message });
    }
}
//# sourceMappingURL=auth.middleware.js.map