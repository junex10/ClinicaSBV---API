'use strict';

const Constants = require('./../seeders/constants');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('person', {
      id: Constants.PRIMARY_KEY,
      name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      medical_history: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      birthdate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      document: {
        type: Sequelize.STRING,
        allowNull: true
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      ...Constants.DATES_CONTROL
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('person');
  }
};
