"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LanguagePost extends Model {
    static associate(models) {
      LanguagePost.belongsTo(models.Language, {
        targetKey: "id",
        foreignKey: "language_id",
        as: "language",
      });
      LanguagePost.belongsTo(models.Post, {
        targetKey: "id",
        foreignKey: "post_id",
        as: "post",
      });
    }
  }
  LanguagePost.init(
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
      modelName: "Language_Post",
      timestamps: false,
    }
  );
  return LanguagePost;
};