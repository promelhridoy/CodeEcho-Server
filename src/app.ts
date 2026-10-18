import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { notFoundHandler } from "./middleware/not-found";
import { errorHandler } from "./middleware/error-handler";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json({ limit: "1mb" }));

// Root route
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to CodeEcho API!",
  });
});

// Server health
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "CodeEcho API is running",
  });
});

// Database health
app.get("/api/health/db", (_req, res) => {
  const connected = mongoose.connection.readyState === 1;

  res.status(connected ? 200 : 503).json({
    success: connected,
    database: connected ? "connected" : "disconnected",
  });
});

// Unknown routes must be handled before the error handler
app.use(notFoundHandler);

// Error handler must be last
app.use(errorHandler);

export default app;