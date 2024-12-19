import { NextFunction, Request, Response } from 'express'
import { orm } from '../shared/db/orm.js'
import { ObjectId } from '@mikro-orm/mongodb'
import { Payment } from './payment.entity.js'

const em = orm.em


function sanitizePaymentTypeInput(req: Request, res:Response, next:NextFunction){

  req.body.sanitizedInput={
      state: req.body.state,
      payDay: req.body.payDay,
      membership: req.body.membership
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
    const payment = await em.find(Payment, {})
    res
      .status(200)
      .json({ message: 'found all Payments', data: payment })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = req.params.id
    const payment = await em.findOneOrFail(Payment, { _id: new ObjectId(id) })
    res
      .status(200)
      .json({ message: 'found Payment', data: payment })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const payment = em.create(Payment, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({ message: 'Payment created', data: payment })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}




async function update(req: Request, res: Response) {
  try {
    const id = req.params.id;

    // Asegúrate de esperar el resultado de `findOneOrFail`
    const PaymentToChange = await em.findOneOrFail(Payment, { _id: new ObjectId(id) });

    // Asignar los valores actualizados desde `req.body.sanitizedInput`
    em.assign(PaymentToChange, req.body.sanitizedInput);

    // Guardar los cambios en la base de datos
    await em.flush();

    res.status(200).json({ message: 'Payment updated successfully' });
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
    const payment = await em.findOne(Payment, { _id: new ObjectId(id) });

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    await em.removeAndFlush(payment);
    res.status(200).json({ message: 'Payment removed successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export {sanitizePaymentTypeInput, findAll, findOne, add, update, remove }