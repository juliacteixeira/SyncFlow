import DataBase from '../config/DataBase';
import { BadRequestError, InternalServerError } from "../config/helpers/Api-error";
import { Project } from "../models/Project";

export class ProjectDAO {

    public async create(project: Project) {
        try {
            const sql = 'INSERT INTO project (name_project, description, date_create, date_last_update, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *'

            if (await this.findUserId(project.user_id)) {

                const values = [project.name_project, project.description, project.date_create, project.date_last_update, project.user_id];
                const result = await DataBase.query(sql, values);
                return result.rows;
            } else {
                throw new BadRequestError("user_id not found");
            }

        }
        catch (error) {
            throw new InternalServerError('Internal Server Error' + error);
        }
    }
    public async delete(project_id: number) {
        try {
            const sql = 'DELETE FROM project WHERE project_id = $1';

            if (await this.findProjectID(project_id)) {
                const values = [project_id];

                await DataBase.query(sql, values);
                return await this.listAllProject();
            }
            else {
                throw new Error('Project not fould');
            }
        }
        catch (error) {
            throw new InternalServerError('Internal Server Error' + error);
        }
    }
    private async findProjectID(project_id: number) {
        try {
            const sql = 'SELECT * FROM project WHERE project_id = $1';
            const values = [project_id];
            const result = await DataBase.query(sql, values);

            if (result.rows.length > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            throw new InternalServerError('Internal Server Error' + error);
        }
    }
    private async findUserId(user_id: number) {
        try {
            const sql = 'SELECT * FROM users WHERE user_id = $1';
            const values = [user_id];
            const result = await DataBase.query(sql, values);

            if (result.rows.length > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            throw new InternalServerError('Internal Server Error' + error);
        }
    }
    public async listAllProject() {
        try {
            const sql = 'SELECT * FROM project'
            const result = await DataBase.query(sql);
            return result.rows;
        }
        catch (error) {
            throw new InternalServerError('Internal Server Error' + error);
        }
    }

    public async listProject(params: any) {
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

        if (params.user_id) {
            sql += ` AND user_id = $${values.length + 1}`;
            values.push(params.user_id);
        }

        try {
            const result = await DataBase.query(sql, values);
            return result.rows;
        }
        catch (error) {
            throw new InternalServerError('Internal Server Error' + error);
        }
    }

    public async update(project: Project) {
        try {
            const sql = 'UPDATE project SET name_project = $1, description = $2, date_create = $3, date_last_update = $4, user_id = $5 WHERE project_id = $6';

            if (project.project_id === undefined) {
                throw new BadRequestError('project_id is required');
            }
            if (! await this.findProjectID(project.project_id)) {
                throw new BadRequestError("project_id not found");
            }
            if (! await this.findUserId(project.user_id)) {
                throw new BadRequestError("user_id not found");
            }

            const values = [project.name_project, project.description, project.date_create, project.date_last_update, project.user_id, project.project_id];
            await DataBase.query(sql, values);

            return await this.listAllProject();

        }
        catch (error) {
            throw new InternalServerError('Internal Server Error' + error);
        }
    }
}