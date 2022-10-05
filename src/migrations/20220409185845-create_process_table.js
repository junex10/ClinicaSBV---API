'use strict';

const Constants = require('./../seeders/constants');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('process', {
      id: Constants.PRIMARY_KEY,
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      link: {
        type: Sequelize.STRING,
        allowNull: true
      },
      ...Constants.DATES_CONTROL
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('process');
  }
};
