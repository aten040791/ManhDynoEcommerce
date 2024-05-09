"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.Category, {
        targetKey: "id",
        foreignKey: "category_id",
        as: "category",
      });

      Post.belongsTo(models.User, {
        targetKey: "id",
        foreignKey: "user_id",
        as: "author",
      });

      Post.hasMany(models.Language_Post, {
        onDelete: "CASCADE",
        foreignKey: "post_id",
        as: "language_post",
      });
    }
  }
  Post.init(
    {
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      related_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      locale: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Post",
      timestamps: false,
    }
  );
  return Post;
};