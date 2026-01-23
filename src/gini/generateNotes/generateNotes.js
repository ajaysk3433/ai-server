import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.apiKey,
});

const generateNotes = async (subject, chapter) => {
  try {
    const prompt = `
      You are an expert educator. Generate **high-quality, exam-oriented notes**
      for students. Structure them clearly with:
      - Key concepts
      - Important formulas (if any)
      - Examples
      - Quick revision tips

      Subject: ${subject}
      Chapter: ${chapter}

      Provide the notes in an easy-to-understand, concise format suitable for study and revision.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful AI study assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 1000,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error generating notes:", error);
    return "Failed to generate notes. Please try again.";
  }
};

export { generateNotes };
