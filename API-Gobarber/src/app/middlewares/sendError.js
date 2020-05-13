//Função para envio de erros que pode ser passado pelo controller 'res.sendError('Erro no banco dedos', 500)'

module.exports = (req,res,next) => {
    res.sendError = function(message,status = 500) {
        return this
            .status(status)
            .send({ message })
    }

    next();
}


/* Seu arquivo de server ficará com um middleware a mais para que suas rotas possa ter acesso a essa função

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


*/