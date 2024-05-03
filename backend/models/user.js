"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, {
        foreignKey: "user_id",
        as: "post",
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING(20),
      },
      email: {
        type: DataTypes.STRING(30),
        unique: true,
      },
      password: {
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
      modelName: "User",
      timestamps: false,
    }
  );
  return User;
};
