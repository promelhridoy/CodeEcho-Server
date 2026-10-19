import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { notFoundHandler } from "./middleware/not-found";
import { errorHandler } from "./middleware/error-handler";
import projectRoutes from "./routes/project.routes";
import openApiRoutes from "./routes/openapi.routes";

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

// Project routes
app.use("/api/projects", projectRoutes);

// OpenAPI routes
app.use("/api/openapi", openApiRoutes);

// Unknown routes must be handled before the error handler
app.use(notFoundHandler);

// Error handler must be last
app.use(errorHandler);

export default app;