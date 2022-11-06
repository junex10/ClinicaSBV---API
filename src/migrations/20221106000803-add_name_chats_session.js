'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'chats_session',
        'name',
        {
          type: Sequelize.STRING,
          after: 'host_id',
          allowNull: true
        }
      ),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('chats_session', 'name')
    ])
  }
};
