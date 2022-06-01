'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Filiada extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Filiada.belongsTo(models.User, {
        foreignKey: 'id',
      });
    }
  }
  Filiada.init({
    nome: DataTypes.STRING,
    matricula: DataTypes.STRING,
    unidade: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Filiadas',
  });
  return Filiada;
};