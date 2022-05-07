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
    }
  }
  BookImages.init({
    name: DataTypes.STRING,
    book_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BookImages',
  });
  return BookImages;
};