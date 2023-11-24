import { Router, Request, Response } from "express";
import { TaskController } from "../controller/TaskController";
import { authenticateToken } from "../config/middlewares/AuthMiddleware";

const routerTask = Router();
const taskController = new TaskController();

routerTask.post('/task',authenticateToken ,(req:Request, res:Response)=> taskController.createTask(req, res));
routerTask.get('/task', (req:Request, res:Response)=> taskController.listTask(req, res));
routerTask.delete('/task/:task_id',authenticateToken,(req:Request, res:Response) => taskController.deleteTask(req,res));
routerTask.put('/task',authenticateToken,(req: Request, res:Response) => taskController.updateTask(req, res));

export default routerTask;
