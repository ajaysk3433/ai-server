import { generatePracticeQuestions } from "./generatePracticeQuestions.js";

export const generatePracticeQuestionsController = async (req, res) => {
  try {
    const { subject, chapter, questionType, class_, language, questionsCount } =
      req.body;

    if (!subject || !chapter || !questionType) {
      return res.status(400).json({
        error:
          "Please provide 'subject', 'chapter', and 'questionType' in the request body.",
      });
    }

    const questions = await generatePracticeQuestions(
      class_,
      language,
      subject,
      chapter,
      questionType,
      questionsCount,
    );

    res.status(200).json({
      subject,
      chapter,
      questionType,
      questions,
      message: "AI-generated practice questions successfully created.",
    });
  } catch (error) {
    console.error("Error in /generate-practice-questions endpoint:", error);
    res.status(500).json({
      error: "Failed to generate practice questions. Please try again later.",
    });
  }
};
