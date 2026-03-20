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
  if (!verifyAuth(req)) return res.status(401).json({ error: "Unauthorized" });

  const { id } = req.query;

  try {
    if (req.method === "PUT") {
      const { title, description, github_url, category, image_url } = req.body;
      if (!title || !description || !github_url || !category) {
        return res.status(400).json({ error: "All fields are required" });
      }

      let query, params;
      if (image_url) {
        query = "UPDATE projects SET title=$1, description=$2, github_url=$3, category=$4, image_url=$5 WHERE id=$6 RETURNING *";
        params = [title, description, github_url, category, image_url, id];
      } else {
        query = "UPDATE projects SET title=$1, description=$2, github_url=$3, category=$4 WHERE id=$5 RETURNING *";
        params = [title, description, github_url, category, id];
      }

      const { rows, rowCount } = await pool.query(query, params);
      if (rowCount === 0) return res.status(404).json({ error: "Project not found" });
      return res.json(rows[0]);
    }

    if (req.method === "DELETE") {
      const { rowCount } = await pool.query("DELETE FROM projects WHERE id=$1", [id]);
      if (rowCount === 0) return res.status(404).json({ error: "Project not found" });
      return res.json({ message: "Deleted" });
    }

    res.status(405).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
