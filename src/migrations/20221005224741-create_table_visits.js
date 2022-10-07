'use strict';

const Constants = require('../seeders/constants');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('visits', {
      id: Constants.PRIMARY_KEY,
      visits: {
        type: Sequelize.STRING,
        allowNull: false,
        default: '0'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('visits');
  }
};
