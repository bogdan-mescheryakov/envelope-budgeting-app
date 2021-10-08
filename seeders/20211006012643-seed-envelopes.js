'use strict';
const faker = require('faker');
const envelopes = [...Array(5)].map((envelope) => ({
  envelopeName: faker.hacker.noun(),
  monthLimit: faker.datatype.float({min: 1, max: 1000, precision: .1}),
  currentMoney: faker.datatype.float({min: 1, max: 1000, precision: .1}),
  isEmpty: false,
  iconUrl: faker.internet.url(),
  partOfBalance: null
}))
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Envelopes', envelopes);
 },

 down: async (queryInterface, Sequelize) => {
   await queryInterface.bulkDelete('Envelopes', null, {});
 }
};
