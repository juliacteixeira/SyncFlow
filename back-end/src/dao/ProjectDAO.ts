import { Project } from "../models/Project";
import DataBase from '../config/DataBase';

export class ProjectDAO{

    public async create(project:Project){
        try {
            const sql = 'INSERT INTO project (name_project, description, date_create, date_last_update) VALUES ($1, $2, $3, $4) RETURNING *'
            const values = [project.name_project, project.description, project.date_create, project.date_last_update];
            const result = await DataBase.query(sql, values);
            return result.rows;
        
        }
        catch (error) {
            throw new Error('Error interno server' + error);
        }
    }
    public async delete(project_id:number){
        try{
            const sql = 'DELETE FROM project WHERE project_id = $1';
            
            if(await this.findProjectID(project_id)){
              const values = [project_id];
      
              const result = await DataBase.query(sql, values);
             
            }
            else{
              throw new Error('Project not fould');
            }
        }
        catch(error){
            throw new Error('Error interno server' + error);
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
        catch(error){
            throw new Error('Error interno server' + error);
        }
    }

    public async listAllProject(){
        try {
          const sql = 'SELECT * FROM project'
          const result = await DataBase.query(sql);
          return result.rows;
        }
        catch (error) {
          throw new Error('Error interno server' + error);
        }
    }

    public async listProject(params: any){
        let sql = 'SELECT * FROM project WHERE 1 = 1';
        const values = [];
    
        if (params.project_id) {
            const project_id = parseInt(params.project_id);
            if (!isNaN(project_id)) {
                sql += ` AND project_id = $${values.length + 1}`;
                values.push(project_id);
            } else {
                throw new Error("project_id should be a valid integer");
            }
        }
    
        if (params.name_project) {
            sql += ` AND name_project = $${values.length + 1}`;
            values.push(params.name_project);
        }
    
        try {
            const result = await DataBase.query(sql, values);
            return result.rows;  
        }
        catch (error) {
          throw new Error('Error interno server' + error);
        }
      }

    public async update(project: Project){
    try {
        const sql = 'UPDATE project SET name_project = $1, description = $2, date_create = $3, date_last_update = $4 WHERE project_id = $5';
        
        if(project.project_id === undefined){
            throw new Error('project_id is required');
        }
    
        if(await this.findProjectID(project.project_id)){
            const values = [project.name_project, project.description, project.date_create, project.date_last_update, project.project_id];
            const result = await DataBase.query(sql, values);
            return await this.listAllProject();
        }
        else{
            throw new Error('Project not fould');
        }
        }
        catch (error) {
            throw new Error('Error interno server' + error);
        }
    }
}