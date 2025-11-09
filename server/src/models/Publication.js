import mongoose from "mongoose";

const PublicationSchema = new mongoose.Schema({
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty", required: true, index: true },
  title: { type: String, required: true, trim: true },
  authors: [{ type: String }],
  year: Number,
  venue: String,
  type: { type: String, enum: ["conference", "general", "book", "chapter"], default: "conference" },
  doi: String,
  url: String,
  indexing: [{ type: String }],
  scope: { type: String, enum: ["International", "National", "Other"], default: "International" },
  attachments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attachment" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

PublicationSchema.index({ title: "text", authors: "text", venue: "text" });

PublicationSchema.pre("save", function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model("Publication", PublicationSchema);
