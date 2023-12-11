"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.PORT = Number(process.env.PORT) || 3000;
        this.connectToDatabase();
        this.configureMiddleware();
        this.configureRoutes();
        this.startServer();
    }
    connectToDatabase() {
        this.client = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 30000,
            keepAlive: false,
            serverApi: mongodb_1.ServerApiVersion.v1,
        };
        const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.r3mgc7u.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;
        mongoose_1.default.connect(uri, this.client).then((res) => {
            console.log('Conectado ao Mongo');
        })
            .catch((err) => {
            console.error('Erro ao conectar ao MongoDB:', err);
        });
    }
    configureMiddleware() {
        this.app.use(express_1.default.json());
    }
    configureRoutes() {
        // Adicione suas rotas aqui
        this.app.get('/', (req, res) => {
            res.send('Hello, SyncFlow!');
        });
    }
    startServer() {
        this.app.listen(this.PORT, () => {
            console.log(`Servidor rodando na porta ${this.PORT}`);
        });
    }
}
new Server();
