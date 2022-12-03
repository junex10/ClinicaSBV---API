'use strict';

const Constants = require('./constants');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.bulkDelete('actions');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    const items = [
      {
        id: 1,
        main: Constants.SEEDERS.ACTIONS.MAIN,
        module_id: Constants.SEEDERS.MODULES.PROFILE,
        name: 'Ver perfil',
        code: '/profile'
      },
      {
        id: 2,
        main: Constants.SEEDERS.ACTIONS.NO_MAIN,
        module_id: Constants.SEEDERS.MODULES.PROFILE,
        name: 'Editar asociado',
        code: 'profile/associated-details'
      },
      {
        id: 3,
        main: Constants.SEEDERS.ACTIONS.MAIN,
        module_id: Constants.SEEDERS.MODULES.APPOINTMENTS.VIEW_APPOINTMENTS,
        name: 'Solicitar cita',
        code: '/patient/appointments'
      },
      {
        id: 4,
        main: Constants.SEEDERS.ACTIONS.NO_MAIN,
        module_id: Constants.SEEDERS.MODULES.APPOINTMENTS.VIEW_APPOINTMENTS,
        name: 'Ver Solicitudes de Citas',
        code: '/patient/appointments-list'
      },
      {
        id: 5,
        main: Constants.SEEDERS.ACTIONS.MAIN,
        module_id: Constants.SEEDERS.MODULES.CHAT,
        name: 'Ver Chats',
        code: '/chats'
      },
      {
        id: 6,
        main: Constants.SEEDERS.ACTIONS.MAIN,
        module_id: Constants.SEEDERS.MODULES.APPOINTMENTS.DOCTOR.VIEW_APPOINTMENTS,
        name: 'Ver listado de Citas del Doctor',
        code: '/doctor/appointments/appointments-list'
      },
      {
        id: 7,
        main: Constants.SEEDERS.ACTIONS.NO_MAIN,
        module_id: Constants.SEEDERS.MODULES.APPOINTMENTS.DOCTOR.VIEW_APPOINTMENTS,
        name: 'Exportar listado de Citas',
        code: '/doctor/appointments/appointments-list'
      },
      {
        id: 8,
        main: Constants.SEEDERS.ACTIONS.MAIN,
        module_id: Constants.SEEDERS.MODULES.APPOINTMENTS.DOCTOR.VIEW_STATISTICS,
        name: 'Exportar estadisticas del Doctor',
        code: '/doctor/appointments/statistics'
      },
      {
        id: 9,
        main: Constants.SEEDERS.ACTIONS.MAIN,
        module_id: Constants.SEEDERS.MODULES.STATISTICS.VIEW_STATISTICS,
        name: 'Ver estadisticas',
        code: '/admin/statistics'
      },
      {
        id: 10,
        main: Constants.SEEDERS.ACTIONS.NO_MAIN,
        module_id: Constants.SEEDERS.MODULES.STATISTICS.VIEW_STATISTICS,
        name: 'Exportar estadisticas',
        code: '/admin/statistics'
      }
    ];
    return queryInterface.bulkInsert('actions',items);
  },

  down: async (queryInterface, Sequelize) => {}
};
