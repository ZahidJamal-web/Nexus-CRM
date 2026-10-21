
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

/* ----------------------------------
   CORS CONFIGURATION
---------------------------------- */

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://nexuscrm-backend.vercel.app",
  "https://nexuscrm-workspace.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests without an Origin header, such as
    // server-to-server requests and certain API clients.
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.warn("CORS blocked origin:", origin);

    return callback(new Error("Origin not allowed by CORS"));
  },
  credentials: true,
  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
  ],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
  ],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Explicitly handle browser preflight requests.
app.options(/.*/, cors(corsOptions));

/* ----------------------------------
   GENERAL MIDDLEWARE
---------------------------------- */

app.use(express.json({ limit: "1mb" }));

app.use(
  express.urlencoded({
    extended: true,
  })
);

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

/* ----------------------------------
   DATABASE CONNECTION
---------------------------------- */

// Cache the connection promise so simultaneous requests
// do not create duplicate connection attempts.
let dbConnectionPromise;

const ensureDB = async () => {
  if (!dbConnectionPromise) {
    dbConnectionPromise = connectDB().catch((error) => {
      dbConnectionPromise = null;
      throw error;
    });
  }

  await dbConnectionPromise;
};

/* ----------------------------------
   ROOT AND HEALTH ROUTES
---------------------------------- */

// This endpoint can confirm that the deployment is reachable
// without requiring MongoDB to be available.
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Nexus CRM API is running",
  });
});

app.get("/api/route-test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Express route matching works",
    path: req.path,
  });
});

// This endpoint checks the database connection too.
app.get("/api/health", async (req, res) => {
  try {
    await ensureDB();

    res.status(200).json({
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

/* ----------------------------------
   DATABASE MIDDLEWARE
---------------------------------- */

// Ensure the database is ready before processing API routes.
app.use("/api", async (req, res, next) => {
  try {
    await ensureDB();
    next();
  } catch (error) {
    console.error("Database connection failed:", error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

/* ----------------------------------
   API ROUTES
---------------------------------- */

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/analytics", analyticsRoutes);

/* ----------------------------------
   ERROR HANDLING
---------------------------------- */

app.use(notFound);
app.use(errorHandler);

/* ----------------------------------
   LOCAL DEVELOPMENT
---------------------------------- */

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8000;

  app.listen(PORT, () => {
    console.log(`Nexus CRM API running at http://localhost:${PORT}`);
  });
}

/* ----------------------------------
   VERCEL EXPORT
---------------------------------- */

export default app;
