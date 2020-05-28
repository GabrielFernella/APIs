'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('appointments', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      //Referencia do usuário que fez o agendamento
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id'},
        onUpdate: 'CASCADE', //Se o usuário for alterado
        onDelete: 'SET NULL', //Para guardar um histórico
        allowNull: true
      },
      //Referencia do provider escolhido para o agendamento
      provider_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id'},
        onUpdate: 'CASCADE', //Se o usuário for alterado
        onDelete: 'SET NULL', //Para guardar um histórico
        allowNull: true
      },
      //Caso haja algum cancelamento
      canceled_at: {
        type: Sequelize.DATE,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    
    });

  },

  down: (queryInterface) => {
    return queryInterface.dropTable('appointments');
  }
};
