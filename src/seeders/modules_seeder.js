'use strict';

const Constants = require('./constants');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.bulkDelete('modules');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    const items = [
      {
        id: 1,
        name: 'Perfil',
        icon: 'profile',
        code: 'profile',
        status: Constants.SEEDERS.MODULES_STATUS.AVAILABLE
      },
      {
        id: 2,
        name: 'Citas',
        icon: 'appointments',
        code: 'appointments',
        status: Constants.SEEDERS.MODULES_STATUS.AVAILABLE
      },
      {
        id: 3,
        name: 'Chats',
        icon: 'chats',
        code: 'chats',
        status: Constants.SEEDERS.MODULES_STATUS.AVAILABLE
      }
    ];
    return queryInterface.bulkInsert('modules',items);
  },

  down: async (queryInterface, Sequelize) => {}
};
