import { DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

const Product = sequelize.define("Product", {
  photo: {
    type: DataTypes.STRING
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM,
    values: [
      'Material de higiene',
      'Material de limpeza',
      'Frutas',
      'Legumes e verdura',
      'Carne',
      'Itens pra cachorro',
      'Alimentos nao pereciveis',
      'Bebidas',
      'Laticinios',
      'Outros'
    ],
    allowNull: false
  },
},
  {
    timestamps: false,
  }
    
);

export default Product;
