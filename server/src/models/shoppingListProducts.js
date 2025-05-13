const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const ShoppingListProduct = sequelize.define('ShoppingListProduct', {
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  isChecked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
},
  {
    timestamps: false,
  }
);

module.exports = ShoppingListProduct;
