import { getPaperByYear, getAvailableYears } from "./previousPapers.service.js";

export const fetchPaperByYear = (req, res) => {
  const { year } = req.params;

  const filePath = getPaperByYear(year);

  if (filePath) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ message: "Question paper not found for this year" });
  }
};

export const listAvailableYears = (req, res) => {
  const years = getAvailableYears();
  res.json({ availableYears: years });
};
