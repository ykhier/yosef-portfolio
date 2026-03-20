import jwt from "jsonwebtoken";
import pool from "../_db.js";

function verifyAuth(req) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) return null;
  try {
    return jwt.verify(auth.slice(7), process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const { rows } = await pool.query("SELECT * FROM projects ORDER BY created_at DESC");
      return res.json(rows);
    }

    if (req.method === "POST") {
      if (!verifyAuth(req)) return res.status(401).json({ error: "Unauthorized" });

      const { title, description, github_url, category, image_url } = req.body;
      if (!title || !description || !github_url || !category || !image_url) {
        return res.status(400).json({ error: "All fields are required" });
      }
      if (!["personal", "academic"].includes(category)) {
        return res.status(400).json({ error: "Invalid category" });
      }

      const { rows } = await pool.query(
        "INSERT INTO projects (title, description, image_url, github_url, category) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [title, description, image_url, github_url, category]
      );
      return res.status(201).json(rows[0]);
    }

    res.status(405).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
