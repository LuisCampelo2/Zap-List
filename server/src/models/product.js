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
      'Peixes',
      'Massas',
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
  price: {
    type:DataTypes.DOUBLE,
  },
  unitOFMeasure: {
    type: DataTypes.ENUM,
    values: [
      'KG',
      'Unidade',
      'Pacote'
    ]
  }
},
  {
    timestamps: false,
  }
    
);

export default Product;
