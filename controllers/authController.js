// controllers/authController.js
import pool from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export async function register(req, res) {
  try {
    const { tipo, nome, email, senha, cnpj, endereco, descricao } = req.body;
    const [rows] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (rows.length) return res.status(400).json({ message: 'Email já cadastrado' });

    const hashed = await bcrypt.hash(senha, 10);
    const [result] = await pool.query(
      'INSERT INTO users (tipo, nome, email, senha, cnpj, endereco, descricao) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [tipo, nome, email, hashed, cnpj || null, endereco || null, descricao || null]
    );

    const userId = result.insertId;
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ id: userId, tipo, nome, email, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
}

export async function login(req, res) {
  try {
    const { email, senha } = req.body;
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (!rows.length) return res.status(400).json({ message: 'Usuário não encontrado' });

    const user = rows[0];
    const isValid = await bcrypt.compare(senha, user.senha);
    if (!isValid) return res.status(401).json({ message: 'Senha inválida' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ id: user.id, tipo: user.tipo, nome: user.nome, email: user.email, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
}
