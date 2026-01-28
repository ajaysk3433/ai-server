import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.apiKey,
});

/**
 * Generate AI response for chatbot (text / voice / image)
 * @param {string} message - User text or transcribed voice
 * @param {string|null} imageUrl - Uploaded image URL (optional)
 */
export const generateChatbotResponse = async (message, imageUrl = null) => {
  try {
    const systemPrompt = `
You are an AI tutor for students.
Rules:
- Give clear, step-by-step explanations
- Be concise and student-friendly
- Do NOT include internal reasoning
- Focus only on the question asked
`;

    let messages = [{ role: "system", content: systemPrompt }];

    // Image-based input
    if (imageUrl) {
      messages.push({
        role: "user",
        content: [
          {
            type: "text",
            text: message || "Explain the question in this image",
          },
          { type: "image_url", image_url: { url: imageUrl } },
        ],
      });
    } else {
      // Text / voice input
      messages.push({
        role: "user",
        content: message,
      });
    }

    const completion = await openai.chat.completions.create({
      model: "tngtech/deepseek-r1t-chimera:free",
      messages,
      max_tokens: 1200,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Chatbot Service Error:", error);
    return "Sorry, I couldn't process your request right now.";
  }
};
