'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Users', {
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
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Users');
  }
};

