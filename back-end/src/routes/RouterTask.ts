import { Router, Request, Response } from "express";
import { TaskController } from "../controller/TaskController";

const routerTask = Router();
const taskController = new TaskController();

routerTask.post('/task', (req:Request, res:Response)=> taskController.createTask(req, res));
routerTask.get('/task', (req:Request, res:Response)=> taskController.listTask(req, res));
routerTask.delete('/task/:task_id',(req:Request, res:Response) => taskController.deleteTask(req,res));
routerTask.put('/task',(req: Request, res:Response) => taskController.updateTask(req, res));

export default routerTask;
