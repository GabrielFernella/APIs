import express from 'express';
import sendError from './app/middlewares/sendError'
import path from 'path'
import routes from'./routes';

import './database';


class App {
    constructor(){
        this.server = express();

        this.middlewares()
        this.routes()
    }

    middlewares(){
        this.server.use(express.json());
        this.server.use(sendError)

        //exibir arquivos estáticos (File)
        this.server.use('/files',
            express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))) //caminho onde está a pasta das imagens
    }

    routes(){
        this.server.use(routes)
    }
}

export default new App().server


//Configs do meu server