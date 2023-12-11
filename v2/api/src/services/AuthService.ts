// src/services/AuthService.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateSecretKey } from '../helpers/crypto-utils';
import { IUser, UserModel } from '../models/User';

/**
 * Serviço de autenticação responsável por registrar usuários, realizar login e gerar tokens de autenticação.
 */
export class AuthService {
    /**
     * Registra um novo usuário no sistema.
     * @param {string} username - Nome de usuário do novo usuário.
     * @param {string} email - Endereço de e-mail do novo usuário.
     * @param {string} password - Senha do novo usuário.
     * @returns {Promise<IUser>} - Retorna o usuário registrado.
     */
    static async register(username: string, email: string, password: string): Promise<IUser> {
        const user = new UserModel({ username, email, password });
        return user.save();
    }

    /**
     * Realiza o login de um usuário existente.
     * @param {string} email - Endereço de e-mail do usuário.
     * @param {string} password - Senha do usuário.
     * @returns {Promise<IUser | null>} - Retorna o usuário logado ou null se as credenciais forem inválidas.
     */
    static async login(email: string, password: string): Promise<IUser | null> {
        const user = await UserModel.findOne({ email });

        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) return null;

        const token = AuthService.generateAuthToken(user);
        user.token = token
        return user;
    }

    /**
     * Gera um token de autenticação para um usuário.
     * @param {IUser} user - Usuário para o qual o token será gerado.
     * @returns {string} - Token de autenticação.
     */
    static generateAuthToken(user: IUser): string {
        const secretKey = process.env.JWT_SECRET || generateSecretKey(); // Troque para algo mais seguro em produção
        return jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
    }

    /**
     * Verifica a validade de um token de autenticação.
     * @param {string} token - Token a ser verificado.
     * @returns {Promise<string | null>} - Retorna o ID do usuário se o token for válido, caso contrário, retorna null.
     */
    static async verifyAuthToken(token: string): Promise<string | null> {
        const secretKey = process.env.JWT_SECRET || generateSecretKey();

        try {
            const decodedToken: any = jwt.verify(token, secretKey);
            return decodedToken.userId;
        } catch (error) {
            return null;
        }
    }
}
