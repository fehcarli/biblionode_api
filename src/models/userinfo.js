'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserInfo.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
    }
  }
  UserInfo.init({
    nome: DataTypes.STRING,
    sobrenome: DataTypes.STRING,
    cpf: DataTypes.STRING,
    endereco: DataTypes.STRING,
    numero: DataTypes.STRING,
    cep: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid: true,
    modelName: 'UserInfo',
  });
  return UserInfo;
};