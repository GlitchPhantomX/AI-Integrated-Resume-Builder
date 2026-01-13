import Testimonial from "../models/testimonialModel.js";

// 📍 GET all testimonials
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ _id: -1 });
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch testimonials", error });
  }
};

// 📍 POST a new testimonial
export const createTestimonial = async (req, res) => {
  try {
    const newTestimonial = new Testimonial(req.body);
    await newTestimonial.save();

    res.status(201).json({
      success: true,
      message: "Testimonial added successfully!",
      data: newTestimonial,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error saving testimonial", error });
  }
};
