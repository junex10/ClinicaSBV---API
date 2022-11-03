'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.changeColumn(
        'medical_appointments',
        'amount', 
        {
          type: Sequelize.DOUBLE(25, 2),
          after: 'entry_date',
          allowNull: false,
          default: 0
        }
      )
    ])
    return Promise.all([
      queryInterface.addColumn(
        'appointments_control',
        'amount',
        {
          type: Sequelize.DOUBLE(25, 2),
          after: 'doctor_id',
          allowNull: false,
          default: 0
        }
      ),
    ]);
  },

  async down (queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.removeColumn('medical_appointments', 'amount')
    ])
    return Promise.all([
      queryInterface.removeColumn('appointments_control', 'amount')
    ])
  }
};
