import { Request, Response, NextFunction } from "express";
import { Province } from "./province.entity.js";
import { orm } from '../shared/db/orm.js';

const em = orm.em;

function sanitizeProvinceInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    nameprovince: req.body.nameprovince,
    localities: req.body.localities
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
    const provinces = await em.find(Province, {}, { populate: ['localities']});
    res.status(200).json({ message: 'Todas las provincias encontradas', data: provinces });
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

    const province = await em.findOneOrFail(Province, { id }, { populate: ['localities'] });
    res.status(200).json({ message: 'Provincia encontrada', data: province });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {

    const {  nameprovince} = req.body.sanitizedInput;

    const existingProvince = await em.findOne(Province, { nameprovince });

    if (existingProvince) {
      return res.status(400).json({ message: 'Ya existe una provincia con ese nombre' });
    }

    const province = em.create(Province, req.body.sanitizedInput);

    await em.flush();

    res.status(201).json({ message: 'Provincia creada', data: province });

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id, 10);
    const { nameprovince } = req.body.sanitizedInput;

    if (isNaN(id)) {
      return res.status(400).json({ message: 'Formato de ID inválido' });
    }

    const provinceToUpdate = await em.findOneOrFail(Province, { id });

    const existingProvince = await em.findOne(Province, { 
      nameprovince, 
      id: { $ne: id }  
    });

    if (existingProvince) {
      return res.status(400).json({ message: 'Ya existe una provincia con ese nombre' });
    }

    em.assign(provinceToUpdate, req.body.sanitizedInput);
    await em.flush();

    res.status(200).json({ message: 'Provincia actualizada correctamente', data: provinceToUpdate });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error interno del servidor' });
  }
}


async function remove(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({ message: 'Formato de ID invalido' });
    }

    const province = await em.findOne(Province, { id }, { populate: ['localities']}); 

    if (!province) {
      return res.status(404).json({ message: 'Provincia no encontrada' });
    }

    if (province.localities.length > 0) {
      return res.status(400).json({
        message: 'No puede eliminar provincias con localidades asociadas',
      });
    }

    await em.removeAndFlush(province);
    res.status(200).json({ message: 'Provincia removida correctamente' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}


export { sanitizeProvinceInput, findAll, findOne, add, update, remove };
