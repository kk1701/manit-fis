import express from "express";
import Faculty from "../models/Faculty.js";

const router = express.Router();

router.get("/faculty", async (req, res, next) => {
  try {
    const { q } = req.query;
    const filter = {};
    if (q) filter.$text = { $search: q };

    // Return basic public fields only
    const docs = await Faculty.find(filter).select("name department designation photoUrl personalWebsite").sort({ name: 1 });
    return res.json(docs);
  } catch (err) {
    next(err);
  }
});

export default router;
