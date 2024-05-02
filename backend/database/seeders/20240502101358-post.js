"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const [users] = await queryInterface.sequelize.query(
      `SELECT id from users;`
    );
    const [categories] = await queryInterface.sequelize.query(
      `SELECT id from categories;`
    );

    await queryInterface.bulkInsert("Posts", [
      {
        category_id: categories[0].id,
        user_id: users[0].id,
        related_id: 0,
        title: "Learn about Reactjs for beginners",
        content: "Content of post learn about Reactjs for beginners",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        category_id: categories[1].id,
        user_id: users[1].id,
        related_id: 0,
        title: "Learn about NodeJS for beginners",
        content: "Content of post learn about NodeJS for beginners",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        category_id: categories[2].id,
        user_id: users[2].id,
        related_id: 0,
        title: "ChatGPT and Bard: What's the difference?",
        content: "Content of post ChatGPT and Bard",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        category_id: categories[3].id,
        user_id: users[1].id,
        related_id: 0,
        title: "How to migrate Angular CoreModule to standalone APIs?",
        content: "Content of post Angular CoreModule to standalone APIs",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    const [posts] = await queryInterface.sequelize.query(
      `SELECT id from posts;`
    );

    await queryInterface.bulkInsert("Posts", [
      {
        category_id: categories[0].id,
        user_id: users[2].id,
        related_id: posts[0].id,
        title: "Học về ReactJS cho người mới bắt đầu",
        content: "Nội dung bài tìm hiểu về Reactjs cho người mới bắt đầu",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        category_id: categories[2].id,
        user_id: users[2].id,
        related_id: posts[2].id,
        title: "ChatGPT và Bard: Đâu là sự khác biệt?",
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
