import jwt from 'jsonwebtoken';

import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
    const authHeader = req.headers.authorization; //Buscando os parametros do header da requisição

    if(!authHeader){ //Caso o parametro não esteja no header da requisição, retorna erro
        return res.status(401).json({ error: 'Token not provided' })
    }

    //dividindo o valor do header que por padão vem "bearer kjsdfvlffvdsljf...", e salvando o token apenas em Token
    const [,token] = authHeader.split(' ');

    try {
        //Essa constante utiliza o promisify, onde eu uso o asyncAwait ao invés de callback, que seria o padrão, e além 
        //disso, ele compara o valor de token com o secret, utilizando o jwt.verify
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);

        //Vamos também incluid o ID do usuário para que a requisição já tenha essa informação
        req.userId = decoded.id;

        return next();
        
    } catch (error) {
        return res.status(401).json({ error:'Token invalid' })
    }
}