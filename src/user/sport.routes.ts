import { Router } from "express";
import { sanitizeSportTypeInput, findAll,findOne, add, update, remove } from "./sport.controler.js";


export const sportRouter = Router()

sportRouter.get('/', findAll)
sportRouter.get('/:id', findOne)
sportRouter.post('/', sanitizeSportTypeInput, add)
sportRouter.put('/:id', sanitizeSportTypeInput,update)
sportRouter.patch('/:id', sanitizeSportTypeInput,update)
sportRouter.delete('/:id', remove)

 