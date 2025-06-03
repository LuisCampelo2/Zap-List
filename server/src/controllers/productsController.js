import Product from "../models/product.js";



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

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar produtos', error: error.message });
  }
};



export const productController = {
  getProduct,
  getAllProducts,
};
