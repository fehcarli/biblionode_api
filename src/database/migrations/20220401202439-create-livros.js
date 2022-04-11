'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Livros', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING
      },
      autor: {
        type: Sequelize.STRING
      },
      codLivro: {
        type: Sequelize.STRING
      },
      isbn: {
        type: Sequelize.STRING
      },
      editora: {
        type: Sequelize.STRING
      },
      edicao: {
        type: Sequelize.STRING
      },
      ano: {
        type: Sequelize.STRING
      },
      generosId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {         // User belongsTo Generos 1:1
          model: 'Generos',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Livros');
  }
};