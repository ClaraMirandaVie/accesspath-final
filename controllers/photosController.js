// controllers/photosController.js
import pool from '../db.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function uploadPhoto(req, res) {
  try {
    const establishmentId = req.params.establishmentId;
    const userId = req.userId;
    if (!req.file) return res.status(400).json({ message: 'Arquivo não enviado' });

    const filename = req.file.filename;
    // URL pública (ajuste se rodar em produção)
    const url = `${req.protocol}://${req.get('host')}/uploads/${filename}`;

    const [result] = await pool.query('INSERT INTO photos (establishment_id, user_id, filename, url) VALUES (?, ?, ?, ?)', [establishmentId, userId, filename, url]);
    res.json({ id: result.insertId, url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
}

export async function getPhotosByEstablishment(req, res) {
  try {
    const id = req.params.id;
    const [rows] = await pool.query('SELECT * FROM photos WHERE establishment_id = ? ORDER BY created_at DESC', [id]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
}

export async function deletePhoto(req, res) {
  try {
    const id = req.params.id;
    // opcional: checar se o usuário é autor...
    const [rows] = await pool.query('SELECT filename FROM photos WHERE id = ?', [id]);
    if (!rows.length) return res.status(404).json({ message: 'Foto não encontrada' });

    const filename = rows[0].filename;
    // removendo do FS
    const filepath = path.join(__dirname, '..', 'uploads', filename);
    import('fs').then(fs => {
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
    });

    await pool.query('DELETE FROM photos WHERE id = ?', [id]);
    res.json({ message: 'Foto deletada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
}
