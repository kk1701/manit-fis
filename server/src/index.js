import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import facultyRoutes from "./routes/facultyRoutes.js";
import publicationRoutes from "./routes/publicationRoutes.js";
import { connectDB } from "./config/dbConfig.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

app.use(
  cors({
    origin: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/publications", publicationRoutes);

// generic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

app.listen(process.env.PORT || 3000, () => console.log(`Listening on ${process.env.PORT}`));
