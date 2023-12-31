import DataBase from '../config/DataBase';
import { BadRequestError, EmailExistError, InternalServerError } from '../config/helpers/Api-error';
import { User } from '../models/User';
import  bcrypt from 'bcrypt';

export class UserDAO {

  public async create(user: User) {
    try {
      const hashPass = await bcrypt.hash(user.password, 10);

      const sql = `INSERT INTO users (name, email, password, type) VALUES ($1, $2, $3, $4) RETURNING *`;
      const values = [user.name, user.email, hashPass, user.type];
      const result = await DataBase.query(sql, values);
      return  result.rows;
    }
    catch (error) {
      throw new InternalServerError('Internal Server Error' + error);
    }
  }

  public async listAllUser(){
    try {
      const sql = 'SELECT * FROM users'
      const result = await DataBase.query(sql);
      return result.rows;
    }
    catch (error) {
      throw new Error('Error interno server' + error);
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
      throw new Error('Error interno server' + error);
    }
  }

  public async delete(user_id:number){
    try{
      const sql = 'DELETE FROM users WHERE user_id = $1';
      
      if(await this.findUserId(user_id)){
        const values = [user_id];

        const result = await DataBase.query(sql, values);
        return result.rows;
      }
      else{
        throw new BadRequestError('User not fould');
      }
    }
    catch(error){
      throw new Error('Error interno server' + error);
    }
  }

  public async findUserId(user_id:number){
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
      throw new Error('Error interno server' + error);
    }
  }

  public async update(user:User){
    try {
      const sql = 'UPDATE users SET name = $1, email = $2, password = $3, type = $4 WHERE user_id = $5';
      
      if(user.user_id === undefined){
        throw new Error('user_id is required');
      }

      if(await this.findUserId(user.user_id)){
        const hasPassword = await bcrypt.hash(user.password,10);
        const values = [user.name, user.email, hasPassword, user.type, user.user_id];
        const result = await DataBase.query(sql, values);
        return await this.listAllUser();
      }
      else{
        throw new BadRequestError('User not fould');
      }
    }
    catch (error) {
      throw new EmailExistError('Email exist ');
    }
  }
  public async findEmail(email:string){
    const sql = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    
    const result = await DataBase.query(sql, values);

    return result.rows;
  }
}
