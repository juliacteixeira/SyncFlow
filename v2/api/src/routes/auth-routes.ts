// routes.ts
import { Application } from 'express';
import { UserModel } from '../models/User';
import { AuthService } from '../services/AuthService';


export function authRoutes(app: Application) {


    // Rota de registro de usuário
    app.post('/register', async (req, res) => {
        const { username, email, password } = req.body;

        try {
            const user = await AuthService.register(username, email, password);
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao registrar usuário.' });
        }
    });

    // Rota de login
    app.post('/login', async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await AuthService.login(email, password);

            if (!user) {
                res.status(401).json({ error: 'Credenciais inválidas.' });
                return;
            }

            const token = AuthService.generateAuthToken(user);
            res.json({ token });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao fazer login.' });
        }
    });

    // Rota de verificação de token
    app.get('/verifyToken', async (req, res) => {
        const { token } = req.query;

        try {
            const userId = await AuthService.verifyAuthToken(token as string);

            if (!userId) {
                res.status(401).json({ error: 'Token inválido.' });
                return;
            }

            // Você pode retornar informações adicionais do usuário se necessário.
            const user = await UserModel.findById(userId);
            res.json({ user });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao verificar token.' });
        }
    });
}
