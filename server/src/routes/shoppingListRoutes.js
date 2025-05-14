const express = require('express');
const router = express.Router();
const shoppingListController = require('../controllers/shoppingListController');

router.get('/lists', shoppingListController.getAllShoppingList);
router.post('/shopping-lists', shoppingListController.createShoppingList)
router.post('/shopping-list-add-product', shoppingListController.addProductToShopping);
router.get('/list/:id/productsList', shoppingListController.getProductsShoppingList);



module.exports = router;