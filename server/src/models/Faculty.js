import mongoose from "mongoose";

const FacultySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  empId: { type: String, required: true },
  name: { type: String, required: true, trim: true },
  displayName: String,
  department: String,
  designation: String,
  email: String,
  phone: String,
  photoUrl: String,
  about: String,

  currentSubjects: [{ type: String }],
  prevTaughtSubjects: [{ type: String }],
  researchAreas: [{ type: String }],

  googleScholar: String,
  orcid: String,
  personalWebsite: String,

  publicationCount: { type: Number, default: 0 },
  projectCount: { type: Number, default: 0 },

  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

FacultySchema.index({ name: "text", researchAreas: "text", department: "text" });

FacultySchema.virtual("userInfo", {
  ref: "User",
  localField: "user",
  foreignField: "_id",
  justOne: true
});

FacultySchema.pre("save", function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model("Faculty", FacultySchema);
