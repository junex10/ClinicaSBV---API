'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const items = [
      {
        id: 1,
        name: 'Admin',
        code: 'user/admin'
      },
      {
        id: 2,
        name: 'Jefa',
        code: 'user/boss'
      },
      {
        id: 3,
        name: 'Doctor',
        code: 'user/doctor'
      },
      {
        id: 4,
        name: 'Secretaria',
        code: 'user/secretary'
      },
      {
        id: 5,
        name: 'Paciente',
        code: 'user/patient'
      }
    ];
    return queryInterface.bulkInsert('levels',items);
  },

  down: async (queryInterface, Sequelize) => {}
};
