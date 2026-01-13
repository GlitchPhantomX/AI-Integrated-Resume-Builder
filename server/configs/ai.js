import OpenAI from "openai";

const ai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,  // ✅ OpenRouter API key
  baseURL: process.env.OPENROUTER_BASE_URL, // ✅ OpenRouter base URL
});

export default ai;
