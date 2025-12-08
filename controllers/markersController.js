const db = require("../db");

module.exports = {
  create: async (req, res) => {
    try {
      const { user_id, nome_estabelecimento, descricao, latitude, longitude } = req.body;

      const [result] = await db.query(
        "INSERT INTO markers (user_id, nome_estabelecimento, descricao, latitude, longitude) VALUES (?, ?, ?, ?, ?)",
        [user_id, nome_estabelecimento, descricao, latitude, longitude]
      );

      res.json({ id: result.insertId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  list: async (req, res) => {
    const [rows] = await db.query("SELECT * FROM markers");
    res.json(rows);
  },
};
