'use strict';
const faker = require('faker');
const transactions = [...Array(5)].map((transaction)=> ({
  envelopeId: faker.datatype.number({min: 1, max: 5}),
  date: faker.date.recent(),
  paymentAmount: faker.datatype.float({min: 1, max: 1000, precision: .2})
}))
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Transactions', transactions);
 },

 down: async (queryInterface, Sequelize) => {
   await queryInterface.bulkDelete('Transactions', null, {});
 }
};
