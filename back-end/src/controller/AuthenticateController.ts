import { AuthenticateDAO } from "../dao/AuthenticateDAO";
import { AuthenticateUser } from "../models/Authenticate";
import { Request, Response } from "express";

export class AuthenticateController{

    static async comparePassword(req: Request, res:Response){
        
        try {
            const {email, password} = req.body;

            const token = await AuthenticateDAO.comparePasswords(email, password);
            
            if(token){
                res.header('Authorization', token);
                return res.status(200).json(token);
            }
            else{
                res.status(400).json({message: "Credenciais inválidas"});
            }    
        }
        catch (error) {
            return res.status(400).json({ message: "Internal error " + error });
        }
        
    }    
}