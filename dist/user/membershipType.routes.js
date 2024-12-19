import { Router } from "express";
import { sanitizeMembershipTypeInput, findAll, findOne, add, update, remove } from "./membershipType.controler.js";
export const membershipTypeRouter = Router();
membershipTypeRouter.get('/', findAll);
membershipTypeRouter.get('/:id', findOne);
membershipTypeRouter.post('/', sanitizeMembershipTypeInput, add);
membershipTypeRouter.put('/:id', sanitizeMembershipTypeInput, update);
membershipTypeRouter.patch('/:id', sanitizeMembershipTypeInput, update);
membershipTypeRouter.delete('/:id', remove);
//# sourceMappingURL=membershipType.routes.js.map