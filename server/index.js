const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: require("path").join(__dirname, "../.env") });

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || "*" }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/projects"));

app.get("/api/health", (_, res) => res.json({ status: "ok" }));

app.use((err, _req, res, _next) => {
  console.error("SERVER ERROR:", err);
  res.status(500).json({ error: err.message || "Internal server error" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
