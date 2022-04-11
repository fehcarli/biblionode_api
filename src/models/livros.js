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
      Livros.belongsTo(models.Generos, {foreignKey: 'id'});
    }
  }
  Livros.init({
    titulo: DataTypes.STRING,
    autor: DataTypes.STRING,
    codLivro: DataTypes.STRING,
    isbn: DataTypes.STRING,
    editora: DataTypes.STRING,
    edicao: DataTypes.STRING,
    ano: DataTypes.STRING,
    generosId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Livros',
  });
  return Livros;
};