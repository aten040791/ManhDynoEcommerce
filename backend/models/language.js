"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Language extends Model {
    static associate(models) {
      Language.hasMany(models.Language_Post, {
        foreignKey: "language_id",
        as: "language_post",
      });
    }
  }
  Language.init(
    {
      name: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: false,
      },
      locale: {
        type: DataTypes.STRING(10),
        unique: true,
        allowNull: false,
      },
      flag: {
        type: DataTypes.STRING,
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
      modelName: "Language",
      timestamps: false,
    }
  );
  return Language;
};
