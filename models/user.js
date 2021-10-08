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
    }
  };
  User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(36),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique:true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    type: {
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: 'web_user'
    }
}, {
    sequelize,
    modelName: 'User',
    timestamps:false,
    underscored: true
  });
  return User;
};