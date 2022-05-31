'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BookImages.belongsTo(models.Livros, {
        foreignKey: 'book_id',
      });
    }
  }
  BookImages.init({
    type: DataTypes.STRING,
    name: DataTypes.STRING,
    file: DataTypes.BLOB("long"),
    book_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'BookImages',
  });
  return BookImages;
};