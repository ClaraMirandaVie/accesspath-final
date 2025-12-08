// routes/commentsRoutes.js
import express from 'express';
const router = express.Router();
import authMiddleware from '../middlewares/authMiddleware.js';
import { createComment, getCommentsByEstablishment, deleteComment } from '../controllers/commentsController.js';

router.post('/', authMiddleware, createComment);
router.get('/establishment/:id', getCommentsByEstablishment);
router.delete('/:id', authMiddleware, deleteComment);

export default router;
