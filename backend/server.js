import "dotenv/config";

import express from "express";
import cors from "cors";
import morgan from "morgan";

import { connectDB } from "./config/db.js";

import {
  notFound,
  errorHandler,
} from "./middleware/error.middleware.js";

import authRoutes from "./routes/auth.routes.js";
import leadRoutes from "./routes/lead.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import noteRoutes from "./routes/note.routes.js";
import taskRoutes from "./routes/task.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";

const app = express();

/* ──────────────────────────────────
   CORS
────────────────────────────────── */

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://nexuscrm-backend.vercel.app/",
  process.env.FRONTEND_URL,
].filter(Boolean);


app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Nexus CRM Backend is running",
  });
});

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin
      // (Postman, server-to-server, etc.)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("CORS blocked:", origin);

      return callback(
        new Error("Not allowed by CORS")
      );
    },
    credentials: true,
  })
);

/* ──────────────────────────────────
   Middleware
────────────────────────────────── */

app.use(express.json({ limit: "1mb" }));

app.use(
  express.urlencoded({
    extended: true,
  })
);

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

/* ──────────────────────────────────
   Database
────────────────────────────────── */

let dbConnected = false;

const ensureDB = async () => {
  if (!dbConnected) {
    await connectDB();
    dbConnected = true;

    console.log("✅ Database connected");
  }
};

/* ──────────────────────────────────
   Database Middleware
────────────────────────────────── */

// Make sure the database is connected
// before handling API requests.

app.use(async (req, res, next) => {
  try {
    await ensureDB();
    next();
  } catch (error) {
    console.error("❌ Database connection failed:", error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

/* ──────────────────────────────────
   Root
────────────────────────────────── */

app.get("/", (req, res) => {
  res.json({
    success: true,
    service: "Nexus CRM API",
    status: "running",
  });
});

/* ──────────────────────────────────
   Health
────────────────────────────────── */

app.get("/api/health", async (req, res) => {
  try {
    await ensureDB();

    res.json({
      success: true,
      status: "ok",
      service: "Nexus CRM API",
      database: "connected",
    });
  } catch (error) {
    console.error("Health check failed:", error);

    res.status(500).json({
      success: false,
      status: "error",
      message: "Database connection failed",
    });
  }
});

/* ──────────────────────────────────
   Routes
────────────────────────────────── */

app.use("/api/auth", authRoutes);

app.use("/api/leads", leadRoutes);

app.use("/api/contacts", contactRoutes);

app.use("/api/notes", noteRoutes);

app.use("/api/tasks", taskRoutes);

app.use("/api/ai", aiRoutes);

app.use("/api/analytics", analyticsRoutes);

/* ──────────────────────────────────
   Error Handling
────────────────────────────────── */

app.use(notFound);

app.use(errorHandler);

/* ──────────────────────────────────
   Local Development
────────────────────────────────── */

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8000;

  ensureDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(
          `🚀 Nexus CRM API running on http://localhost:${PORT}`
        );
      });
    })
    .catch((err) => {
      console.error(
        "Database connection failed:",
        err
      );

      process.exit(1);
    });
}

/* ──────────────────────────────────
   Vercel
────────────────────────────────── */

export default app;