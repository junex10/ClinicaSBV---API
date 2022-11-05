'use strict';

const Constants = require('./constants');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.bulkDelete('permissions');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    await queryInterface.sequelize.query('ALTER TABLE permissions AUTO_INCREMENT = 1');

    let items = [];

    items = [
      {
        action_id: 1,
        level_id: Constants.USERS.LEVELS.ADMIN
      },
      {
        action_id: 2,
        level_id: Constants.USERS.LEVELS.ADMIN
      },
      {
        action_id: 3,
        level_id: Constants.USERS.LEVELS.ADMIN
      },
      {
        action_id: 4,
        level_id: Constants.USERS.LEVELS.ADMIN
      }
    ];
    queryInterface.bulkInsert('permissions',items);

    items = [
        {
          action_id: 1,
          level_id: Constants.USERS.LEVELS.BOSS
        },
        {
          action_id: 2,
          level_id: Constants.USERS.LEVELS.BOSS
        },
        {
          action_id: 3,
          level_id: Constants.USERS.LEVELS.BOSS
        },
        {
          action_id: 4,
          level_id: Constants.USERS.LEVELS.BOSS
        }
      ];
      queryInterface.bulkInsert('permissions',items);

      items = [
        {
          action_id: 1,
          level_id: Constants.USERS.LEVELS.DOCTOR
        },
        {
          action_id: 2,
          level_id: Constants.USERS.LEVELS.DOCTOR
        },
        {
          action_id: 3,
          level_id: Constants.USERS.LEVELS.DOCTOR
        },
        {
          action_id: 4,
          level_id: Constants.USERS.LEVELS.DOCTOR
        }
      ];
      queryInterface.bulkInsert('permissions',items);

      items = [
        {
          action_id: 1,
          level_id: Constants.USERS.LEVELS.PATIENT
        },
        {
          action_id: 2,
          level_id: Constants.USERS.LEVELS.PATIENT
        },
        {
          action_id: 3,
          level_id: Constants.USERS.LEVELS.PATIENT
        },
        {
          action_id: 4,
          level_id: Constants.USERS.LEVELS.PATIENT
        }
      ];
      queryInterface.bulkInsert('permissions',items);

      items = [
        {
          action_id: 1,
          level_id: Constants.USERS.LEVELS.SECRETARY
        },
        {
          action_id: 2,
          level_id: Constants.USERS.LEVELS.SECRETARY
        },
        {
          action_id: 3,
          level_id: Constants.USERS.LEVELS.SECRETARY
        },
        {
          action_id: 4,
          level_id: Constants.USERS.LEVELS.SECRETARY
        }
      ];
      return queryInterface.bulkInsert('permissions',items);
  },

  down: async (queryInterface, Sequelize) => {}
};
