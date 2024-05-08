"use strict";
const bcrypt = require("bcryptjs");
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("Users", [
      {
        username: "admin",
        email: "superadmin123@gmail.com",
        password: await bcrypt.hash("123456789", 10),
        role: "admin",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: "John Doe",
        email: "johndoe1234@gmail.com",
        role: "owner",
        password: await bcrypt.hash("123456789", 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: "Dinomanh",
        email: "dinomanh1234@gmail.com",
        role: "owner",
        password: await bcrypt.hash("123456789", 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: "Hoang Nam",
        email: "hoangnam1234@gmail.com",
        role: "owner",
        password: await bcrypt.hash("123456789", 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: "Sam Smith",
        email: "samsmith1234@gmail.com",
        role: "user",
        password: await bcrypt.hash("123456789", 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};