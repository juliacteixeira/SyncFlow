import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import Auth from "./Auth";

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