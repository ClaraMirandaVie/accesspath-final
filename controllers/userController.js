// controllers/usersController.js
import pool from '../db.js';
import bcrypt from 'bcryptjs';

export async function getProfile(req, res) {
  const userId = req.userId;
  try {
    const [rows] = await pool.query('SELECT id,tipo,nome,email,cnpj,endereco,descricao FROM users WHERE id = ?', [userId]);
    if (!rows.length) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
}

export async function updateProfile(req, res) {
  const userId = req.userId;
  const { nome, email, senha, cnpj, endereco, descricao } = req.body;
  try {
    const updates = [];
    const values = [];

    if (nome) { updates.push('nome = ?'); values.push(nome); }
    if (email) { updates.push('email = ?'); values.push(email); }
    if (senha) { const hash = await bcrypt.hash(senha, 10); updates.push('senha = ?'); values.push(hash); }
    if (cnpj) { updates.push('cnpj = ?'); values.push(cnpj); }
    if (endereco) { updates.push('endereco = ?'); values.push(endereco); }
    if (descricao) { updates.push('descricao = ?'); values.push(descricao); }

    if (!updates.length) return res.status(400).json({ message: 'Nada para atualizar' });

    const sql = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
    values.push(userId);
    await pool.query(sql, values);

    res.json({ message: 'Perfil atualizado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
}
