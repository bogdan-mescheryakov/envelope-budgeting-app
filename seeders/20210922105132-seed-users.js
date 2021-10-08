'use strict';
const faker = require('faker');
const users = [...Array(5)].map((user) => ({
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(10)
}))

module.exports = {
  up: async (queryInterface) => {
     await queryInterface.bulkInsert('Users', users);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
