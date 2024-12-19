import { Request, Response, NextFunction } from "express"
import { User } from "./user.entity.js"
import { orm } from '../shared/db/orm.js'
import { ObjectId } from '@mikro-orm/mongodb'

const em = orm.em


function sanitizeUserInput(req: Request, res:Response, next:NextFunction){

    req.body.sanitizedInput={

        name: req.body.name,
        email: req.body.email,
        numberphone: req.body.numberPhone,
        adress: req.body.adress,
        password: req.body.password,
        locality: req.body.locality,
        memberships: req.body.memberships,
        role:req.body.role

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
      const users = await em.find(
        User,
        {},
        { populate: ['locality', 'memberships'] }
      )
      res.status(200).json({ message: 'found all characters', data: users })
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }
  async function findOne(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const user = await em.findOneOrFail(User, { _id: new ObjectId(id) }, { populate: ['locality', 'memberships'] });
      res.status(200).json({ message: 'found user', data: user });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async function add(req: Request, res: Response) {
    try {
      const user = em.create(User, req.body.sanitizedInput)
      await em.flush()
      res.status(201).json({ message: 'user created', data: user })
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }


  async function update(req: Request, res: Response) {
    try {
      const id = req.params.id
      const userToUpdate = await em.findOneOrFail(User, { _id: new ObjectId(id) })
      em.assign(userToUpdate, req.body.sanitizedInput)
      await em.flush()
      res
        .status(200)
        .json({ message: 'user updated', data: userToUpdate })
    } catch (error: any) {
      res.status(500).json({ message: error.message })
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
      const character = await em.findOne(User, { _id: new ObjectId(id) });
  
      if (!character) {
        return res.status(404).json({ message: 'Character not found' });
      }
  
      await em.removeAndFlush(character);
      res.status(200).json({ message: 'Character removed successfully' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
  

export {sanitizeUserInput, findAll, findOne, add, update, remove}