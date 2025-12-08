// controllers/commentsController.js
import pool from '../db.js';

export async function createComment(req, res) {
  try {
    const { establishment_id, texto } = req.body;
    const user_id = req.userId;
    const [result] = await pool.query('INSERT INTO comments (user_id, establishment_id, texto) VALUES (?, ?, ?)', [user_id, establishment_id, texto]);
    res.json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
}

export async function getCommentsByEstablishment(req, res) {
  try {
    const estId = req.params.id;
    const [rows] = await pool.query(
      `SELECT c.*, u.nome AS autor_nome
       FROM comments c
       JOIN users u ON c.user_id = u.id
       WHERE c.establishment_id = ?
       ORDER BY c.created_at DESC`, [estId]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
}

export async function deleteComment(req, res) {
  try {
    const commentId = req.params.id;
    const userId = req.userId;
    // opcional: verificar se o comentário pertence ao usuário
    const [rows] = await pool.query('SELECT user_id FROM comments WHERE id = ?', [commentId]);
    if (!rows.length) return res.status(404).json({ message: 'Comentário não encontrado' });
    if (rows[0].user_id !== userId) return res.status(403).json({ message: 'Sem permissão' });

    await pool.query('DELETE FROM comments WHERE id = ?', [commentId]);
    res.json({ message: 'Deletado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
}
