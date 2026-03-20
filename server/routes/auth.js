const router = require("express").Router();
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: require("path").join(__dirname, "../../.env") });

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.json({ token });
});

module.exports = router;
