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

const getProduct = async (req, res) => {
   try {
    const { id } = req.params;

    const products = await Product.sequelize.query(
       `SELECT p.id, p.quantity, p.productId, pd.name
       FROM products as p
       JOIN products pd ON p.productId = pd.id
       WHERE p.shoppingListId = :id`,
      {
        replacements: { id },
        type: Product.sequelize.QueryTypes.SELECT,
      }
    );

    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'Nenhum produto encontrado' });
    }

    // Retornando os produtos com o nome incluído
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar produtos', error: error.message });
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
  getProduct,
  createProduct,
  getAllProducts,
  deleteProduct,
};
