const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const ShoppingListProduct = sequelize.define('ShoppingListProduct', {
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
});

module.exports = ShoppingListProduct;
