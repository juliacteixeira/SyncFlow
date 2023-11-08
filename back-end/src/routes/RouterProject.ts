import { Router, Request, Response } from "express";
import { ProjectController } from "../controller/ProjectController";

const routerProject = Router();
const projectController = new ProjectController();

routerProject.post('/project', (req:Request, res:Response)=> projectController.createProject(req, res));
routerProject.get('/project', (req:Request, res:Response)=> projectController.listProject(req, res));
routerProject.delete('/project/:project_id',(req:Request, res:Response) => projectController.deleteProject(req,res));
routerProject.put('/project',(req: Request, res:Response) => projectController.updateProject(req, res));

export default routerProject;
