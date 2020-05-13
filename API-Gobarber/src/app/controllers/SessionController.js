import jwt from 'jsonwebtoken'; //importação de Módulo
import authConfig from '../../config/auth';

import User from '../models/User';

class SessionController {
    async store(req, res){
        const { email, password } = req.body;

        //find email in your database
        const user = await User.findOne({ where: { email }});
        if(!user){
            return res.status(400).json({ error: 'User not found'})
        }

        if(!(await user.checkPassword(password))){
            return res.status(401).json('Password does not match')
        }

        const { id, name } = user;

        return res.json({
            user: {
                id,
                name,
                email
            },
            token: jwt.sign({ id }, authConfig.secret, { expiresIn: authConfig.expiresIn})
        })

    }
}

export default new SessionController();