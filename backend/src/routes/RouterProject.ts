import { Router, Request, Response } from "express";
import { ProjectController } from "../controller/ProjectController";
import { authenticateToken } from "../config/middlewares/AuthMiddleware";

const routerProject = Router();
const projectController = new ProjectController();

routerProject.post('/project', authenticateToken,(req:Request, res:Response)=> projectController.createProject(req, res));
routerProject.get('/project', (req:Request, res:Response)=> projectController.listProject(req, res));
routerProject.delete('/project/:project_id',authenticateToken,(req:Request, res:Response) => projectController.deleteProject(req,res));
routerProject.put('/project',authenticateToken,(req: Request, res:Response) => projectController.updateProject(req, res));

export default routerProject;
