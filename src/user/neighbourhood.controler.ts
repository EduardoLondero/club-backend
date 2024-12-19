import { Request, Response, NextFunction } from "express"
import { orm } from '../shared/db/orm.js'
import { ObjectId } from '@mikro-orm/mongodb'
import { Neighbourhood } from "./neighbourhood.entity.js"

const em = orm.em


function sanitizeNeigbourhoodInput(req: Request, res:Response, next:NextFunction){

    req.body.sanitizedInput={
        name: req.body.name,
        locality: req.body.locality,
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
    const neighbourhoods = await em.find(Neighbourhood, {})
    res
      .status(200)
      .json({ message: 'found all localities', data: neighbourhoods })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
  async function findOne(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const neighbourhood = await em.findOneOrFail(Neighbourhood, { _id: new ObjectId(id) }, { populate: ['locality'] });
      res.status(200).json({ message: 'found user', data: neighbourhood });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  
async function add(req: Request, res: Response) {
  try {
    const neighbourhood = em.create(Neighbourhood, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({ message: 'locality created', data: neighbourhood })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}


async function update(req: Request, res: Response) {
  try {
    const id = req.params.id;

    // Asegúrate de esperar el resultado de `findOneOrFail`
    const neighbourhoodToUpdate = await em.findOneOrFail(Neighbourhood, { _id: new ObjectId(id) });

    // Asignar los valores actualizados desde `req.body.sanitizedInput`
    em.assign(neighbourhoodToUpdate, req.body.sanitizedInput);

    // Guardar los cambios en la base de datos
    await em.flush();

    res.status(200).json({ message: 'Neighbourhood updated successfully' });
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
      const neighbourhood = await em.findOne(Neighbourhood, { _id: new ObjectId(id) });
  
      if (!neighbourhood) {
        return res.status(404).json({ message: 'Character not found' });
      }
  
      await em.removeAndFlush(neighbourhood);
      res.status(200).json({ message: 'Character removed successfully' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
  

export {sanitizeNeigbourhoodInput, findAll, findOne, add, update, remove}