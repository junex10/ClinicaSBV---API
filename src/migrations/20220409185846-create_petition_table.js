'use strict';

const Constants = require('./../seeders/constants');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('petition', {
      id: Constants.PRIMARY_KEY,
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      process_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'process',
          key: 'id'
        }
      },
      ...Constants.DATES_CONTROL
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('petition');
  }
};
