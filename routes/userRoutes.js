// routes/usersRoutes.js
import express from 'express';
const router = express.Router();
import authMiddleware from '../middlewares/authMiddleware.js';
import { getProfile, updateProfile } from '../controllers/userController.js';

router.get('/me', authMiddleware, getProfile);
router.put('/me', authMiddleware, updateProfile);

export default router;
