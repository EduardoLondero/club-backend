import { Router } from 'express';
import { sanitizeRoleInput, findAll,findOne, add, update, remove } from './role.controler.js';

export const roleRouter = Router()

roleRouter.get('/', findAll)
roleRouter.get('/:id', findOne)
roleRouter.post('/', sanitizeRoleInput, add)
roleRouter.put('/:id', sanitizeRoleInput,update)
roleRouter.patch('/:id', sanitizeRoleInput,update)
roleRouter.delete('/:id', remove)
