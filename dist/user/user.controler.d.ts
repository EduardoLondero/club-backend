import { Request, Response, NextFunction } from "express";
declare function sanitizeUserInput(req: Request, res: Response, next: NextFunction): void;
declare function findAll(req: Request, res: Response): Promise<void>;
declare function findOne(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
declare function add(req: Request, res: Response): Promise<void>;
declare function update(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
declare function remove(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export { sanitizeUserInput, findAll, findOne, add, update, remove };
