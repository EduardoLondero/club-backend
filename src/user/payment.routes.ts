import { Router } from "express";
import { sanitizePaymentTypeInput, findAll,findOne, add, update, remove, getPaymentsByMembershipID } from "./payment.controler.js";


export const paymentRouter = Router()

paymentRouter.get('/', findAll)
paymentRouter.get('/:id', findOne)
paymentRouter.post('/', sanitizePaymentTypeInput, add)
paymentRouter.put('/:id', sanitizePaymentTypeInput,update)
paymentRouter.patch('/:id', sanitizePaymentTypeInput,update)
paymentRouter.delete('/:id', remove)

paymentRouter.get('/membership/:membershipId', getPaymentsByMembershipID)
