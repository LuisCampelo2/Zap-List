import { QueryTypes } from "sequelize";
import sequelize from "../utils/db.js";
import puppeteer from 'puppeteer';

const getAllProducts = async (req, res) => {
  try {
    const { name = '', category = '' } = req.query;

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

    res.status(200).json(formattedProducts);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar os produtos", error });
  }
};

const scrappingPrice = async (req, res) => {
  let browser;
  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    const [products] = await sequelize.query('SELECT id, name FROM products');

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
          'UPDATE products SET price = ? WHERE id = ?',
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
};



export const productController = {
  getAllProducts,
  scrappingPrice
};
