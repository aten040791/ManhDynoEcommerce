"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Language_Post extends Model {
    static associate(models) {
      Language_Post.belongsTo(models.Language, {
        targetKey: "id",
        foreignKey: "language_id",
        as: "language",
      });
      Language_Post.belongsTo(models.Post, {
        targetKey: "id",
        foreignKey: "post_id",
        as: "post",
      });
    }
  }
  Language_Post.init(
    {
      language_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      post_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      locale: {
        type: DataTypes.STRING(20),
        unique: true,
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
      modelName: "Language_Post",
      timestamps: false,
    }
  );
  return Language_Post;
};
