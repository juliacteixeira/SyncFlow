import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import Auth from "./Auth";
import { AdminDAO } from "../../dao/AdminDAO";

declare global{
    namespace Express{
        interface Request{
            user?: any;
        }
    }
}

export function authenticateToken(req: Request, res: Response, next:NextFunction){
    const token = req.header('Authorization');

    if(!token){
        return res.status(401).json({message: "Token not exist"});
    }

    jwt.verify(token, Auth.jwt.secret, (error: any, user:any)=>{
        
        if(error){
            return res.status(400).json({message: "Token invalid " + error});
        }
        
        req.user = user;
        next();
    });
    
}

export async function checkAdmin(req:Request, res:Response, next:NextFunction){
    const user = req.user;
    const admDAO = new AdminDAO();

    const isAdm = await admDAO.findById(user.userId);
    

    if(isAdm.length > 0 && isAdm[0].type === "admin"){
        next();
    }
    else{
       
        res.status(400).json({message:"Access denied"})
    }
}