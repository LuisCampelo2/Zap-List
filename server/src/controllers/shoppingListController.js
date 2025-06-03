import ShoppingList from "../models/shoppingList.js";
import Product from "../models/product.js";
import shoppingListProduct from '../models/shoppingListProducts.js'

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

const addProductToShopping = async (req, res) => {
  const { shoppingListId, productId, quantity } = req.body;

  try {
    const shoppingList = await ShoppingList.findByPk(shoppingListId);
    const product = await Product.findByPk(productId);

    if (!shoppingList || !product) {
      return res
        .status(404)
        .json({ message: "Lista de compras ou produto não encontrado" });
    }

    const shoppingListProduct = await ShoppingListProduct.create({
      shoppingListId,
      productId,
      quantity: quantity || 1,
    });
    return res.status(200).json({
      message: "Produto adicionado à lista de compras",
      shoppingListProduct,
    });
  } catch (error) {
    console.error("Erro ao adicionar produto", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

const getProductsShoppingList = async (req, res) => {
  const { id } = req.params;
  try {
    const produtos = await ShoppingListProduct.findAll({
      where: { shoppingListId: id },
      include: [
        {
          model: Product,
          attributes: ["id", "name", "photo", "category"],
        },
      ],
    });
    if (!produtos) {
      return res
        .status(404)
        .json({ message: "Nenhum produto encontrado para essa lista" });
    }
    return res.status(200).json(produtos);
  } catch (error) {
    console.error("Erro ao buscar produtos da lista:", error);
    return res.status(500).json({ message: "Erro ao buscar produtos", error });
  }
};

export const shoppingListController={
  getProductsShoppingList,
  addProductToShopping,
  getAllShoppingList,
  createShoppingList,
};
