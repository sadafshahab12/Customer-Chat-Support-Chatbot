import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const chatRouter = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

chatRouter.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });
    const result = await model.generateContent(
      `Reply in max 2 sentences only. Be short and to the point. User: ${message}`
    );
    const reply = result.response.text();
    res.json({ reply });
  } catch (error) {
    console.error("Error in Gemini API:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export { chatRouter };
