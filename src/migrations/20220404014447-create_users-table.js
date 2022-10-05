'use strict';

const constants = require('../seeders/constants');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: constants.PRIMARY_KEY,
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      level_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'levels',
          key: 'id'
        }
      },
      token: {
        type: Sequelize.STRING,
        allowNull: true
      },
      facebook: {
        type: Sequelize.INTEGER(1),
        allowNull: true
      },
      google: {
        type: Sequelize.INTEGER(1),
        allowNull: true
      },
      google_id: {
        type: Sequelize.STRING,
        allowNull: true
      },
      facebook_id: {
        type: Sequelize.STRING,
        allowNull: true
      },
      photo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      logged_in: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0
      },
      verified: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0
      },
      status: constants.STATUS,
      ...constants.DATES_CONTROL
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
