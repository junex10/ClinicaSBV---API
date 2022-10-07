'use strict';

const Constants = require('./../seeders/constants');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('cash_movements_type', {
      id: Constants.PRIMARY_KEY,
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      averague: {
        type: Sequelize.FLOAT,
        allowNull: false,
        default: 0
      },
      ...Constants.DATES_CONTROL
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('cash_movements_type');
  }
};
