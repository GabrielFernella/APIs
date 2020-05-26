'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users', //tabela da tabela que será alterada
      'avatar_id', //nome do campo que será adicionado 
      { //parametros de avatar_id
        type: Sequelize.INTEGER,
        references: { model: 'files', key: 'id'}, //está referenciando o id da tabela files
        onUpdate: 'CASCADE', //o que acontece com o a tabela quando o arquivo for alterado ou deletado
        onDelete: 'SET NULL', // mesma coisa
        allowNull: true,
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users','avatar_id');
  }
};