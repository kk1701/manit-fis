import mongoose from "mongoose";

const AttachmentSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  url: { type: String, required: true },
  size: Number,
  mimeType: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  uploadedAt: { type: Date, default: Date.now },
  purpose: { type: String, enum: ["profile_photo", "publication_pdf", "project_doc", "other"], default: "other" }
});

export default mongoose.model("Attachment", AttachmentSchema);
