import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

const models = [User,File, Appointment];

class Database {
    constructor(){
        this.init();
    }

    init(){
        this.connection = new Sequelize(databaseConfig)

        models
            .map(model => model.init(this.connection)) //verifica todos os models do projeto 
            .map(model => model.associate && model.associate(this.connection.models)) //realiza um map te dodas as associações do projeto
    }
}


export default new Database();