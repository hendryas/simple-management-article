'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  article.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: 'Inputan Artikel Tidak Boleh Kosong!'
        }
      }
    },
    content: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: 'Inputan Content Tidak Boleh Kosong!'
        }
      }
    },
    status_posting: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'article',
  });
  return article;
};