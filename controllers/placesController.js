import db from "../config/db.js";

export const createPlace = async (req, res) => {
  try {
    const { nome, descricao, lat, lng } = req.body;
    const foto = req.file ? req.file.filename : null;

    await db.query(
      "INSERT INTO places (nome, descricao, lat, lng, foto) VALUES (?, ?, ?, ?, ?)",
      [nome, descricao, lat, lng, foto]
    );

    res.json({ message: "Local cadastrado!" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getPlaces = async (req, res) => {
  try {
    const [data] = await db.query("SELECT * FROM places");
    res.json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};
