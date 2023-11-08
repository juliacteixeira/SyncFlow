import express from 'express';
import routerUser from './routes/RouterUser';
import routerProject from './routes/RouterProject';

const app = express();
const port =  3001;

app.use(express.json());

app.use(routerUser);
app.use(routerProject);


app.listen(port, () =>{
    console.log(`Servidor Express rodando na porta ${port}`);
})

