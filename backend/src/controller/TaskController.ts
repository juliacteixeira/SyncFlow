import { Request, Response, query } from 'express';
import {Task} from '../models/Task';
import { TaskDAO } from '../dao/TaskDAO';


export class TaskController{
    private taskDAO: TaskDAO;
    
    constructor(){
        this.taskDAO = new TaskDAO();
    }

    public async createTask(req: Request, res: Response){
        try {
            const { name_task, description, status,date_conclusion,project_id } = req.body;
            const date = new Date();
            const data_create = date.toISOString();
      
            await this.checkCampusCreate({ name_task, description, status, project_id , data_create, date_conclusion });
            const newTask: Task = {name_task, description, status,data_create ,date_conclusion,project_id};
            const result = await this.taskDAO.create(newTask);
  
            return res.status(200).json(result);
          }
          catch (error) {
            return res.status(400).json({ message: "Internal error " + error });
          }
    }

    private async checkCampusCreate(project:Task){
        if(typeof project.name_task !== 'string'){
            throw new Error('Error, campus name_task is not valid');
        }
        if(typeof project.description !== 'string'){
            throw new Error('Error, campus description is not valid');
        }
        if(typeof project.status !== 'string'){
            throw new Error('Error, campus status is not valid');
        }
        if(typeof project.project_id !== 'number'){
            throw new Error('Error, campus project_id is not valid');
        }
    }

    public async listTask(req:Request, res:Response){
        try {
            const params = req.query;
            
            if(Object.keys(params).length > 0){
              const result = await this.taskDAO.listTask(params);
              return res.status(200).json( result );
            }
            else{
              const result = await this.taskDAO.listAllTask();
              return res.status(200).json( result );
            }
          }
          catch (error) {
            return res.status(400).json({ message: "Internal error " + error });  
          }
    }

    public async deleteTask(req:Request, res:Response){
        try {

            const {task_id} = req.params;
            const result = await this.taskDAO.delete(parseInt(task_id));
      
            return res.status(200).json( result );
            
          }
          catch (error) {
            return res.status(400).json({ message: "Internal error " + error });  
          }
    }
    public  async updateTask(req:Request, res:Response){
        try {
            const { task_id,name_task,description,status,data_create,date_conclusion,project_id } = req.body;
    
            const taskUpdate: Task = {
              task_id,
              name_task,
              description,
              status,
              data_create,
              date_conclusion,
              project_id
            };
      
            await this.checkCampusUpdate({ task_id,name_task,description,status,data_create,date_conclusion,project_id});
      
            const result = await this.taskDAO.update(taskUpdate);
      
            return res.status(200).json(result);
          }
          catch (error) {
            return res.status(400).json({ message: 'Internal error ' + error });
          }
    }
    private async checkCampusUpdate(task: Task){
        if(task.task_id === undefined){
          throw new Error('Error, campus project_id is not valid');
        }
        if(typeof task.task_id !== 'number' ){
          throw new Error('Error, campus user_id is not valid');
        }
        if(typeof task.name_task !== 'string' || task.name_task.length > 150){
          throw new Error('Error, campus name_project is not valid');
        }
        if(typeof task.status !== 'string'){
          throw new Error('Error, campus date_create is not valid');
        }
        if(typeof task.project_id !== 'number' ){
            throw new Error('Error, campus user_id is not valid');
          }
      }
}