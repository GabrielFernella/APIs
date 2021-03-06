//Tudo que o será alterado através do usuário 
import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcryptjs';

class User extends Model {
    static init (sequelize){
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
            provider: Sequelize.BOOLEAN,
        },
        {
            sequelize
        }
    );

    this.addHook('beforeSave', async (user) => {
        if(user.password){
            user.password_hash = await bcrypt.hash(user.password, 8);
        }

        }); //ação para criar hash antes de salvar
        return this;
    }

    static associate(models){
        this.belongsTo(models.File, { foreignKey:'avatar_id', as: 'avatar'}) //Pertence a
    }

    checkPassword(password){
        return bcrypt.compare(password, this.password_hash)
    }
}

export default User;