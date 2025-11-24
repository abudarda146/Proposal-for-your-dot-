import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize Gemini Client
// We strictly follow the rule: use named parameter for apiKey
const ai = new GoogleGenAI({ apiKey: apiKey });

export const generateLovePoem = async (partnerName: string = 'My Love'): Promise<string> => {
  if (!apiKey) {
    return "API Key missing. Cannot generate poem.";
  }

  try {
    const modelId = 'gemini-2.5-flash'; 
    const prompt = `Write a very short, cute, and rhyming romantic poem (4 lines) in Bengali for someone named "${partnerName}". It should be sweet and celebratory about them saying "Yes" to a proposal.`;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        maxOutputTokens: 100,
        temperature: 0.8,
      }
    });

    return response.text || "আমি তোমাকে অনেক ভালোবাসি! (AI could not generate poem)";
  } catch (error) {
    console.error("Error generating poem:", error);
    return "তোমার জন্য আমার ভালোবাসা অসীম! (Network Error)";
  }
};