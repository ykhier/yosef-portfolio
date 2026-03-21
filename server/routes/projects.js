const router = require("express").Router();
const pool = require("../db");
const authMiddleware = require("../middleware/auth");

// GET all projects (public)
router.get("/", async (_, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, title, description, github_url, category, created_at, image_url FROM projects ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create project (admin only)
router.post("/", authMiddleware, async (req, res) => {
  const { title, description, github_url, category, image_url } = req.body;

  if (!title || !description || !github_url || !category || !image_url) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (!["personal", "academic"].includes(category)) {
    return res.status(400).json({ error: "Category must be personal or academic" });
  }

  try {
    const { rows } = await pool.query(
      "INSERT INTO projects (title, description, image_url, github_url, category) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, description, image_url, github_url, category]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT edit project (admin only)
router.put("/:id", authMiddleware, async (req, res) => {
  const { title, description, github_url, category, image_url } = req.body;

  if (!title || !description || !github_url || !category) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (!["personal", "academic"].includes(category)) {
    return res.status(400).json({ error: "Category must be personal or academic" });
  }

  try {
    let query, params;
    if (image_url) {
      query = "UPDATE projects SET title=$1, description=$2, github_url=$3, category=$4, image_url=$5 WHERE id=$6 RETURNING *";
      params = [title, description, github_url, category, image_url, req.params.id];
    } else {
      query = "UPDATE projects SET title=$1, description=$2, github_url=$3, category=$4 WHERE id=$5 RETURNING *";
      params = [title, description, github_url, category, req.params.id];
    }

    const { rows, rowCount } = await pool.query(query, params);
    if (rowCount === 0) return res.status(404).json({ error: "Project not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE project (admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { rowCount } = await pool.query(
      "DELETE FROM projects WHERE id = $1",
      [req.params.id]
    );
    if (rowCount === 0) return res.status(404).json({ error: "Project not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
