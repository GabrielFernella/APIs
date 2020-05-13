const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Notes = require('../models/Notes');


const connection = new Sequelize(dbConfig);

User.init(connection);
Notes.init(connection);


//User.associate(connection.models);
Notes.associate(connection.models);


module.exports = connection;