const { Product } = require("../models/product");

const createProduct = async (req, res) => {
  try {
    const { name, photo, category } = req.body;
    const product = await Product.create({ name, photo, category });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar o produto", error });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar os produtos", error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    await product.destroy();
    res.status(200).json({ message: "Produto deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar o produto", error });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  deleteProduct,
};
