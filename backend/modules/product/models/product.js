"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        lowercase: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price:{
        type: DataTypes.INTERGER,

      }
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
