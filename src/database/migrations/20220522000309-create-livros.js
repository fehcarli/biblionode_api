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
      ISBN: {
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
      numPaginas: {
        type: Sequelize.STRING
      },
      genre_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         
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