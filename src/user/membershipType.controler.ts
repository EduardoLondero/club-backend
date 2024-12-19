import { NextFunction, Request, Response } from 'express'
import { orm } from '../shared/db/orm.js'
import { ObjectId } from '@mikro-orm/mongodb'
import { MembershipType } from './membershipType.entity.js'

const em = orm.em


function sanitizeMembershipTypeInput(req: Request, res:Response, next:NextFunction){

  req.body.sanitizedInput={
      description: req.body.description,
      price: req.body.price,
      memberships: req.body.memberships
  }

  Object.keys(req.body.sanitizedInput).forEach(key =>{

      if(req.body.sanitizedInput[key]=== undefined){
          delete req.body.sanitizedInput[key]
      }

  })


  next()
}

async function findAll(req: Request, res: Response) {
  try {
    const membershiptypes = await em.find(MembershipType, {})
    res
      .status(200)
      .json({ message: 'found all membershiptTypes', data: membershiptypes })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = req.params.id
    const membershipType = await em.findOneOrFail(MembershipType, { _id: new ObjectId(id) })
    res
      .status(200)
      .json({ message: 'found MembershipType', data: membershipType })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const membership = em.create(MembershipType, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({ message: 'MembershipType created', data: membership })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}




async function update(req: Request, res: Response) {
  try {
    const id = req.params.id;

    // Asegúrate de esperar el resultado de `findOneOrFail`
    const membershipTypeToChange = await em.findOneOrFail(MembershipType, { _id: new ObjectId(id) });

    // Asignar los valores actualizados desde `req.body.sanitizedInput`
    em.assign(membershipTypeToChange, req.body.sanitizedInput);

    // Guardar los cambios en la base de datos
    await em.flush();

    res.status(200).json({ message: 'MembershipType updated successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}


async function remove(req: Request, res: Response) {
  try {
    const id = req.params.id;

    // Verificar que el ID sea válido (si es necesario)
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    // Verificar si el Character existe
    const membershipType = await em.findOne(MembershipType, { _id: new ObjectId(id) });

    if (!membershipType) {
      return res.status(404).json({ message: 'MembershipType not found' });
    }

    await em.removeAndFlush(membershipType);
    res.status(200).json({ message: 'MembershipType removed successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export {sanitizeMembershipTypeInput, findAll, findOne, add, update, remove }