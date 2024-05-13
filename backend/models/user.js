"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
const { config } = require("configs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, {
        onDelete: "CASCADE",
        foreignKey: "user_id",
        as: "post",
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(30),
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING(10),
        defaultValue: "guest",
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
      modelName: "User",
      timestamps: false,
    }
  );
  User.beforeSave(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, config.hashing.bcrypt.rounds);
    user.password = hashedPassword;
  });
  return User;
};