import mongoose from "mongoose";

const CounterSchema = new mongoose.Schema({
  _id: String,
  seq: { type: Number, default: 0 }
});

CounterSchema.statics.next = async function(name, step = 1) {
  const result = await this.findByIdAndUpdate(
    name,
    { $inc: { seq: step } },
    { new: true, upsert: true }
  );
  return result.seq;
};

export default mongoose.model("Counter", CounterSchema);
