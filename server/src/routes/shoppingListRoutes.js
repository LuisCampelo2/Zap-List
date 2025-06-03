import express from 'express';
const router = express.Router();
import { shoppingListController } from '../controllers/shoppingListController.js';
import { authMiddleWare } from '../middleware/authMiddleware.js';

router.get('/lists', authMiddleWare.middleWare, shoppingListController.getAllShoppingList);
router.post('/shopping-lists',authMiddleWare.middleWare, shoppingListController.createShoppingList)
router.post('/shopping-list-add-product', shoppingListController.addProductToShopping);
router.get('/list/:id/productsList', shoppingListController.getProductsShoppingList);



export default router;