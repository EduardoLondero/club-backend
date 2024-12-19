import { Router } from 'express'
import { findAll,findOne,sanitizeMembershipInput, add, update, remove} from './membership.controler.js'

export const membershipRouter = Router()

membershipRouter.get('/', findAll)
membershipRouter.get('/:id', findOne)
membershipRouter.post('/',sanitizeMembershipInput, add)
membershipRouter.put('/:id', sanitizeMembershipInput, update)
membershipRouter.delete('/:id', remove) 