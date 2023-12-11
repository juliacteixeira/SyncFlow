import { Request, Response, Router } from "express";
import { authenticateToken } from "../config/middlewares/AuthMiddleware";
import { TaskController } from "../controller/TaskController";

const routerTask = Router();
const taskController = new TaskController();

routerTask.post('/task', authenticateToken, (req: Request, res: Response) => taskController.createTask(req, res));
routerTask.get('/task', (req: Request, res: Response) => taskController.listTask(req, res));
routerTask.delete('/task/:task_id', authenticateToken, (req: Request, res: Response) => taskController.deleteTask(req, res));
routerTask.put('/task', authenticateToken, (req: Request, res: Response) => taskController.updateTask(req, res));

export default routerTask;
