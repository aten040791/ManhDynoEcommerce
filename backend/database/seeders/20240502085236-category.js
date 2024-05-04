"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("Categories", [
      {
        name: "reacjs",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "nodejs",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "techology",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "angular",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "php",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
