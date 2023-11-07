import { error } from 'console';
import DataBase from '../config/DataBase';
import { User } from '../models/User';

export class UserDAO {
  public async create(user: User) {
    try {
      const sql = `INSERT INTO users (name, email, password, type) VALUES ($1, $2, $3, $4) RETURNING *`;
      const values = [user.name, user.email, user.password, user.type];
      const result = await DataBase.query(sql, values);
      return result.rows;
    }
    catch (error) {
      throw error; 
    }
  }

  public async listAllUser(){
    try {
      const sql = 'SELECT * FROM users'
      const result = await DataBase.query(sql);
      return result.rows;
    }
    catch (error) {
      throw error; 
    }
  }

  public async listUser(params: any){
    let sql = 'SELECT * FROM users WHERE 1 = 1';
    const values = [];

    if (params.user_id) {
        const user_id = parseInt(params.user_id);
        if (!isNaN(user_id)) {
            sql += ` AND user_id = $${values.length + 1}`;
            values.push(user_id);
        } else {
            throw new Error("user_id should be a valid integer");
        }
    }

    if (params.name) {
        sql += ` AND name = $${values.length + 1}`;
        values.push(params.name);
    }

    if (params.email) {
        sql += ` AND email = $${values.length + 1}`;
        values.push(params.email);
    }

    if (params.type === 'admin' || params.type === 'common_user') {
        if (params.type) {
            sql += ` AND type = $${values.length + 1}`;
            values.push(params.type);
        }
    }

    try {
        const result = await DataBase.query(sql, values);
        return result.rows;  
    }
    catch (error) {
        throw error;
    }
  }

  public async delete(user_id:number){
    try{
      const sql = 'DELETE FROM users WHERE user_id = $1';
      
      if(await this.findUserId(user_id)){
        const values = [user_id];

        const result = await DataBase.query(sql, values);
        return await this.listAllUser();
      }
      else{
        return {mensagem:'User not found'};
      }
    }
    catch(error){
      throw error;
    }
  }
  private async findUserId(user_id:number){
    try{
      const sql = 'SELECT * FROM users WHERE user_id = $1';
      const values = [user_id];
      const result = await DataBase.query(sql, values);

      if(result.rows.length > 0){
        return true;
      }
      else{
        return false;
      }
    }
    catch(error){

    }
  }
}
