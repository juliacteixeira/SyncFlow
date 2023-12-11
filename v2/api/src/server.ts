// src/server.ts
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { databaseConfig } from '../config/database.config';

/**
 * Classe responsável por iniciar o servidor.
 *
 * @constructor
 */

class Server {
    private app: express.Application;
    private PORT: number;

    // Método `constructor()`

    /**
     * Inicializa a classe `Server`.
     *
     * @param {express.Application} app O aplicativo Express.
     * @param {number} port A porta do servidor.
     */
    constructor() {

        // Variável `app`

        /**
         * O aplicativo Express.
         */

        this.app = express();
        /**
         * A porta do servidor.
         */
        this.PORT = Number(process.env.PORT) || 3000;
        dotenv.config();
        this.connectToDatabase();
        this.configureMiddleware();
        this.configureRoutes();
        this.startServer();
    }

    // Método `connectToDatabase()`

    /**
     * Conecta ao banco de dados MongoDB.
     */

    private connectToDatabase() {

        // Variável `uri`

        /**
         * A URL do banco de dados MongoDB.
         */
        const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.r3mgc7u.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;

        mongoose.connect(uri, databaseConfig).then((res) => {
            console.log('Conectado ao Mongo');
        })
            .catch((err) => {
                console.error('Erro ao conectar ao MongoDB:', err);
            })

    }

    // Método `configureMiddleware()`

    /**
     * Configura o middleware do Express.
     */

    private configureMiddleware() {
        this.app.use(express.json());
    }

    // Método `configureRoutes()`

    /**
     * Configura as rotas da aplicação.
     */

    private configureRoutes() {
        // Adicione suas rotas aqui
        this.app.get('/', (req, res) => {
            res.send('Hello, SyncFlow!');
        });
    }


    // Método `startServer()`

    /**
     * Inicia o servidor.
     */

    private startServer() {
        this.app.listen(this.PORT, () => {
            console.log(`Servidor rodando na porta ${this.PORT}`);
        });
    }
}

// Instanciação do objeto `Server`
new Server();
