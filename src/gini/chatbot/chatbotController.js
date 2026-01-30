import { streamChatbotResponse } from "./chatbotService.js";

export const chatbotController = async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array required" });
    }
    console.log("messages", messages);
    // 🔴 REQUIRED FOR STREAMING
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    await streamChatbotResponse(messages, res);
  } catch (error) {
    console.error("Streaming Controller Error:", error);
    res.write(`data: ${JSON.stringify({ error: "Streaming failed" })}\n\n`);
    res.write("data: [DONE]\n\n");
    res.end();
  }
};
