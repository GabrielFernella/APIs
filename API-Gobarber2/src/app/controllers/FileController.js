//Controller destinado a salvar as refeências do arquivo no banco de dados 
import File from '../models/File';

class FileController {
    async store(req, res) {
        const { originalname: name, filename: path } = req.file;

        const file = await File.create({
            name,
            path
        })
        
        return res.json(file);
    }
}

export default new FileController(); 

/*
    Precisa existir uma tabela no banco de dados para guardar as referencias
    npx sequelize migration:create --name=create-files
    
    Edite e rode 
    npx sequelize  db:migrate



    avatar usuário 2 , quase metade 
*/