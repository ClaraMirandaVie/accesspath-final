// controllers/establishmentsController.js
import pool from '../db.js';

export async function createEstablishment(req, res) {
  try {
    const { nome, tipo_comida, latitude, longitude, acessibilidade, descricao } = req.body;
    const userId = req.userId;
    const [result] = await pool.query(
      'INSERT INTO establishments (user_id, nome, tipo_comida, latitude, longitude, acessibilidade, descricao) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [userId, nome, tipo_comida, latitude || null, longitude || null, JSON.stringify(acessibilidade || []), descricao || null]
    );
    res.json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
}

export async function getEstablishments(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM establishments');
    // parse JSON
    const data = rows.map(r => ({ ...r, acessibilidade: r.acessibilidade ? JSON.parse(r.acessibilidade) : [] }));
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
}

export async function getEstablishmentById(req, res) {
  try {
    const id = req.params.id;
    const [rows] = await pool.query('SELECT * FROM establishments WHERE id = ?', [id]);
    if (!rows.length) return res.status(404).json({ message: 'Não encontrado' });
    const e = rows[0];
    e.acessibilidade = e.acessibilidade ? JSON.parse(e.acessibilidade) : [];
    res.json(e);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
}

export async function updateEstablishment(req, res) {
  try {
    const id = req.params.id;
    const { nome, tipo_comida, latitude, longitude, acessibilidade, descricao } = req.body;
    await pool.query('UPDATE establishments SET nome=?, tipo_comida=?, latitude=?, longitude=?, acessibilidade=?, descricao=? WHERE id=?',
      [nome, tipo_comida, latitude, longitude, JSON.stringify(acessibilidade || []), descricao, id]);
    res.json({ message: 'Atualizado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
}

export async function deleteEstablishment(req, res) {
  try {
    const id = req.params.id;
    await pool.query('DELETE FROM establishments WHERE id = ?', [id]);
    res.json({ message: 'Deletado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
}
