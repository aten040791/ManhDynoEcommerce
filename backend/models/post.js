"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.Category, {
        targetKey: "id",
        foreignKey: "category_id",
      });

      Post.belongsTo(models.User, {
        targetKey: "id",
        foreignKey: "user_id",
      });

      Post.hasMany(models.Language_Post);
    }
  }
  Post.init(
    {
      category_id: {
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      related_id: {
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING(100),
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
    }
  );
  return Post;
};
