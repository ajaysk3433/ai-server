import { generateNotes } from "./generateNotes.js";
export const generateNotesController = async (req, res) => {
  try {
    const { subject, chapter } = req.body;

    if (!subject || !chapter) {
      return res.status(400).json({
        error: "Both 'subject' and 'chapter' are required in the request body.",
      });
    }

    const notes = await generateNotes(subject, chapter);

    res.status(200).json({
      subject,
      chapter,
      notes,
      message: "AI-generated notes successfully created.",
    });
  } catch (error) {
    console.error("Error in /gini endpoint:", error);
    res.status(500).json({
      error: "Failed to generate AI notes. Please try again later.",
    });
  }
};
