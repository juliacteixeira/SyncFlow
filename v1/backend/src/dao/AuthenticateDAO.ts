import * as bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import DataBase from "../config/DataBase";
import Auth from "../config/middlewares/Auth";
import { AuthenticateUser } from "../models/Authenticate";

export class AuthenticateDAO {

    static async findByEmail(email: string) {
        try {
            const sql = 'SELECT * FROM users WHERE email = $1';
            const values = [email];
            const result = await DataBase.query(sql, values);
            return result.rows[0];
        } catch (error) {
            throw new Error('Error interno server' + error);
        }
    }


    static async comparePasswords(email: string, password: string) {
        const user: AuthenticateUser | undefined = await this.findByEmail(email);


        if (user && (await this.comparePassword(password, user.password))) {
            const token = jwt.sign({ userId: user.user_id, username: user.email }, Auth.jwt.secret, {
                expiresIn: Auth.jwt.expired,
            });

            return token;
        }
        return undefined;
    }

    private static async comparePassword(plainPassword: string, hashPassword: string) {
        const passwordMatch = await bcrypt.compare(plainPassword, hashPassword);
        return passwordMatch;
    }
}
