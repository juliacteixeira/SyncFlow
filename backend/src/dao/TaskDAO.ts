import DataBase from "../config/DataBase";
import { BadRequestError, InternalServerError } from "../config/helpers/Api-error";
import { Task } from "../models/Task";

export class TaskDAO{

    public async create(task:Task){
        try {
            const sql = 'INSERT INTO tasks (name_task, description, status, data_create, date_conclusion, project_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
            
            if(await this.findProjectID(task.project_id)){
                const values = [task.name_task, task.description, task.status, task.data_create, task.date_conclusion, task.project_id];
                const result = await DataBase.query(sql, values);
                return result.rows;
            }
            else{
                throw new BadRequestError('Project not found');
            }
        }
        catch (error) {
            throw new InternalServerError('Internal Server Error' + error);
        }
    }

    public async listTask(params:any){
        let sql = 'SELECT * FROM tasks WHERE 1 = 1';
        const values = [];
    
        if (params.task_id) {
            const task_id = parseInt(params.task_id);
            if (!isNaN(task_id)) {
                sql += ` AND task_id = $${values.length + 1}`;
                values.push(task_id);
            } else {
                throw new Error("task_id should be a valid integer");
            }
        }
    
        if (params.name_task) {
            sql += ` AND name_task = $${values.length + 1}`;
            values.push(params.name_task);
        }
        
        if (params.status) {
            sql += ` AND status = $${values.length + 1}`;
            values.push(params.status);
        }
        
         if (params.project_id) {
            sql += ` AND project_id = $${values.length + 1}`;
            values.push(params.project_id);
        }
        try {
            const result = await DataBase.query(sql, values);
            return result.rows;  
        }
        catch (error) {
            throw new InternalServerError('Internal Server Error' + error);
        }
    }

    public async listAllTask(){
        try {
            const sql = 'SELECT * FROM tasks';
            const result = await DataBase.query(sql);
            return result.rows;
          }
          catch (error) {
            throw new InternalServerError('Internal Server Error' + error);
          }
    }

    private async findTaskID(task_id:number){
        try{
            const sql = 'SELECT * FROM tasks WHERE task_id = $1';
            const values = [task_id];
            const result = await DataBase.query(sql, values);

            if(result.rows.length > 0){
                return true;
            }
            else{
                return false;
            }
        }
        catch (error) {
            throw new InternalServerError('Internal Server Error' + error);
        }
    }

    private async findProjectID(project_id:number){
        try{
            const sql = 'SELECT * FROM project WHERE project_id = $1';
            const values = [project_id];
            const result = await DataBase.query(sql, values);

            if(result.rows.length > 0){
                return true;
            }
            else{
                return false;
            }
        }
        catch (error) {
            throw new InternalServerError('Internal Server Error' + error);
        }

    }
    public async delete(task_id:number){
        try{
            const sql = 'DELETE FROM tasks WHERE task_id = $1';
            
            if(await this.findTaskID(task_id)){
                const values = [task_id];
                await DataBase.query(sql, values);
                return await this.listAllTask();
            }
            else{
              throw new BadRequestError('Project not fould');
            }
        }
        catch (error) {
            throw new InternalServerError('Internal Server Error' + error);
        }
    }
    public async update(task:Task){
        try {
            const sql = 'UPDATE tasks SET name_task = $1, description = $2, status = $3, data_create = $4, date_conclusion = $5, project_id = $6 WHERE task_id = $7';
            
            if(task.task_id === undefined){
                throw new BadRequestError('task_id is required');
            }
            
            if(! await this.findTaskID(task.task_id)){
                throw new BadRequestError("task_id notr found");
            }

            if(! await this.findProjectID(task.project_id)){
                throw new BadRequestError("project_id not found");
            }
            
            const values = [task.name_task, task.description, task.status, task.data_create, task.date_conclusion, task.project_id, task.task_id];
            await DataBase.query(sql, values);
            
            return await this.listAllTask();
        }
        catch (error) {
            throw new InternalServerError('Internal Server Error' + error);
        }
    }
}