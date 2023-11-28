
import cors from "cors";
import express from 'express';
import { errosMiddlware } from './config/middlewares/error';
import routerAdm from './routes/RouterAdmin';
import routerAuthenticate from './routes/RouterAuthenticate';
import routerProject from './routes/RouterProject';
import routerTask from './routes/RouterTask';
import routerUser from './routes/RouterUser';
const app = express();
const port = 3001;

app.use(express.json());

app.use(cors());
app.use(routerUser);
app.use(routerProject);
app.use(routerTask);
app.use(routerAuthenticate);
app.use(routerAdm);

app.use(errosMiddlware);

app.listen(port, () => {
    console.log(`Servidor Express rodando na porta ${port}`);
})

