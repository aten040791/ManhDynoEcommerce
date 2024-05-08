"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Language_Posts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      language_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "languages",
          },
          key: "id",
        },
        allowNull: false,
      },
      post_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "posts",
          },
          key: "id",
        },
        allowNull: false,
      },
      locale: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("Language_Posts");
  },
};
