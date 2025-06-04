import express from 'express';
import { productController } from '../controllers/productsController.js'
const router = express.Router();
import { authMiddleWare } from '../middleware/authMiddleware.js';


router.get('/products',authMiddleWare.middleWare, productController.getAllProducts); 

export default router;