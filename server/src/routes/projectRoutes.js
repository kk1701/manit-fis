
import express from "express";
import Project from "../models/Project.js";
import Faculty from "../models/Faculty.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create a project (authorization required)
router.post("/", requireAuth, async (req, res, next) => {
	try {
		const faculty = await Faculty.findOne({ user: req.user.id });
		if (!faculty) return res.status(404).json({ message: "Faculty profile not found" });

		const data = { ...req.body, faculty: faculty._id };
		const project = await Project.create(data);
		return res.status(201).json(project);
	} catch (err) {
		next(err);
	}
});

// List projects. Optional query params: facultyId, status, q (text search)
router.get("/", async (req, res, next) => {
	try {
		const { facultyId, status, q } = req.query;
		const filter = {};
		if (facultyId) filter.faculty = facultyId;
		if (status) filter.status = status;
		if (q) filter.$text = { $search: q };

		const projects = await Project.find(filter).sort({ startDate: -1, createdAt: -1 });
		return res.json(projects);
	} catch (err) {
		next(err);
	}
});

// Get single project
router.get("/:id", async (req, res, next) => {
	try {
		const project = await Project.findById(req.params.id).populate("attachments");
		if (!project) return res.status(404).json({ message: "Project not found" });
		return res.json(project);
	} catch (err) {
		next(err);
	}
});

// Update project (owner only)
router.put("/:id", requireAuth, async (req, res, next) => {
	try {
		const faculty = await Faculty.findOne({ user: req.user.id });
		if (!faculty) return res.status(404).json({ message: "Faculty profile not found" });

		const project = await Project.findById(req.params.id);
		if (!project) return res.status(404).json({ message: "Project not found" });
		if (project.faculty.toString() !== faculty._id.toString()) return res.status(403).json({ message: "Forbidden" });

		const allowed = ["title","description","startDate","endDate","status","futurePlans","collaborators"];
		const update = {};
		allowed.forEach((k) => {
			if (k in req.body) update[k] = req.body[k];
		});
		update.updatedAt = new Date();

		const updated = await Project.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
		return res.json(updated);
	} catch (err) {
		next(err);
	}
});

// Delete project (owner only)
router.delete("/:id", requireAuth, async (req, res, next) => {
	try {
		const faculty = await Faculty.findOne({ user: req.user.id });
		if (!faculty) return res.status(404).json({ message: "Faculty profile not found" });

		const project = await Project.findById(req.params.id);
		if (!project) return res.status(404).json({ message: "Project not found" });
		if (project.faculty.toString() !== faculty._id.toString()) return res.status(403).json({ message: "Forbidden" });

		await Project.findByIdAndDelete(req.params.id);
		return res.json({ message: "Deleted" });
	} catch (err) {
		next(err);
	}
});

export default router;
