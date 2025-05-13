const express = require('express');
const router = express.Router();
const getShoppingList  = require('../controllers/shoppingList');

router.get('/lists', getShoppingList);



module.exports = router;