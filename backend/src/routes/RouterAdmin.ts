import { Request, Response, Router } from "express";
import { AdminController } from "../controller/AdminController";
import { authenticateToken,checkAdmin } from "../config/middlewares/AuthMiddleware";

const routerAdm = Router();

const admController = new AdminController();

routerAdm.get('/get-adm',authenticateToken,checkAdmin,(req:Request, res:Response) => {
    admController.list(req, res);
});
routerAdm.post('/post-adm',authenticateToken,checkAdmin, (req:Request, res:Response) => {
    admController.create(req, res);
});
routerAdm.put('/put-adm',authenticateToken,checkAdmin, (req:Request, res:Response) => {
    admController.update(req, res);
});
routerAdm.delete('/delete-adm/:user_id',authenticateToken,checkAdmin, (req:Request, res:Response) => {
    admController.delete(req, res);
});

export default routerAdm;

