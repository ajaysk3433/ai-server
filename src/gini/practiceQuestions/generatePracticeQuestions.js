import dotenv from "dotenv";
dotenv.config();
import { parseMCQs } from "../../util/parceMCQ.js";
import { parseQnA } from "../../util/parceQnA.js";

import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.apiKey,
});

const generatePracticeQuestions = async (
  subject,
  chapter,
  questionType,
  class_,
  language,
) => {
  try {
    const prompt = `
      You are an expert educator. Generate **${questionType} questions**
      for students studying in ${class_}, subject ${subject}, chapter "${chapter}",
      response in ${language}
      
      Instructions:
      - If ${questionType} is MCQs, provide 5-10 multiple choice questions with 4 options each and indicate the correct answer.
      - If ${questionType} is Short Answer, provide 5 questions that can be answered in 2-3 lines.
      - If ${questionType} is Long Answer, provide 3 questions that require detailed answers.
      - If ${questionType} is Previous Year, generate questions based on commonly asked exam patterns.
      - If ${questionType} is AI-Predicted Next Year, generate 3-5 potential exam questions likely to appear next year.

      Provide the questions clearly, numbered, and in an easy-to-read format.
    `;

    const completion = await openai.chat.completions.create({
      model: "tngtech/deepseek-r1t-chimera:free",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1500,
    });

    if (questionType === "MCQ") {
      return parseMCQs(completion.choices[0].message.content);
    }
    return parseQnA(completion.choices[0].message.content);
  } catch (error) {
    console.error("Error generating practice questions:", error);
    return "Failed to generate practice questions. Please try again.";
  }
};

export { generatePracticeQuestions };
