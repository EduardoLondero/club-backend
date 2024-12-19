import { Router } from 'express'
import {
  findAll,
  findOne,
  add,
  update,
  remove,
  sanitizeLocalityInput
} from './locality.controler.js'

export const localityRouter = Router()

localityRouter.get('/', findAll)
localityRouter.get('/:id', findOne)
localityRouter.post('/',sanitizeLocalityInput, add)
localityRouter.put('/:id', sanitizeLocalityInput, update)
localityRouter.delete('/:id', remove) 