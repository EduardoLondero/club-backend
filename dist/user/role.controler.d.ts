import { NextFunction, Request, Response } from 'express';
declare function sanitizeRoleInput(req: Request, res: Response, next: NextFunction): void;
declare function findAll(req: Request, res: Response): Promise<void>;
declare function findOne(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
declare function add(req: Request, res: Response): Promise<void>;
declare function update(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
declare function remove(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export { sanitizeRoleInput, findAll, findOne, add, update, remove };
