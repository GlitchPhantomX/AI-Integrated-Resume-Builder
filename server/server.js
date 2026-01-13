import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";
import testimonialRoutes from "./routes/testimonialsRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  try {
    await connectDB();
    res.send("Server is live...");
  } catch (err) {
    res.status(500).send("DB Connection Failed");
  }
});

app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);
app.use("/api/testimonials", testimonialRoutes);

export default app;
