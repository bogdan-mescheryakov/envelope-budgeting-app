'use strict';

module.exports = {
  up: (queryInterface, DataTypes, Sequelize) => {
    return queryInterface.createTable('Transactions', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      envelopeId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Envelopes',
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
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Transactions');
  }
};

