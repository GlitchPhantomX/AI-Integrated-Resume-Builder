import ai from "../configs/ai.js";
import Resume from "../models/resume.js";

// ----------------------------
// Enhance Professional Summary
// ----------------------------
export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENROUTER_MODEL,
      messages: [
        {
          role: "system",
          content: `
You are an expert in resume writing.
Your task is to enhance the professional summary of a resume.
The summary should be 1-2 sentences highlighting key skills, experiences, and career objectives.
Make it compelling and ATS-friendly. Only return the text.
`,
        },
        { role: "user", content: userContent },
      ],
    });

    const enhanceContent = response.choices[0].message.content;
    return res.status(200).json({ enhanceContent });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// ----------------------------
// Enhance Job Description
// ----------------------------
export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENROUTER_MODEL,
      messages: [
        {
          role: "system",
          content: `
You are an expert in resume writing.
Your task is to enhance the job description of a resume.
Use 1-2 sentences highlighting key responsibilities and achievements.
Use action verbs and quantifiable results where possible.
Make it ATS-friendly. Only return the text.
`,
        },
        { role: "user", content: userContent },
      ],
    });

    const enhanceContent = response.choices[0].message.content;
    return res.status(200).json({ enhanceContent });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// ----------------------------
// Upload Resume & Extract Data
// ----------------------------
export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!resumeText) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const systemPrompt = "You are an expert AI Agent to extract data from resume.";
    const userPrompt = `
Extract structured data from this resume text:

${resumeText}

Return ONLY a JSON object (no explanation) with fields:
{
  professional_summary: "string",
  skills: ["string"],
  personal_info: {
    full_name: "string",
    profession: "string",
    email: "string",
    phone: "string",
    location: "string",
    linkedin: "string",
    website: "string"
  },
  experience: [
    {
      company: "string",
      position: "string",
      start_date: "YYYY-MM-DD",
      end_date: "YYYY-MM-DD",
      description: "string",
      is_current: true/false
    }
  ],
  projects: [
    { name: "string", type: "string", description: "string" }
  ],
  education: [
    {
      institution: "string",
      degree: "string",
      field: "string",
      graduation_date: "YYYY-MM-DD",
      gpa: "string"
    }
  ]
}
`;

    const response = await ai.chat.completions.create({
      model: process.env.OPENROUTER_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    });

    const extractedData = response.choices[0].message.content;
    const parsedData = JSON.parse(extractedData);

    const newResume = await Resume.create({ userId, title, ...parsedData });
    res.json({ resumeId: newResume._id });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// ----------------------------
// Chat with AI (Protected)
// ----------------------------
export const chatWithAI = async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ message: "Missing or invalid messages array." });
    }

    // Format messages for OpenRouter API
    const formattedMessages = messages.map(msg => ({
      role: msg.role,
      content: msg.parts ? msg.parts[0]?.text || msg.text : msg.text
    }));

    const response = await ai.chat.completions.create({
      model: process.env.OPENROUTER_MODEL,
      messages: formattedMessages,
    });

    const aiResponse = response.choices[0].message.content;
    return res.status(200).json({ response: aiResponse });
  } catch (error) {
    console.error("Error in chatWithAI:", error);
    return res.status(500).json({ message: error.message });
  }
};

// ----------------------------
// Chat with AI (Public)
// ----------------------------
export const chatWithAIPublic = async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ message: "Missing or invalid messages array." });
    }

    // Format messages for OpenRouter API
    const formattedMessages = messages.map(msg => ({
      role: msg.role,
      content: msg.parts ? msg.parts[0]?.text || msg.text : msg.text
    }));

    const response = await ai.chat.completions.create({
      model: process.env.OPENROUTER_MODEL,
      messages: formattedMessages,
    });

    const aiResponse = response?.choices?.[0]?.message?.content;

    if (!aiResponse) {
      // Return fallback response if AI fails
      return res.status(200).json({ response: "Sorry, I couldn't generate a response." });
    }

    return res.status(200).json({ response: aiResponse });
  } catch (error) {
    console.error("Error in chatWithAIPublic:", error);

    // Always return JSON, even on error
    return res.status(500).json({
      response: "Internal server error. Please try again later.",
      error: error.message
    });
  }
};
