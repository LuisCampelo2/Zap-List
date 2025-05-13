const express = require('express');
const router = express.Router();
const shoppingListController = require('../controllers/shoppingList');

router.get('/lists', shoppingListController.getAllShoppingList);
router.post('/shopping-lists',shoppingListController.createShoppingList)



module.exports = router;