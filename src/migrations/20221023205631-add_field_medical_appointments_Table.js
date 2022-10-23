'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'medical_appointments',
        'specialization_id',
        {
          type: Sequelize.INTEGER,
          after: 'doctor_id',
          allowNull: true,
          references: {
            model: 'specializations',
            key: 'id'
          }
        }
      ),
    ]);
  },

  async down (queryInterface, Sequelize) {
   return Promise.all([
    queryInterface.removeColumn('medical_appointments', 'specialization_id')
   ])
  }
};
