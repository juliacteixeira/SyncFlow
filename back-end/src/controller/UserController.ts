
import { Request, Response, query } from 'express';
import { User } from '../models/User';
import { UserDAO } from '../dao/UserDAO';

export class UserController {
  private userDAO: UserDAO;

  constructor(){
    this.userDAO = new UserDAO();
  }

  private checkCampusCreate(user: User) {
    if (typeof user.name !== 'string' || typeof user.email !== 'string' || user.name.length > 150 || user.email.length > 150) {
        throw new Error('Error, campus is not valid');
    }
    if (user.type !== 'admin' && user.type !== 'common_user') {
        throw new Error('Error, campus is not valid: type admin/common_user');
    }
}


  public async createUser(req: Request, res: Response) {

    try {
      const { name, email, password, type } = req.body;
      const newUser: User = { name, email, password, type };
      
      const result = await this.userDAO.create(newUser);
      this.checkCampusCreate(newUser);
      return res.status(200).json( result );
    }
    catch (error) {
        return res.status(400).json({ message: "Internal error " + error });
    }
    }

    
    public async updateUser() {
    // Implemente a lógica para atualizar um usuário
    }

  public async deleteUser(req: Request, res: Response) {
    try {

      const {user_id} = req.params;
      const result = await this.userDAO.delete(parseInt(user_id));

      return res.status(200).json( result );
      
    }
    catch (error) {
      return res.status(400).json({ message: "Internal error " + error });  
    }
  }

  public async listUser(req: Request, res:Response) {
    try {
      const params = req.query;
      
      if(Object.keys(params).length > 0){
        const result = await this.userDAO.listUser(params);
        return res.status(200).json( result );
      }
      else{
        const result = await this.userDAO.listAllUser();
        return res.status(200).json( result );
      }
    }
    catch (error) {
      return res.status(400).json({ message: "Internal error " + error });  
    }
  }
}
