import User from '../models/User';
import File from '../models/File'; //importar para exibir os atributos de File com a referencia de usuário

class ProviderController {
    async index(req,res){
        const providers = await User.findAll({
            where: { provider: true}, //mostrar a condição em que o where vai selecionar
            attributes: ['id', 'name', 'email', 'avatar_id'], //atribustos que serão exibidos do Usuário
            include: [{
                model: File,
                as: 'avatar', //nome que será exibido 
                attributes: ['name', 'path', 'url']
            }], //Mostrará todas as informações do respectivo File

        });

        return res.json(providers)
    }
    
}

export default new ProviderController(); 

/*
    no arquivo app.js contém uma configuração do path de de Files, que está sendo utilizado por um Middleware
*/