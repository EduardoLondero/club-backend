import { NextFunction, Request, Response } from 'express';
import { orm } from '../shared/db/orm.js';
import { Payment } from './payment.entity.js';
import { Membership } from './membership.entity.js';

const em = orm.em;

async function sanitizePaymentTypeInput(req: Request, res: Response, next: NextFunction) {
  try {
    let membership;

    if (req.body.membership) {
      membership = await em.findOne(Membership, { id: req.body.membership });
      if (!membership) {
        return res.status(400).json({ message: 'ID de membresia invalido' });
      }
    }

    req.body.sanitizedInput = {
      state: req.body.state,
      payDay: req.body.payDay,
      totalPrice: req.body.totalPrice,
      membership: membership || undefined,
    };

    Object.keys(req.body.sanitizedInput).forEach((key) => {
      if (req.body.sanitizedInput[key] === undefined) {
        delete req.body.sanitizedInput[key];
      }
    });

    next();
  } catch (error: any) {
    res.status(500).json({ message: `Error sanitizing input: ${error.message}` });
  }
}

async function findAll(req: Request, res: Response) {
  try {
    const payments = await em.find(Payment, {}, { populate: ['membership', 'membership.type'] });
    res.status(200).json({ message: 'Todos los pagos encontrados', data: payments });
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

    const payment = await em.findOneOrFail(Payment, { id }, { populate: ['membership'] });
    res.status(200).json({ message: 'Pago encontrado', data: payment });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const { sanitizedInput } = req.body;

    const payDay = sanitizedInput.payDay ? new Date(sanitizedInput.payDay).toISOString().split('T')[0] : null;

    const payment = em.create(Payment, {
      state: sanitizedInput.state,
      payDay ,
      totalPrice: sanitizedInput.totalPrice,
      membership: sanitizedInput.membership,
    });

    await em.flush();
    res.status(201).json({ message: 'Pago creado', data: payment });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({ message: 'Formato de ID invalido' });
    }

    const paymentToChange = await em.findOneOrFail(Payment, { id });

    const { sanitizedInput } = req.body;
    em.assign(paymentToChange, {
      state: sanitizedInput.state,
      payDay: sanitizedInput.payDay,
      totalPrice: sanitizedInput.totalPrice,
      membership: sanitizedInput.membership,
    });

    await em.flush();

    res.status(200).json({ message: 'Pago actualizado correctamente', data: paymentToChange });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

 async function getPaymentsByMembershipID(req: Request, res: Response) {
  try {
    const membershipId = parseInt(req.params.membershipId, 10);

    if (isNaN(membershipId)) {
      return res.status(400).json({ message: 'ID de membresia invalido' });
    }

    const payments = await em.find(Payment, { membership: membershipId });

    if (!payments.length) {
      return res.status(404).json({ message: 'No hay pagos para esta membresia.' });
    }

    res.status(200).json({ message: 'Pagos encontrados', data: payments });
  } catch (error: any) {
    res.status(500).json({ message: 'Error recuperando pagos', details: error.message });
  }
}



async function remove(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({ message: 'Formato de ID invalido' });
    }

    const payment = await em.findOne(Payment, { id });

    if (!payment) {
      return res.status(404).json({ message: 'Pago no encontrado' });
    }

    await em.removeAndFlush(payment);
    res.status(200).json({ message: 'Pago eliminado correctamente' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}




export { sanitizePaymentTypeInput, findAll, findOne, add, update, remove, getPaymentsByMembershipID };
