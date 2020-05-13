import * as Yup from 'yup';
import User from '../models/User';

class UserController {
    async store(req,res){
        //Schema Validation
        const schema = Yup.object().shape({
            name: Yup
                .string()
                .required(),
            email: Yup
                .string()
                .email()
                .required(),
            password: Yup
                .string()
                .min(6)
                .required(),
        });
        //Verifica se o Schema é válido, se não, retorna erro
        if(!(await schema.isValid)){
            return res.status(400).json({error: 'Validations Fails' })
        }


        const userExists = await User.findOne({ where: { email: req.body.email }})
        if(userExists){
            return res.status(400).json({error: 'User alredy exists' })
        }

        const {id, name, email,provider} = await User.create(req.body)

        return res.json({
            id,
            name, 
            email,
            provider
        });
    }

    async update(req, res ) {

        //Schema Validation
        const schema = Yup.object().shape({
            name: Yup
                .string(),
            email: Yup
                .string()
                .email(),
            oldPassword: Yup
                .string()
                .min(6),
            password: Yup
                .string()
                .min(6)
                .when('oldPassword', (oldPassword, field) => 
                    oldPassword ? field.required() : field //torna obrigatório se o campo oldPassword estiver preenchido
                    ),
            confirmPassword: Yup
                .string()
                .when('password', (password, field) => 
                    password ? field.required().oneOf([Yup.ref('password')]) : field
                ) //oneOF indica que o campo deve ser igual a um dos Array | o Yup.ref carrega a referencia do campo que está utilizando para comparar

                
        });
        //Verifica se o Schema é válido, se não, retorna erro
        if(!(await schema.isValid)){
            return res.status(400).json({error: 'Validations Fails' })
        }
        //--------------------------------------------------------------
        const { email , oldPassword } = req.body;

        //Está procurando o usuário pela chave userId que é criada pelo Middleware de autenticação
        const user = await User.findByPk(req.userId);
        //Validando se o Email existe
        if(email != user.email) {
            const userExists = await User.findByPk({ where: { email: req.body.email}})

            if(userExists){
                return res.status(400).json({ error: 'User alredy exists.'});
            }
        }

        //Verifica se o usuário passou o oldPassword e se não for a mesma, retorna erro.
        if(oldPassword && !(await user.checkPassword(oldPassword))){
            res.status(401).json({ error: 'Password does not match'})
        }

        //Validar para que o update não altere a senha sem que passe o oldPassword

        const {id, name, provider} = await user.update(req.body);

        return res.json({
            id,
            name, 
            email,
            provider
        });
    }

}

export default new UserController();