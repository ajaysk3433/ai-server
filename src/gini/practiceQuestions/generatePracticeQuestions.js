import dotenv from "dotenv";
dotenv.config();
import { parseMCQs } from "../../util/parceMCQ.js";
import { parseQnA } from "../../util/parceQnA.js";
import { getPYQ } from "../../modal/questions.modal.js";

import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.apiKey,
});

const generatePracticeQuestions = async (
  class_,
  language,
  subject,
  chapter,
  questionType,
  questionsCount,
) => {
  console.log(questionType);
  if (questionType === "PYQ") {
    return await PYQ(class_, language, subject, chapter);
  }

  if (questionType === "PQ") {
    return await PQ(class_, language, subject, chapter);
  }
  return await dynamicQnA(
    class_,
    language,
    subject,
    chapter,
    questionType,
    questionsCount,
  );
};

const dynamicQnA = async (
  class_,
  language,
  subject,
  chapter,
  questionType,
  questionsCount,
) => {
  console.log(questionsCount);
  try {
    const prompt = `
      You are an expert educator. Generate **${questionType} questions**
      for students studying in ${class_}, subject ${subject}, chapter "${chapter}",
      response in ${language}
      
      Instructions:
      - If ${questionType} is MCQs, provide ${questionsCount} multiple choice questions with 4 options each and indicate the correct answer.
      - If ${questionType} is Short Answer, provide ${questionsCount} questions that can be answered in 2-3 lines.
      - If ${questionType} is Long Answer, provide ${questionsCount} questions that require detailed answers.
     

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

const PYQ = async (class_, language, subject, chapter, questionType) => {
  const questions = await getPYQ([class_, language, subject, chapter]);
  return questions;
};

const PQ = async (class_, language, subject, chapter, questionType) => {
  const questions = await getPYQ([class_, language, subject, chapter]);
  return questions;
};
export { generatePracticeQuestions };
