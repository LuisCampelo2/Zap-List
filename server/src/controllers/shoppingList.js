const { ShoppingList } = require('../models/shoppingList');

const getAllShoppingList = async (req, res) => {
  try {
    const shoppingList = await ShoppingList.findAll();
    res.status(200).json(shoppingList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao listar os produtos", error });
  }
};

module.exports = getAllShoppingList;
