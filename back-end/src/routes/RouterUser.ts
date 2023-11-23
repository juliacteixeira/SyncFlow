import { Router, Request, Response } from "express";
import { UserController } from "../controller/UserController";

const routerUser = Router();
const userController = new UserController();

routerUser.post('/user', (req:Request, res:Response)=> userController.createUser(req, res));
routerUser.get('/user', (req:Request, res:Response)=> userController.listUser(req, res));
routerUser.delete('/user/:user_id',(req:Request, res:Response) => userController.deleteUser(req,res));
routerUser.put('/user',(req: Request, res:Response) => userController.updateUser(req, res));

export default routerUser;
