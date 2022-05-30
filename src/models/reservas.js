'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reservas.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
      Reservas.belongsTo(models.Livros, {
        foreignKey: 'book_id',
      })
    }
  }
  Reservas.init({
    dataEmprestimo: DataTypes.DATE,
    dataDevolucao: DataTypes.DATE,
    statusReserva: DataTypes.STRING,
    user_id: DataTypes.STRING,
    book_id: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Reservas',
  });
  return Reservas;
};