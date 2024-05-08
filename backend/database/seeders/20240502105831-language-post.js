"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    let [languages] = await queryInterface.sequelize.query(
      `SELECT id from languages;`
    );
    let [locales] = await queryInterface.sequelize.query(
      "SELECT locale from languages"
    );

    let [posts] = await queryInterface.sequelize.query(`SELECT id from posts;`);

    languages = languages.sort((a, b) => a.id - b.id);
    posts = posts.sort((a, b) => a.id - b.id);

    await queryInterface.bulkInsert("Language_Posts", [
      {
        language_id: languages[0].id, //English
        post_id: posts[0].id,
        locale: locales[0].locale, // en-US
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        language_id: languages[0].id, //English
        post_id: posts[1].id,
        locale: locales[0].locale, // en-US
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        language_id: languages[0].id, //English
        post_id: posts[2].id,
        locale: locales[0].locale, // en-US
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        language_id: languages[0].id, //English
        post_id: posts[3].id,
        locale: locales[0].locale, // en-US
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        language_id: languages[1].id, //Tiếng Việt
        post_id: posts[4].id,
        locale: locales[1].locale, // vi-VI
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        language_id: languages[1].id, //Tiếng Việt
        post_id: posts[5].id,
        locale: locales[1].locale, // vi-VI
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Language_Posts", null, {});
  },
};