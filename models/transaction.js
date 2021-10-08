'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Transaction.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    envelopeId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Envelope',
            key: 'id'
        },
        onDelete:'cascade',
        allowNull: false
    },
    date: {
        type: DataTypes.TIME,
        allowNull: false,
        defaultValue: 'NOW()'
    },
    paymentAmount: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Transaction',
    timestamps:false
    //underscored: true
  });
  return Transaction;
};