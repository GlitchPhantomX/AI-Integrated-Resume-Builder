import express from "express";
import protect from "../middleware/authMiddleware.js";
import { enhanceJobDescription, enhanceProfessionalSummary, uploadResume, chatWithAI, chatWithAIPublic } from "../controllers/aiController.js";

const aiRouter = express.Router();

aiRouter.post("/enhance-pro-sum",protect, enhanceProfessionalSummary)
aiRouter.post("/enhance-job-desc",protect, enhanceJobDescription)
aiRouter.post("/upload-resume",protect, uploadResume)
aiRouter.post("/chat", protect, chatWithAI) // Protected chat endpoint
aiRouter.post("/chat-public", chatWithAIPublic) // Public chat endpoint

export default aiRouter