const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const ShoppingList = sequelize.define(
  "ShoppingList",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = { ShoppingList };
