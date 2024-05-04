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
        as: "user",
      });

      Post.hasMany(models.Language_Post, {
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
      },
      title: {
        type: DataTypes.STRING(100),
        unique: true,
      },
      content: {
        type: DataTypes.TEXT,
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
