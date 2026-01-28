import express from "express";
import { generateNotesController } from "./generateNotes/generateNotes.controller.js";
import { generatePracticeQuestionsController } from "./practiceQuestions/generatePracticeQuestions.controller.js";
import { logging } from "../middleware/Logging.js";
const router = express.Router();

router.post("/notes/generate", generateNotesController);
router.post(
  "/practice/questions",
  logging,
  generatePracticeQuestionsController,
);
export default router;
