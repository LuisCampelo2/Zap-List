import express from 'express';
const router = express.Router();
import { shoppingListController } from '../controllers/shoppingListController.js';

router.get('/lists', shoppingListController.getAllShoppingList);
router.post('/shopping-lists', shoppingListController.createShoppingList)
router.post('/shopping-list-add-product', shoppingListController.addProductToShopping);
router.get('/list/:id/productsList', shoppingListController.getProductsShoppingList);



export default router;