import express from 'express';
const router = express.Router();
import { authController } from '../controllers/authController.js';

router.post('/register', authController.register);
router.get('/activation/:activationToken', authController.activate);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

export default router;