const express = require("express");
const app = express();
const cors = require("cors");
const shoppingListRoutes = require("./src/routes/shoppingListRoutes");
const productsRoutes = require("./src/routes/productsRoutes");

app.use(express.json());
app.use(cors());

app.use("/api", shoppingListRoutes);
app.use("/api", productsRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
