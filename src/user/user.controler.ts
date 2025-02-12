import { Request, Response, NextFunction } from "express";
import { User } from "./user.entity.js";
import { Locality } from "./locality.entity.js";
import { Membership } from "./membership.entity.js";
import { Role } from "./role.entity.js";
import { orm } from '../shared/db/orm.js';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

const em = orm.em;

function sanitizeUserInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    dni: req.body.dni,
    fullName: req.body.fullName,
    password: req.body.password,
    sex: req.body.sex,
    birthDate: req.body.birthDate,
    email: req.body.email,
    numberPhone: req.body.numberPhone,
    address: req.body.address,
    locality: req.body.locality,
    memberships: req.body.memberships,
    role: req.body.role,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });

  next();
}

async function findAll(req: Request, res: Response) {
  try {
    const users = await em.find(User, {}, { populate: ['locality', 'memberships', 'role'] });
    res.status(200).json({ message: 'Todos los usuarios encontrados', data: users });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({ message: 'Formato de ID invalido' });
    }

    const user = await em.findOneOrFail(User, { id }, { populate: ['locality', 'memberships', 'role'] });
    res.status(200).json({ message: 'Usuario encontrado', data: user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const { sanitizedInput } = req.body;

    console.log("Datos recibidos en el backend:", sanitizedInput);

    const { locality, memberships, role, dni, email } = sanitizedInput;

    const parsedDni = parseInt(dni, 10);
    if (isNaN(parsedDni)) {
    return res.status(400).json({ message: "El DNI debe ser un número válido." });
    }

    if (!dni) {
      return res.status(400).json({ message: "El campo DNI es obligatorio." });
    }

    const existingUser = await em.findOne(User, {  dni  });
    if (existingUser) {
      return res.status(400).json({ message: 'Ya existe un usuario con ese DNI' });
    }

    const existingUserEmail = await em.findOne(User, {  email  });
    if (existingUserEmail) {
      return res.status(400).json({ message: 'Ya existe un usuario con ese Email' });
    }

    const user = em.create(User, { ...sanitizedInput, dni: parsedDni });

    if (locality) {
      const localityEntity = await em.findOneOrFail(Locality, { id: locality });
      user.locality = localityEntity;
    }

    if (role) {
      const roleEntity = await em.findOneOrFail(Role, { id: role });
      user.role = roleEntity;
    }

    for (const membershipId of memberships) {
      const membershipEntity = await em.findOneOrFail(Membership, { id: membershipId });
      user.memberships.add(membershipEntity);
    }

    await em.persistAndFlush(user);
    res.status(201).json({ message: 'Usuario creado', data: user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Formato de ID inválido' });
    }

    const { sanitizedInput } = req.body;
    const { dni, email } = sanitizedInput;

    const userToUpdate = await em.findOneOrFail(User, { id });

    const existingUserDNI = await em.findOne(User, { dni });
    if (existingUserDNI && existingUserDNI.id !== id) {
      return res.status(400).json({ message: 'Ya existe un usuario con ese DNI' });
    }

    const existingUserEmail = await em.findOne(User, { email });
    if (existingUserEmail && existingUserEmail.id !== id) {
      return res.status(400).json({ message: 'Ya existe un usuario con ese Email' });
    }

    em.assign(userToUpdate, sanitizedInput);

    if (sanitizedInput.locality) {
      const localityEntity = await em.findOneOrFail(Locality, { id: sanitizedInput.locality });
      userToUpdate.locality = localityEntity;
    }

    if (sanitizedInput.role) {
      const roleEntity = await em.findOneOrFail(Role, { id: sanitizedInput.role });
      userToUpdate.role = roleEntity;
    }

    if (sanitizedInput.memberships) {
      const updatedMemberships = await Promise.all(
        sanitizedInput.memberships.map(async (membershipId: number) => {
          return await em.findOneOrFail(Membership, { id: membershipId });
        })
      );
      userToUpdate.memberships.set(updatedMemberships);
    }

    await em.flush();
    return res.status(200).json({ message: 'Usuario actualizado', data: userToUpdate });

  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({ message: 'Formato de ID invalido' });
    }

    const user = await em.findOne(User, { id });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await em.removeAndFlush(user);
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}


export { sanitizeUserInput, findAll, findOne, add, update, remove };
