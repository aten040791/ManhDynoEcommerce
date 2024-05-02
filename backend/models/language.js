"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Language extends Model {
    static associate(models) {
      Language.hasMany(models.Language_Post);
    }
  }
  Language.init(
    {
      name: {
        type: DataTypes.STRING(20),
      },
      locale: {
        type: DataTypes.STRING(20),
      },
      flag: {
        type: DataTypes.STRING,
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
    }
  );
  return Language;
};
