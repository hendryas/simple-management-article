'use strict';
const { encryptPwd } = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    nama: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: 'Inputan Nama User Tidak Boleh Kosong!'
        }
      }
    },
    umur: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          message: 'Inputan Umur User Tidak Boleh Kosong!'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: 'Inputan Username Tidak Boleh Kosong!'
        }
      },
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: 'Inputan Password Tidak Boleh Kosong!'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: function (user, options) {
        user.password = encryptPwd(user.password);
      }
    },
    sequelize,
    modelName: 'user',
  });
  return user;
};