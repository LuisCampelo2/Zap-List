const Product = require('./product');
const ShoppingList = require('./shoppingList');

ShoppingList.belongsToMany(Product, { through: 'ShoppingListProduct' });
Product.belongsToMany(ShoppingList, { through: 'ShoppingListProduct' });

module.exports = {
  Product,
  ShoppingList
};
