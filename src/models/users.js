'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.UserInfos, { foreignKey: 'id' });
    }
  }
  Users.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    passwordResetToken: DataTypes.STRING,
    passwordResetExpires: DataTypes.DATE,
    role_id: DataTypes.INTEGER,
    info_id: DataTypes.INTEGER,
  }, {
    sequelize,
    paranoid: true,
    timestamps: true,
    modelName: 'Users',
  });
  return Users;
};