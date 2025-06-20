import { DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

const ShoppingList = sequelize.define("ShoppingList", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2)
  }
},
  {
    timestamps: false,
  }
);

export default ShoppingList;
