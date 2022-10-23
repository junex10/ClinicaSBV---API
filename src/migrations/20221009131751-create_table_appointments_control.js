'use strict';

const Constants = require('../seeders/constants');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('appointments_control', {
      id: Constants.PRIMARY_KEY,
      day: {
        type: Sequelize.STRING,
        allowNull: false
      },
      quotes_available: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 1
      },
      doctor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        comment: 'Doctor id'
      },
      specialization_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'specializations',
          key: 'id'
        }
      },
      ...Constants.DATES_CONTROL
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('appointments_control');
  }
};
