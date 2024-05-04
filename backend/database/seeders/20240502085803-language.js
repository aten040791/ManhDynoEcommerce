"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("Languages", [
      {
        name: "English",
        locale: "en-Us",
        flag: "https://i.ibb.co/23W0ztT/US.png",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Tiếng Việt",
        locale: "vi-VI",
        flag: "https://i.ibb.co/8ghqdNK/VN.png",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Languages", null, {});
  },
};
