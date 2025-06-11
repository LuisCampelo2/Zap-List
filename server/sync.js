import sequelize from './src/utils/db.js';
import User from './src/models/user.js';
import Product from './src/models/product.js';
import ShoppingList from './src/models/shoppingList.js';
import ShoppingListProduct from './src/models/shoppingListProducts.js';

User.hasMany(ShoppingList, { foreignKey: 'userId' });
ShoppingList.belongsTo(User, { foreignKey: 'userId' });

sequelize.sync({ alter: true })
