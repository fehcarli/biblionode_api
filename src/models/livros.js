'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Livros extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Livros.hasOne(models.BookImages, {
        foreignKey: 'book_id',
      });
      Livros.belongsToMany(models.Reservas, {
        through: 'Reservas',
        foreignKey: 'book_id',
        as: 'livros'
      })
    }
  }
  Livros.init({
    titulo: DataTypes.STRING,
    autor: DataTypes.STRING,
    idLivro: DataTypes.STRING,
    ISBN: DataTypes.STRING,
    editora: DataTypes.STRING,
    edicao: DataTypes.STRING,
    ano: DataTypes.STRING,
    genre_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Livros',
  });
  return Livros;
};