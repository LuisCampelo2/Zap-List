const express = require('express');
const router = express.Router();

const {
  createProduct,
  deleteProduct,
  getAllProducts,
} = require('../controllers/productsController');


router.get('/products', getAllProducts); 
router.delete('/products/:id', deleteProduct); 

module.exports = router;