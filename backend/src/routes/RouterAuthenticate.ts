import { Router, Request, Response } from "express";
import { AuthenticateController } from "../controller/AuthenticateController";

const routerAuthenticate = Router();

routerAuthenticate.post('/login', (req: Request, res: Response) => {
    AuthenticateController.comparePassword(req, res);
});

export default routerAuthenticate;