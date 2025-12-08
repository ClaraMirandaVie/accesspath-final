// routes/establishmentsRoutes.js
import express from 'express';
const router = express.Router();
import authMiddleware from '../middlewares/authMiddleware.js';
import {
  createEstablishment,
  getEstablishments,
  getEstablishmentById,
  updateEstablishment,
  deleteEstablishment
} from '../controllers/establishmentsController.js';

router.post('/', authMiddleware, createEstablishment);
router.get('/', getEstablishments);
router.get('/:id', getEstablishmentById);
router.put('/:id', authMiddleware, updateEstablishment);
router.delete('/:id', authMiddleware, deleteEstablishment);

export default router;
