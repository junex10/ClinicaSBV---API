'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'users',
        'associated_id',
        {
          type: Sequelize.INTEGER,
          after: 'id',
          allowNull: true,
          references: {
            model: 'users',
            key: 'id'
          }
        }
      ),
    ]);
  },

  async down (queryInterface, Sequelize) {
   return Promise.all([
    queryInterface.removeColumn('users', 'associated_id')
   ])
  }
};
