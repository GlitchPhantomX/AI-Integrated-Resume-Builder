import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";
import testimonialRoutes from "./routes/testimonialsRoutes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: '*', // Ya apna frontend URL dalo
  credentials: true
}));

// Database connection
let isConnected = false;
const connectToDatabase = async () => {
  if (isConnected) return;
  try {
    await connectDB();
    isConnected = true;
    console.log("DB Connected");
  } catch (error) {
    console.error("DB Connection Error:", error);
  }
};

// Routes
app.get("/", async (req, res) => {
  await connectToDatabase();
  res.json({ message: "Server is live..." });
});

app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);
app.use("/api/testimonials", testimonialRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Export for Vercel
export default app;