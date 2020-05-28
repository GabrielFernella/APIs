import Sequelize, { Model } from 'sequelize';

class Appointment extends Model {
    static init (sequelize){
        super.init({
            date: Sequelize.DATE,
            canceled_at: Sequelize.DATE,
            //o campo User_id e Provider_id será incerido pela associação a baixo
        },
        {
            sequelize
        }
    );
        return this;
    }
    //Fazendo o relacionamento
    static associate(models){
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user'});
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'provider'}); 
    }
}

export default Appointment;

//Inserir esse Model em index.js na database