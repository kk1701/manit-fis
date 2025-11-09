import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

const ACCESS_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES || "15m"; // e.g., '15m'
const REFRESH_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES || "7d"; // '7d'

export function createAccessToken(payload) {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES });
}

export function createRefreshToken(payload) {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_SECRET);
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_SECRET);
}

export function refreshExpirySeconds() {
  const mapping = {
    s: 1,
    m: 60,
    h: 3600,
    d: 86400,
  };
  
  const val = process.env.REFRESH_TOKEN_EXPIRES || "7d";
  const num = parseInt(val, 10);
  const unit = val.replace(String(num), "").trim() || "s";
  return num * (mapping[unit] || 86400);
}
