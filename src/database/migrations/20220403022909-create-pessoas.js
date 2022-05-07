'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pessoas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cpf: {
        type: Sequelize.STRING
      },
      matricula: {
        type: Sequelize.STRING
      },
      endereco: {
        type: Sequelize.STRING
      },
      numeroEndereco: {
        type: Sequelize.STRING
      },
      unidade: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE 
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pessoas');
  }
};
