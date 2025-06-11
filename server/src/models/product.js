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
      'Hortifruti',
      'Carnes',
      'Laticinios e ovos',
      'Padaria',
      'Temperos e especiarias',
      'Alimentos não pereciveis',
      'Doces e guloseimas',
      'Bebidas',
      'Material de higiene',
      'Material de limpeza',
      'Itens pra cachorro',
      'Outros',
    ],
    allowNull: false
  },
},
  {
    timestamps: false,
  }
    
);

export default Product;
