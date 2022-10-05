'use strict';

const Constants = require('./constants');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.bulkDelete('permissions');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    let items = [];

    items = [
      {
        id: 1,
        action_id: 1,
        level_id: Constants.USERS.LEVELS.ADMIN
      },
      {
        id: 2,
        action_id: 2,
        level_id: Constants.USERS.LEVELS.ADMIN
      },
      {
        id: 3,
        action_id: 3,
        level_id: Constants.USERS.LEVELS.ADMIN
      },
      {
        id: 4,
        action_id: 4,
        level_id: Constants.USERS.LEVELS.ADMIN
      }
    ];
    queryInterface.bulkInsert('permissions',items);

    items = [
        {
          id: 5,
          action_id: 1,
          level_id: Constants.USERS.LEVELS.BOSS
        },
        {
          id: 6,
          action_id: 2,
          level_id: Constants.USERS.LEVELS.BOSS
        },
        {
          id: 7,
          action_id: 3,
          level_id: Constants.USERS.LEVELS.BOSS
        },
        {
          id: 8,
          action_id: 4,
          level_id: Constants.USERS.LEVELS.BOSS
        }
      ];
      queryInterface.bulkInsert('permissions',items);

      items = [
        {
          id: 9,
          action_id: 1,
          level_id: Constants.USERS.LEVELS.DOCTOR
        },
        {
          id: 10,
          action_id: 2,
          level_id: Constants.USERS.LEVELS.DOCTOR
        },
        {
          id: 11,
          action_id: 3,
          level_id: Constants.USERS.LEVELS.DOCTOR
        },
        {
          id: 12,
          action_id: 4,
          level_id: Constants.USERS.LEVELS.DOCTOR
        }
      ];
      queryInterface.bulkInsert('permissions',items);

      items = [
        {
          id: 13,
          action_id: 1,
          level_id: Constants.USERS.LEVELS.PATIENT
        },
        {
          id: 14,
          action_id: 2,
          level_id: Constants.USERS.LEVELS.PATIENT
        },
        {
          id: 15,
          action_id: 3,
          level_id: Constants.USERS.LEVELS.PATIENT
        },
        {
          id: 16,
          action_id: 4,
          level_id: Constants.USERS.LEVELS.PATIENT
        }
      ];
      queryInterface.bulkInsert('permissions',items);

      items = [
        {
          id: 17,
          action_id: 1,
          level_id: Constants.USERS.LEVELS.SECRETARY
        },
        {
          id: 18,
          action_id: 2,
          level_id: Constants.USERS.LEVELS.SECRETARY
        },
        {
          id: 19,
          action_id: 3,
          level_id: Constants.USERS.LEVELS.SECRETARY
        },
        {
          id: 20,
          action_id: 4,
          level_id: Constants.USERS.LEVELS.SECRETARY
        }
      ];
      return queryInterface.bulkInsert('permissions',items);
  },

  down: async (queryInterface, Sequelize) => {}
};
