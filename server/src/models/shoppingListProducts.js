const { DataTypes } = require("sequelize");
const sequelize = require("../../db");
const { ShoppingList } = require("./shoppingList");
const { Product } = require("./product");

const ShoppingListProduct = sequelize.define(
  "ShoppingListProduct",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    isChecked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    shoppingListId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "ShoppingLists",
        key: "id",
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Products",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  }
);

ShoppingListProduct.belongsTo(ShoppingList, { foreignKey: "shoppingListId" });
ShoppingListProduct.belongsTo(Product, { foreignKey: "productId" });

module.exports = { ShoppingListProduct };
