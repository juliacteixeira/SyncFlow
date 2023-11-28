import { Request, Response } from "express";
import { AuthenticateDAO } from "../dao/AuthenticateDAO";

export class AuthenticateController {

    static async comparePassword(req: Request, res: Response) {

        try {
            const { email, password } = req.body;

            console.log(email);
            console.log(password);


            const token = await AuthenticateDAO.comparePasswords(email, password);

            if (token) {
                res.header('Authorization', token);
                return res.status(200).json(token);
            }
            else {
                res.status(400).json({ message: "Credenciais inválidas" });
            }
        }
        catch (error) {
            return res.status(400).json({ message: "Internal error " + error });
        }

    }
}