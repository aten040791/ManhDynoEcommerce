"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("Users", [
      {
        username: "John Doe",
        email: "johndoe1234@gmail.com",
        password: "123456789",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: "Dinomanh",
        email: "dinomanh1234@gmail.com",
        password: "123456789",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: "Hoang Nam",
        email: "hoangnam1234@gmail.com",
        password: "123456789",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: "Sam Smith",
        email: "samsmith1234@gmail.com",
        password: "123456789",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
