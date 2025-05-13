const express = require('express');
const router = express.Router();
const getAllProducts = require('../controllers/shoppingList');

router.get('/lists', getAllProducts);



module.exports = router;