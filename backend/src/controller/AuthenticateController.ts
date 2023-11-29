import { Request, Response } from "express";
import { AuthenticateDAO } from "../dao/AuthenticateDAO";

export class AuthenticateController {

    static async comparePassword(req: Request, res: Response) {

        try {
            const { email, password } = req.body;

            const token = await AuthenticateDAO.comparePasswords(email, password);

            if (token) {
                const emailUser = await AuthenticateDAO.findByEmail(email);
                res.header('Authorization', token);
                return res.status(200).json({ token, emailUser });
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