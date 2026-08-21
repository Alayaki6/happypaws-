const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "HappyPaws backend is running."
  });
});

// Root API
app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the HappyPaws API."
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`HappyPaws backend running on port ${PORT}`);
});
