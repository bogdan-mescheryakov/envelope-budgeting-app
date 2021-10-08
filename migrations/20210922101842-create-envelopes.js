'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Envelopes', {
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
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Envelopes');
  }
};
