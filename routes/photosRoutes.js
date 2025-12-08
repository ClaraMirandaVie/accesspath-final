// routes/photosRoutes.js
import express from 'express';
const router = express.Router();
import authMiddleware from '../middlewares/authMiddleware.js';
import upload from '../middlewares/upload.js';
import { uploadPhoto, deletePhoto, getPhotosByEstablishment } from '../controllers/photosController.js';

router.post('/:establishmentId', authMiddleware, upload.single('photo'), uploadPhoto);
router.get('/establishment/:id', getPhotosByEstablishment);
router.delete('/:id', authMiddleware, deletePhoto);

export default router;
