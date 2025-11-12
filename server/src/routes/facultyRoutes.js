import express from "express";
import Faculty from "../models/Faculty.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/me", requireAuth, async (req, res, next) => {
  try {
    const faculty = await Faculty.findOne({ user: req.user.id }).populate("userInfo");
    if (!faculty) {
      return res.status(404).json({ message: "Faculty profile not found" });
    }
    return res.json(faculty);
  } catch (err) {
    next(err);
  }
});

router.put("/me", requireAuth, async (req, res, next) => {
  try {
    const allowedFields = [
      "department",
      "designation",
      "email",
      "phone",
      "photoUrl",
      "about",
      "currentSubjects",
      "prevTaughtSubjects",
      "researchAreas",
      "googleScholar",
      "orcid",
      "personalWebsite",
    ];

    const updateData = {};
    allowedFields.forEach((field) => {
      if (field in req.body) {
        updateData[field] = req.body[field];
      }
    });

    const faculty = await Faculty.findOneAndUpdate(
      { user: req.user.id },
      updateData,
      { new: true, runValidators: true }
    ).populate("userInfo");

    if (!faculty) {
      return res.status(404).json({ message: "Faculty profile not found" });
    }

    return res.json(faculty);
  } catch (err) {
    next(err);
  }
});

// Public: get faculty profile by id
router.get("/:id", async (req, res, next) => {
  try {
    const faculty = await Faculty.findById(req.params.id).populate("userInfo");
    if (!faculty) return res.status(404).json({ message: "Faculty not found" });
    return res.json(faculty);
  } catch (err) {
    next(err);
  }
});

export default router;
