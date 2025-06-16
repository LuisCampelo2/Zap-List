import { QueryTypes } from "sequelize";
import sequelize from "../utils/db.js";

const getAllProducts = async (req, res) => {
  try {
    const { name='', category=''} = req.query;

    const query = `
    SELECT * FROM Products
    WHERE name LIKE :name
    AND (:category = '' OR category= :category)
    ORDER BY category, name
    `;

     const products = await sequelize.query(query, {
      replacements: {
        name: `%${name}%`,
        category,
      },
      type: QueryTypes.SELECT,
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar os produtos", error });
  }
};



export const productController = {
  getAllProducts,
};
