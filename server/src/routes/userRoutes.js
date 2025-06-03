import express from 'express';
const router = express.Router();
import { authMiddleWare } from '../middleware/authMiddleware.js';
import { userControllers } from '../controllers/userController.js';


router.get('/me', authMiddleWare.middleWare, userControllers.infoUser);

export default router;