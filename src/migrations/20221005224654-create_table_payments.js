'use strict';

const Constants = require('./../seeders/constants');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('payments', {
      id: Constants.PRIMARY_KEY,
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      payment_type_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'payments_type',
          key: 'id'
        }
      },
      references: {
        type: Sequelize.STRING,
        allowNull: false
      },
      amount: {
        type: Sequelize.STRING,
        allowNull: false
      },
      attachment: {
        type: Sequelize.STRING,
        allowNull: true
      },
      verified: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0
      },
      status: Constants.STATUS,
      ...Constants.DATES_CONTROL
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('payments');
  }
};
