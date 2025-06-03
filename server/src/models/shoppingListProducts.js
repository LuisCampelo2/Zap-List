import { DataTypes } from "sequelize";
import sequelize from "../utils/db.js";
import ShoppingList from "./shoppingList.js";
import Product from "./product.js";

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

export default ShoppingListProduct;
