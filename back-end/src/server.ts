import express from 'express';
import routerUser from './routes/RouterUser';


const app = express();
const port =  3001;

app.use(express.json());

app.use(routerUser);


app.listen(port, () =>{
    console.log(`Servidor Express rodando na porta ${port}`);
})

