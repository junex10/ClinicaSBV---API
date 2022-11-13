'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'chats_session',
        'attachment', 
        {
          type: Sequelize.STRING,
          after: 'name',
          allowNull: true
        }
      )
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([ queryInterface.removeColumn('chats_session', 'attachment') ]);
  }
};
