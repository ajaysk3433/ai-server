import { generateChatbotResponse } from "./chatbotService.js";

export const chatbotController = async (req, res) => {
  try {
    const { message, imageUrl } = req.body;

    if (!message && !imageUrl) {
      return res.status(400).json({
        error: "Either message text or imageUrl is required.",
      });
    }

    const response = await generateChatbotResponse(message, imageUrl);

    res.status(200).json({
      success: true,
      response,
    });
  } catch (error) {
    console.error("Chatbot Controller Error:", error);
    res.status(500).json({
      error: "Failed to generate chatbot response.",
    });
  }
};
