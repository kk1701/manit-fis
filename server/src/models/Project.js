import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty", required: true, index: true },
  title: { type: String, required: true, trim: true },
  description: String,
  startDate: Date,
  endDate: Date,
  status: { type: String, enum: ["Planned", "Ongoing", "Completed"], default: "ongoing" },
  futurePlans: String,
  collaborators: [{ name: String, role: String, affiliation: String }],
  attachments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attachment" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

ProjectSchema.index({ title: "text", description: "text" });

ProjectSchema.pre("save", function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model("Project", ProjectSchema);
