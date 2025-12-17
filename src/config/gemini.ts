import { GoogleGenAI } from "@google/genai";
import { config } from "dotenv";

config();

 const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY! });

export const geminiModel = ai