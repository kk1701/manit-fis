import express from "express";
import Publication from "../models/Publication.js";
import Faculty from "../models/Faculty.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", requireAuth, async (req, res, next) => {
	try {
		const faculty = await Faculty.findOne({ user: req.user.id });
		if (!faculty) return res.status(404).json({ message: "Faculty profile not found" });

		const data = { ...req.body, faculty: faculty._id };
		const pub = await Publication.create(data);

		// increment faculty publication count
		await Faculty.findByIdAndUpdate(faculty._id, { $inc: { publicationCount: 1 } });

		return res.status(201).json(pub);
	} catch (err) {
		next(err);
	}
});

// List publications. Optional query params: facultyId, type, year, q (text search)
router.get("/", async (req, res, next) => {
	try {
		const { facultyId, type, year, q } = req.query;
		const filter = {};
		if (facultyId) filter.faculty = facultyId;
		if (type) filter.type = type;
		if (year) filter.year = Number(year);
		if (q) filter.$text = { $search: q };

		const pubs = await Publication.find(filter).sort({ year: -1, createdAt: -1 });
		return res.json(pubs);
	} catch (err) {
		next(err);
	}
});

// Get single publication
router.get("/:id", async (req, res, next) => {
	try {
		const pub = await Publication.findById(req.params.id).populate("attachments");
		if (!pub) return res.status(404).json({ message: "Publication not found" });
		return res.json(pub);
	} catch (err) {
		next(err);
	}
});

// Update publication (owner only)
router.put("/:id", requireAuth, async (req, res, next) => {
	try {
		const faculty = await Faculty.findOne({ user: req.user.id });
		if (!faculty) return res.status(404).json({ message: "Faculty profile not found" });

		const pub = await Publication.findById(req.params.id);
		if (!pub) return res.status(404).json({ message: "Publication not found" });
		if (pub.faculty.toString() !== faculty._id.toString()) return res.status(403).json({ message: "Forbidden" });

		const allowed = ["title","authors","year","venue","type","doi","indexing","scope","url"];
		const update = {};
		allowed.forEach((k) => {
			if (k in req.body) update[k] = req.body[k];
		});
		update.updatedAt = new Date();

		const updated = await Publication.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
		return res.json(updated);
	} catch (err) {
		next(err);
	}
});

// Delete publication (owner only)
router.delete("/:id", requireAuth, async (req, res, next) => {
	try {
		const faculty = await Faculty.findOne({ user: req.user.id });
		if (!faculty) return res.status(404).json({ message: "Faculty profile not found" });

		const pub = await Publication.findById(req.params.id);
		if (!pub) return res.status(404).json({ message: "Publication not found" });
		if (pub.faculty.toString() !== faculty._id.toString()) return res.status(403).json({ message: "Forbidden" });

		await Publication.findByIdAndDelete(req.params.id);
		await Faculty.findByIdAndUpdate(faculty._id, { $inc: { publicationCount: -1 } });
		return res.json({ message: "Deleted" });
	} catch (err) {
		next(err);
	}
});

export default router;

