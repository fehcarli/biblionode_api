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
    }
  }
  Reservas.init({
    usuarioSolicitante: DataTypes.STRING,
    livrosReservados: DataTypes.STRING,
    statusReserva: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Reservas',
  });
  return Reservas;
};