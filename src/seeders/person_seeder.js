'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.bulkDelete('person');
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    const items = [
        {
            id: 1,
            name: 'ADMIN',
            lastname: 'ADMIN',
            user_id: 1,
            medical_history: 0,
            age: 20,
            birthdate: new Date(),
            document: '123456',
            phone: '123456',
            address: '123456'
        },
        {
            id: 2,
            name: 'BOSS',
            lastname: 'BOSS',
            user_id: 2,
            medical_history: 0,
            age: 20,
            birthdate: new Date(),
            document: '123456',
            phone: '123456',
            address: '123456'
        },
        {
            id: 3,
            name: 'SECRETARY',
            lastname: 'SECRETARY',
            user_id: 3,
            medical_history: 0,
            age: 20,
            birthdate: new Date(),
            document: '123456',
            phone: '123456',
            address: '123456'
        },
        {
            id: 4,
            name: 'DOCTOR',
            lastname: 'DOCTOR',
            user_id: 4,
            medical_history: 0,
            age: 20,
            birthdate: new Date(),
            document: '123456',
            phone: '123456',
            address: '123456'
        },
        {
            id: 5,
            name: 'PATIENT',
            lastname: 'PATIENT',
            user_id: 5,
            medical_history: 0,
            age: 20,
            birthdate: new Date(),
            document: '123456',
            phone: '123456',
            address: '123456'
        }
    ];

    return queryInterface.bulkInsert('person',items);
  },

  down: async (queryInterface, Sequelize) => {}
};
