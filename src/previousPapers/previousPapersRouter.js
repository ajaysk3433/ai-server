import express from "express";
import {
  fetchPaperByYear,
  listAvailableYears,
} from "./previousPapers.controller.js";

const router = express.Router();

// Get paper by year
router.get("/:year", fetchPaperByYear);

// Optional: list all available years
router.get("/", listAvailableYears);

export default router;
