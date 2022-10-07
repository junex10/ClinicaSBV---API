'use strict';

const Constants = require('./../seeders/constants');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('events', {
      id: Constants.PRIMARY_KEY,
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      event_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'events_type',
          key: 'id'
        }
      },
      repeat: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0,
        comment: 'Not repeat = 0; repeat = 1'
      },
      status: Constants.STATUS,
      ...Constants.DATES_CONTROL
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('events');
  }
};
