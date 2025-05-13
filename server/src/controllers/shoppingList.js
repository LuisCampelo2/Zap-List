const { ShoppingList } = require("../models/shoppingList");

const getAllShoppingList = async (req, res) => {
  try {
    const shoppingList = await ShoppingList.findAll();
    res.status(200).json(shoppingList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao listar os produtos", error });
  }
};

const createShoppingList = async (req, res) => {
  try {
    const { name } = req.body;

    const newList = await ShoppingList.create({ name });
    res.status(201).json(newList);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar lista de compras." });
  }
};

module.exports = {
  getAllShoppingList,
  createShoppingList,
};
