'use strict';

const bcrypt = require('bcryptjs');
const Constants = require('./constants');
const salt = bcrypt.genSaltSync(10);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const items = [
      {
        id: 1,
        email: 'admin@mail.com',
        password: bcrypt.hashSync('123456', salt),
        level_id: Constants.USERS.LEVELS.ADMIN,
        verified: Constants.SEEDERS.USER_VERIFIED.VERIFIED,
        status: Constants.USERS.STATUS.ACTIVATED,
        logged_in: 0
      },
      {
        id: 2,
        email: 'boss@mail.com',
        password: bcrypt.hashSync('123456', salt),
        level_id: Constants.USERS.LEVELS.BOSS,
        verified: Constants.SEEDERS.USER_VERIFIED.VERIFIED,
        status: Constants.USERS.STATUS.ACTIVATED,
        logged_in: 0
      },
      {
        id: 3,
        email: 'secretary@mail.com',
        password: bcrypt.hashSync('123456', salt),
        level_id: Constants.USERS.LEVELS.SECRETARY,
        verified: Constants.SEEDERS.USER_VERIFIED.VERIFIED,
        status: Constants.USERS.STATUS.ACTIVATED,
        logged_in: 0
      },
      {
        id: 4,
        email: 'doctor@mail.com',
        password: bcrypt.hashSync('123456', salt),
        level_id: Constants.USERS.LEVELS.DOCTOR,
        verified: Constants.SEEDERS.USER_VERIFIED.VERIFIED,
        status: Constants.USERS.STATUS.ACTIVATED,
        logged_in: 0
      },
      {
        id: 5,
        email: 'patient@mail.com',
        password: bcrypt.hashSync('123456', salt),
        level_id: Constants.USERS.LEVELS.PATIENT,
        verified: Constants.SEEDERS.USER_VERIFIED.VERIFIED,
        status: Constants.USERS.STATUS.ACTIVATED,
        logged_in: 0
      }
    ];
    return queryInterface.bulkInsert('users',items);
  },

  down: async (queryInterface, Sequelize) => {}
};
