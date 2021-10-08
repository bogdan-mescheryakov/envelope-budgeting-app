'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Envelope extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Envelope.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        envelopeName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        monthLimit: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false
        },
        currentMoney: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false
        },
        isEmpty: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        iconUrl: {
            type: DataTypes.STRING,
        },
        partOfBalance: {
            type: DataTypes.DECIMAL(5, 2),
        }
    }, {
    sequelize,
    modelName: 'Envelope',
    timestamps:false
    //underscored: true
  });
  return Envelope;
};
