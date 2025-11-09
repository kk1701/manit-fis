import jwt from "jsonwebtoken";
import User from "../models/User.js";

export function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    if (!header.startsWith("Bearer ")) return res.status(401).json({ message: "Unauthorized" });
    const token = header.slice(7);
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = { id: payload.id, role: payload.role, empId: payload.empId };
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

// Role guard
export const requireRole = (...allowed) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    if (!allowed.includes(req.user.role)) return res.status(403).json({ message: "Forbidden" });
    return next();
  };
};

// Optional helper: fetch full user doc in request
export async function attachUser(req, res, next) {
  try {
    if (!req.user?.id) return next();
    const user = await User.findById(req.user.id).select("-passwordHash -refreshTokens");
    req.currentUser = user;
    return next();
  } catch (err) {
    return next(err);
  }
}
