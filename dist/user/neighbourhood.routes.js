import { Router } from "express";
import { sanitizeNeigbourhoodInput, findAll, findOne, add, update, remove } from "./neighbourhood.controler.js";
export const neigbourhoodRouter = Router();
neigbourhoodRouter.get('/', findAll);
neigbourhoodRouter.get('/:id', findOne);
neigbourhoodRouter.post('/', sanitizeNeigbourhoodInput, add);
neigbourhoodRouter.put('/:id', sanitizeNeigbourhoodInput, update);
neigbourhoodRouter.patch('/:id', sanitizeNeigbourhoodInput, update);
neigbourhoodRouter.delete('/:id', remove);
//# sourceMappingURL=neighbourhood.routes.js.map