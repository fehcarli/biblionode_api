'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Emprestimos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Emprestimos.init({
    dataEmprestimo: DataTypes.DATE,
    dataDevolucao: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Emprestimos',
  });
  return Emprestimos;
};