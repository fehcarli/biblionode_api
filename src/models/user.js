'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.UserInfo, {
        foreignKey: 'user_id',
      });
      User.hasOne(models.Images, {
        foreignKey: 'user_id',
      });
      User.hasOne(models.Filiadas, {
        foreignKey: 'user_id',
      });
      User.belongsToMany(models.Reservas, {
        through: 'Reservas',
        foreignKey: 'user_id',
        as: 'user'
      })
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    passwordResetToken: DataTypes.STRING,
    passwordResetExpires: DataTypes.DATE,
    role_id: DataTypes.INTEGER,
  }, {
    sequelize,
    paranoid: true,
    timestamps: true,
    modelName: 'User',
  });
  return User;
};