import ShoppingList from "../models/shoppingList.js";
import Product from "../models/product.js";
import ShoppingListProduct from '../models/shoppingListProducts.js'
import sequelize from "../utils/db.js";
import { Op } from "sequelize";
import QueryTypes from "sequelize";



const updateCheck = async (req, res) => {
  const { id } = req.params;
  const { isChecked } = req.body;
  try {
    const product = await ShoppingListProduct.findByPk(id);

    product.isChecked = isChecked;
    await product.save();
  } catch (error) {
    console.log(error);
  }
}

const getAllShoppingList = async (req, res) => {
  console.log(req.user)
  try {
    const shoppingList = await ShoppingList.findAll({
      where: { userId: req.user.id },
      order:[['id','DESC']]
    });
    res.status(200).json(shoppingList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao listar os produtos", error });
  }
};

const createShoppingList = async (req, res) => {
  console.log(req.user)
  try {
    const { name } = req.body;

    const newList = await ShoppingList.create({ name, userId: req.user.id });
    res.status(201).json(newList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao criar lista de compras." });
  }
};

const addProductToShopping = async (req, res) => {
  const { shoppingListId, productId, quantity, observation } = req.body;

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
      observation
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
  const { name = '', category = '', page = 1, limit = 7 } = req.query;
  
  const offset = (page - 1) * limit;

  try {
    const whereProduct = {
      name: { [Op.like]: `%${name}%` },
      ...(category && { category }),
    };

    const queryOptions = {
      where: { shoppingListId: id },
      include: [
        {
          model: Product,
          where: whereProduct,
          attributes: ["id", "name", "category", "photo"],
        },
      ],
      order: [
        [{ model: Product }, "category", "ASC"],
        [{ model: Product }, "name", "ASC"],
      ],
    };

    if (!name && !category) {
      queryOptions.limit = Number(limit);
      queryOptions.offset = Number(offset);
    }

    const { count, rows: products } = await ShoppingListProduct.findAndCountAll(queryOptions);


    const totalResult = await sequelize.query(`
SELECT p.id, p.price, slp.quantity, (p.price * slp.quantity) AS total_item
  FROM ShoppingListProducts as slp
  JOIN Products p ON p.id = slp.productId
  WHERE slp.shoppingListId = :id
`, {
      replacements: { id },
      type: QueryTypes.SELECT,
    });

    console.log(totalResult);


    const flatTotalResult = Array.isArray(totalResult[0]) ? totalResult[0] : totalResult;

    const total_price = flatTotalResult.reduce((sum, item) => {
      return sum + Number(item.total_item || 0);
    }, 0);



    await sequelize.query(`
  UPDATE ShoppingLists SET totalPrice = :totalPrice WHERE id = :id
`, {
      replacements: { totalPrice: total_price, id },
    });

    const updatedList = await ShoppingList.findByPk(id);

    return res.status(200).json({
      products:products,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      updatedList: updatedList
    });
  } catch (error) {
    console.error("Erro ao buscar produtos da lista:", error);
    return res.status(500).json({ message: "Erro ao buscar produtos", error });
  }
};

const deleteList = async (req, res) => {
  const { id } = req.params;

  try {
    await ShoppingListProduct.destroy({
      where: { shoppingListId: id }
    })
    const list = await ShoppingList.findByPk(id)
    await list.destroy();
    return res.status(200).json({ message: "Lista deletada" });
  } catch (error) {
    console.log(error);
  }
}

const deleteProductList = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await ShoppingListProduct.destroy({
      where: {
        id: id,
      },
    })
    return res.status(200).json({ message: 'Produto removido da lista com sucesso' });
  } catch (error) {
    console.log(error);
  }
}

export const shoppingListController = {
  getProductsShoppingList,
  addProductToShopping,
  getAllShoppingList,
  createShoppingList,
  deleteList,
  deleteProductList,
  updateCheck,
};
