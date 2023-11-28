import {  Request, Response } from "express";
import { ProjectDAO } from "../dao/ProjectDAO";
import { Project } from "../models/Project";
import { BadRequestError, CampusError } from "../config/helpers/Api-error";

export class  ProjectController{
    private projectDAO: ProjectDAO;

    constructor(){
        this.projectDAO = new ProjectDAO();
    }

    public async createProject(req: Request, res: Response) {
        try {
          const { name_project, description, user_id } = req.body;
          const date = new Date();
          const date_create = date.toISOString();
          const date_last_update = date.toISOString();
    
          const newProject: Project = { name_project, description, date_create, date_last_update, user_id };
          await this.checkCampusCreate({ name_project, description, date_create, date_last_update, user_id });
        
          const result = await this.projectDAO.create(newProject);

          return res.status(200).json(result);
        }

        catch (error) {
          if(error instanceof CampusError){
            return res.status(error.statusCode).json({message: error.message});
          }
          if(error instanceof BadRequestError){
            return res.status(error.statusCode).json({message: error.message});
          }
          return res.status(400).json({ message: "Internal error " + error });
        }
    }
    
    private async checkCampusCreate(project:Project){
      if(typeof project.name_project !== 'string'){
        throw new CampusError('Error, campus name_project is not valid');
      }
      if(typeof project.description !== 'string'){
        throw new CampusError('Error, campus description is not valid');
      }
      if(!project.user_id){
        throw new CampusError('Error, campus user_id is not valid');
      }
    }

    public async listProject(req:Request, res:Response){
      try {
        const params = req.query;
        
        if(Object.keys(params).length > 0){
          const result = await this.projectDAO.listProject(params);
          return res.status(200).json( result );
        }
        else{
          const result = await this.projectDAO.listAllProject();
          return res.status(200).json( result );
        }
      }
      catch (error) {
        return res.status(400).json({ message: "Internal error " + error });  
      }
    }
    
    public async deleteProject(req:Request, res:Response){
      try {

        const {project_id} = req.params;
        const result = await this.projectDAO.delete(parseInt(project_id));
  
        return res.status(200).json( result );
        
      }
      catch (error) {
        return res.status(400).json({ message: "Internal error " + error });  
      }
    }

    private async checkCampusUpdate(project: Project){
      if(project.project_id === undefined){
        throw new CampusError('Error, campus project_id is not valid');
      }
      if(typeof project.project_id !== 'number' ){
        throw new CampusError('Error, campus user_id is not valid');
      }
      if(typeof project.name_project !== 'string' || project.name_project.length > 150){
        throw new CampusError('Error, campus name_project is not valid');
      }
      if(typeof project.date_create !== 'string'){
        throw new CampusError('Error, campus date_create is not valid');
      }
      if(!project.user_id){
        throw new CampusError('Error, campus user_id is not valid');
      }
      
    }
    public async updateProject(req: Request, res: Response) {
      try {
        const { project_id, name_project, description,date_create, user_id } = req.body;

        const currentDate = new Date().toISOString().split('T')[0];

        const projectUpdate: Project = {
          project_id,
          name_project,
          date_create,
          description,
          date_last_update: currentDate,
          user_id
        };
  
        await this.checkCampusUpdate({ project_id,name_project, description,date_create, date_last_update: currentDate, user_id });
  
        const result = await this.projectDAO.update(projectUpdate);
  
        return res.status(200).json(result);
      }
      catch (error) {
        if(error instanceof CampusError){
          return res.status(error.statusCode).json({message: error.message});
        }
        if(error instanceof BadRequestError){
          return res.status(error.statusCode).json({message: error.message});
        }
       return res.status(400).json({ message: 'Internal error ' + error });
      }
    }
}