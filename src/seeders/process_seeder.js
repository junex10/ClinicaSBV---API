'use strict';

const Constants = require('./constants');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.bulkDelete('process');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    const items = [
      {
        id: 1,
        description: 'Agrega un asociado',
        link: '/profile'
      }
    ];
    return queryInterface.bulkInsert('process',items);
  },

  down: async (queryInterface, Sequelize) => {}
};
