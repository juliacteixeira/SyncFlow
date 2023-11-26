import { AdminDAO } from "../dao/AdminDAO";
import { Request, Response } from "express";
import { User } from "../models/User";
import { BadRequestError, CampusError } from "../config/helpers/Api-error";

export class AdminController{
    private admDAO: AdminDAO;

    constructor() {
        this.admDAO = new AdminDAO();
    }

    private async checkCampusCreate(user: User) {
        if (typeof user.name !== 'string' || typeof user.email !== 'string' || user.name.length > 150 || user.email.length > 150) {
            throw new CampusError('Error, campus is not valid');
        }
        if (user.type !== 'admin' && user.type !== 'common_user') {
            throw new CampusError('Error, campus is not valid: type admin/common_user');
        }
    }

    private async checkCampusUpdate(user:User){
      if(user.user_id === undefined){
        throw new CampusError('Error, campus user_id is not valid');
      }
      if(typeof user.user_id !== 'number' ){
        throw new CampusError('Error, campus user_id is not valid');
      }
      if(typeof user.name !== 'string' || user.name.length > 150){
        throw new CampusError('Error, campus name is not valid');
      }
      if(typeof user.email !== 'string' || user.email.length > 150 ){
        throw new CampusError('Error, campus email is not valid');
      }
      if (user.type !== 'admin' && user.type !== 'common_user') {
          throw new CampusError('Error, campus is not valid: type admin/common_user');
      }
    }

    public async create(req:Request, res:Response){
      
      try {
        const {name, email, password, type} = req.body;

        const emailExiste = await this.admDAO.findEmail(email);
        
        if(emailExiste){
            throw new BadRequestError("email exist");
        }
        
      
        const user: User = {name, email, password, type};
        await this.checkCampusCreate(user);
        const result = await this.admDAO.create(user);

        return res.status(200).json(result);
       
        
      }
      catch (error) {
        if(error instanceof BadRequestError){
          return res.status(error.statusCode).json({message: error.message});
        }
        if(error instanceof CampusError){
          return res.status(error.statusCode).json({message: error.message});
        }
      }
    }

    public async update(req:Request, res:Response){
      try {
        const {user_id, name, email, password, type} = req.body;
        await this.checkCampusUpdate({user_id, name, email, password, type});
        const userUpdate:User = {user_id, name, email, password, type};
        
        const result = await this.admDAO.update(userUpdate);
  
        return res.status(200).json( result );
      }
      catch (error) {
        if(error instanceof CampusError){
          return res.status(error.statusCode).json({message: error.message});
        }
      }
    }

    public async delete(req:Request, res:Response){
      try {
        const {user_id} = req.params;
        const result = await this.admDAO.delete(parseInt(user_id));

      return res.status(200).json( result );
    }
    catch (error) {
        return res.status(400).json({ message: "Internal error " + error });  
      }
    }

    public async list(req:Request, res:Response){
        try {
            const result = await this.admDAO.list();
            return res.status(200).json( result );
          }
          catch (error) {
            return res.status(400).json({ message: "Internal error " + error });  
          }
    }
}