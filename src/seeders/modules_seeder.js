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
      },
      {
        id: 4,
        name: 'Listado de citas del Doctor',
        icon: 'appointments',
        code: 'doctor-appointments',
        status: Constants.SEEDERS.MODULES_STATUS.AVAILABLE
      },
      {
        id: 5,
        name: 'Estadisticas del Doctor',
        icon: 'appointments',
        code: 'doctor-statistics',
        status: Constants.SEEDERS.MODULES_STATUS.AVAILABLE
      },
      {
        id: 6,
        name: 'Estadisticas del Sistema',
        icon: 'statistics',
        code: 'admin-statistics',
        status: Constants.SEEDERS.MODULES_STATUS.AVAILABLE
      }
    ];
    return queryInterface.bulkInsert('modules',items);
  },

  down: async (queryInterface, Sequelize) => {}
};
