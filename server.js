// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// servir arquivos de uploads estaticamente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// rotas
import authRoutes from './routes/authRoutes.js';
import establishmentsRoutes from './routes/establishmentsRoutes.js';
import commentsRoutes from './routes/commentsRoutes.js';
import photosRoutes from './routes/photosRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/establishments', establishmentsRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/photos', photosRoutes);

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
