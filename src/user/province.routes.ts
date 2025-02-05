import { Router } from "express";
import { sanitizeProvinceInput, findAll,findOne, add, update, remove } from "./province.controler.js";

export const provinceRouter = Router()

provinceRouter.get('/', findAll)
provinceRouter.get('/:id', findOne)
provinceRouter.post('/', sanitizeProvinceInput, add)
provinceRouter.put('/:id', sanitizeProvinceInput,update)
provinceRouter.patch('/:id', sanitizeProvinceInput,update)
provinceRouter.delete('/:id', remove)
