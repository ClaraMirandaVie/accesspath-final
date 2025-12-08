const db = require("../db");

module.exports = {
  create: async (req, res) => {
    try {
      const { user_id, marker_id, texto } = req.body;

      await db.query(
        "INSERT INTO comments (user_id, marker_id, texto) VALUES (?, ?, ?)",
        [user_id, marker_id, texto]
      );

      res.json({ message: "Comentário enviado" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  listByMarker: async (req, res) => {
    const { id } = req.params;

    const [rows] = await db.query("SELECT * FROM comments WHERE marker_id = ?", [id]);

    res.json(rows);
  },
};
