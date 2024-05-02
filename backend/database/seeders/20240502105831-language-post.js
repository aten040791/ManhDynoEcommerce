"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const [languages] = await queryInterface.sequelize.query(
      `SELECT id from languages;`
    );
    const [posts] = await queryInterface.sequelize.query(
      `SELECT id from posts;`
    );

    await queryInterface.bulkInsert("Language_Posts", [
      {
        language_id: languages[0].id, //English
        post_id: posts[0].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        language_id: languages[0].id, //English
        post_id: posts[1].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        language_id: languages[0].id, //English
        post_id: posts[2].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        language_id: languages[0].id, //English
        post_id: posts[3].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        language_id: languages[1].id, //Tiếng Việt
        post_id: posts[4].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        language_id: languages[1].id, //Tiếng Việt
        post_id: posts[5].id,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Language_Posts", null, {});
  },
};
