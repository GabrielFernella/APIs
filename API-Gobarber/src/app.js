import express from 'express';
import sendError from './app/middlewares/sendError'
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
    }

    routes(){
        this.server.use(routes)
    }
}

export default new App().server


//Configs do meu server