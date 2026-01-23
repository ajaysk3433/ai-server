import express from "express";
import { generateNotesController } from "./generateNotes/generateNotes.controller.js";

const router = express.Router();

router.post("/", generateNotesController);

export default router;
