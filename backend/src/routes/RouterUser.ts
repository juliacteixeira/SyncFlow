import { Router, Request, Response } from "express";
import { UserController } from "../controller/UserController";
import { authenticateToken } from "../config/middlewares/AuthMiddleware";

const routerUser = Router();
const userController = new UserController();

routerUser.post('/user', (req:Request, res:Response)=> userController.createUser(req, res));
routerUser.get('/user', (req:Request, res:Response)=> userController.listUser(req, res));
routerUser.delete('/user/:user_id',authenticateToken,(req:Request, res:Response) => userController.deleteUser(req,res));
routerUser.put('/user',authenticateToken,(req: Request, res:Response) => userController.updateUser(req, res));

export default routerUser;
