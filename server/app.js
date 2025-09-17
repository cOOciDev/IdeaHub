import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import ideaRoutes from "./routes/ideas.js";
import newsRoutes from "./routes/news.js";
import juryRoutes from "./routes/jury.js";
import adminRoutes from "./routes/admin.js";
import settingsRoutes from "./routes/settings.js";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";

const app = express();

// security
app.use(helmet());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const origins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
app.use(cors({ origin: (origin, cb) => cb(null, true), credentials: true }));

// static files for uploaded PDFs
app.use("/uploads/ideas", express.static("uploads/ideas"));

// db
await connectDB();

// routes
app.get("/api/v1/health", (req, res) => res.json({ ok: true, ts: Date.now() }));
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/ideas", ideaRoutes);
app.use("/api/v1/news", newsRoutes);
app.use("/api/v1/jury", juryRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/settings", settingsRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log("✅  Server running on port", port));
