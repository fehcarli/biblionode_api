'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Images.belongsTo(models.Livros, {
        foreignKey: 'book_id',
      });
      Images.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
    }
  }
  Images.init({
    type: DataTypes.STRING,
    name: DataTypes.STRING,
    file: DataTypes.BLOB("long"),
    book_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Images',
  });
  return Images;
};