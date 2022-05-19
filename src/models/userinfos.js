'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserInfos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, { foreignKey: 'id'});
    }
  }
  UserInfos.init({
    nome: DataTypes.STRING,
    sobrenome: DataTypes.STRING,
    cpf: DataTypes.STRING,
    endereco: DataTypes.STRING,
    numero: DataTypes.STRING,
    cep: DataTypes.STRING,
  }, {
    sequelize,
    paranoid: true,
    modelName: 'UserInfos',
  });
  return UserInfos;
};