import express from 'express';
import routerUser from './routes/RouterUser';
import routerProject from './routes/RouterProject';
import routerTask from './routes/RouterTask';
import routerAuthenticate from './routes/RouterAuthenticate';
const app = express();
const port =  3001;

app.use(express.json());

app.use(routerUser);
app.use(routerProject);
app.use(routerTask);
app.use(routerAuthenticate);

app.listen(port, () =>{
    console.log(`Servidor Express rodando na porta ${port}`);
})

