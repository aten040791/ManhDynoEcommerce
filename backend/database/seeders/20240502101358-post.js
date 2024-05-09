"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    let [users] = await queryInterface.sequelize.query(`SELECT id from users;`);
    let [categories] = await queryInterface.sequelize.query(
      `SELECT id from categories;`
    );
    users = users.sort((a, b) => a.id - b.id);
    categories = categories.sort((a, b) => a.id - b.id);

    await queryInterface.bulkInsert("Posts", [
      {
        category_id: categories[0].id,
        user_id: users[1].id,
        related_id: 0,
        locale: "en_us",
        title: "Learn about Reactjs for beginners",
        slug: "learn-about-reactjs-for-beginners",
        content: "Content of post learn about Reactjs for beginners",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        category_id: categories[1].id,
        user_id: users[1].id,
        related_id: 0,
        locale: "en_us",
        title: "Learn about NodeJS for beginners",
        slug: "learn-about-nodejs-for-beginners",
        content: "Content of post learn about NodeJS for beginners",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        category_id: categories[2].id,
        user_id: users[2].id,
        related_id: 0,
        locale: "en_us",
        title: "ChatGPT and Bard: What's the difference?",
        slug: "chatgpt-and-bard-what's-the-difference",
        content: "Content of post ChatGPT and Bard",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        category_id: categories[3].id,
        user_id: users[3].id,
        related_id: 0,
        locale: "en_us",
        title: "How to migrate Angular CoreModule to standalone APIs?",
        slug: "how-to-migrate-angular-core-module-to-standalone-api",
        content: "Content of post Angular CoreModule to standalone APIs",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    let [posts] = await queryInterface.sequelize.query(`SELECT id from posts;`);
    posts = posts.sort((a, b) => a.id - b.id);

    await queryInterface.bulkInsert("Posts", [
      {
        category_id: categories[0].id,
        user_id: users[1].id,
        related_id: posts[0].id,
        locale: "vi",
        title: "Học về ReactJS cho người mới bắt đầu",
        slug: "hoc-ve-react-js-cho-nguoi-moi-bat-dau",
        content: "Nội dung bài tìm hiểu về Reactjs cho người mới bắt đầu",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        category_id: categories[2].id,
        user_id: users[2].id,
        related_id: posts[2].id,
        locale: "vi",
        title: "ChatGPT và Bard: Đâu là sự khác biệt?",
        slug: "chat-gpt-va-bard-dau-la-su-khac-biet",
        content: "Nội dung bài ChatGPT và Bard",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Posts", null, {});
  },
};