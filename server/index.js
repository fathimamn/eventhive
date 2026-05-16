require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");

// Initialize the Express application
const app = express();

// Enable CORS middleware
// This allows requests from different origins (domains) to access our API
// Required for browser-based requests from your frontend application
app.use(cors());

// Enable JSON parsing middleware
// This parses incoming requests with JSON payloads (req.body)
// Required to read request body data from POST/PUT requests
app.use(express.json());

app.use("/uploads", express.static("public/uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// Handle malformed JSON payloads sent to the API
// This catches parsing errors thrown by express.json()
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({
      message: "Invalid JSON payload. Ensure keys and strings use double quotes.",
    });
  }
  next(err);
});

// Health check endpoint
// Returns the current server status and timestamp
// Useful for monitoring and verifying the API is running
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

// Start the server
// Use the PORT from environment variables or default to 5000 (common development port)
// This is the entry point where the server listens for incoming requests
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();

startServer();