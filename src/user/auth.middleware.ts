import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey') as JwtPayload;
    (req as any).user = { id: decoded.userId, rolId: decoded.rolId };
    next();
  } catch (error: any) {
    res.status(401).json({ message: 'Token inválido o expirado', error: error.message });
  }
}
