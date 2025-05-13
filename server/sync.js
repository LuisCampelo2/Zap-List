const sequelize = require('./src/db');
const  Product  = require('./src/models/product');
const  ShoppingList  = require('./src/models/shoppingList');

// Importar o modelo intermediário se você criou
const ShoppingListProduct = require('./src/models/shoppingListProducts');

async function syncDatabase() {
  try {
    await sequelize.sync({alter:true}); 
    console.log('Tabelas criadas com sucesso!');
    process.exit();
  } catch (error) {
    console.error('Erro ao sincronizar:', error);
  }
}

syncDatabase();
