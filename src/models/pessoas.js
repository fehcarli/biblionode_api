'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Usuarios, { foreignKey: 'user_id', as: 'usuarios'});
    }
  }
  Pessoas.init({
    user_id: DataTypes.INTEGER,
    cpf: DataTypes.STRING,
    endereco: DataTypes.STRING,
    numeroEndereco: DataTypes.STRING,
    matricula: DataTypes.STRING,
    unidade: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoas',
  });
  return Pessoas;
};