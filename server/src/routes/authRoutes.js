import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Faculty from "../models/Faculty.js";
import { createAccessToken } from "../utils/jwt.js";

const router = express.Router();

// Register (creates User + Faculty skeleton)
router.post("/register", async (req, res, next) => {
  try {
    const { email, password, empId, name } = req.body;
    if (!email || !password || !empId || !name) return res.status(400).json({ message: "Missing fields" });

    const existing = await User.findOne({ $or: [{ email }, { empId }] });
    if (existing) return res.status(409).json({ message: "Email or EmpID already registered" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash, empId });
    const faculty = await Faculty.create({ user: user._id, empId, name });
    return res.status(201).json({ userId: user._id, facultyId: faculty._id });
  } catch (err) {
    next(err);
  }
});

// Login (returns access + refresh tokens)
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Missing credentials" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    // Create access token
    const payload = { id: user._id.toString(), role: user.role, empId: user.empId };
    const accessToken = createAccessToken(payload);

    // Respond with access token
    res.json({ accessToken, role: user.role });
  } catch (err) {
    next(err);
  }
});

export default router;
