import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  handle: { type: String, required: true },
  feedback: { type: String, required: true },
  image: { type: String },
  date: { type: String, default: () => new Date().toLocaleDateString() },
});

export default mongoose.model("Testimonial", testimonialSchema);
