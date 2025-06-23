import { QueryTypes } from "sequelize";
import sequelize from "../utils/db.js";
import puppeteer from 'puppeteer';
import cron from 'node-cron';

const getAllProducts = async (req, res) => {
  try {
    const { name = '', category = '',listId} = req.query;

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

    const formattedProducts = products.map(p => ({
      ...p,
      price: p.price !== null ? Number(p.price).toFixed(2).replace('.', ',') : null
    }));

    let productsInList = [];

    if (listId) {
       const listProductsQuery = `
        SELECT productId FROM ShoppingListProducts
        WHERE shoppingListId = :listId
      `;
       const listProducts = await sequelize.query(listProductsQuery, {
        replacements: { listId },
        type: QueryTypes.SELECT,
       });
       productsInList = listProducts.map((p) => p.productId);
    }

    res.status(200).json({
      products:formattedProducts,
      productsInList:productsInList,
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar os produtos", error });
  }
};

const scrappingPrice = async (req, res) => {
  await runsScraping();
  res.send("Scraping manual executado com sucesso!");
}
const runScraping = async () => {
  let browser;
  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    const [products] = await sequelize.query('SELECT id, name FROM Products');

    console.log('Produtos carregados:', products);

    for (const product of products) {
      const searchTerm = encodeURIComponent(product.name.toLowerCase());
      const url = `https://www.superpaguemenos.com.br/${searchTerm}/`;

      await page.goto(url, { waitUntil: 'networkidle2' });

      const prices = await page.evaluate(() => {
        const el = document.querySelector('.item-product');
        const pricesArray = [];


        if (el) {
          const fraction = el.querySelector('.sale-price')?.textContent.replace(/[^\d,]/g, '').replace(',', '.');

          if (fraction) {
            const price = parseFloat(fraction);
            if (!isNaN(price)) pricesArray.push(price);
          }
        }

        return pricesArray;
      });

      if (prices.length > 0) {
        const averagePrice = prices.reduce((sum, val) => sum + val, 0) / prices.length;

        await sequelize.query(
          'UPDATE Products SET price = ? WHERE id = ?',
          {
            replacements: [averagePrice.toFixed(2), product.id]
          }
        );

        console.log(`Produto: ${product.name} | Novo preço médio: R$ ${averagePrice.toFixed(2)}`);
      } else {
        console.log(`Nenhum preço encontrado para: ${product.name}`);
      }
    }

    res.send('Preços de todos os produtos atualizados com sucesso!');
  } catch (error) {
    console.error('Erro no scraping:', error.message);
    res.status(500).send('Erro ao buscar preços.');
  } finally {
    if (browser) await browser.close();
  }
}

cron.schedule('0 3 * * *', async () => {
  console.log('Rodando scraping agendado...');
  await runScraping();
});


export const productController = {
  getAllProducts,
  scrappingPrice
};
