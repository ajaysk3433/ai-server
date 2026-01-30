import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.apiKey,
});

export const streamChatbotResponse = async (messages, res) => {
  try {
    const systemPrompt = `
You are an AI tutor for students.
Rules:
- Give clear, step-by-step explanations
- Be concise and student-friendly
- Do NOT include internal reasoning
- Focus only on the question asked
`;

    const finalMessages = [
      { role: "system", content: systemPrompt },
      ...messages,
    ];

    const stream = await openai.chat.completions.create({
      model: "tngtech/deepseek-r1t-chimera:free",
      messages: finalMessages,
      stream: true,
      max_tokens: 1200,
    });

    for await (const chunk of stream) {
      const content = chunk.choices?.[0]?.delta?.content;

      if (content) {
        res.write(
          `data: ${JSON.stringify({
            choices: [{ delta: { content } }],
          })}\n\n`,
        );
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error) {
    console.error("Streaming Service Error:", error);
    res.write("data: [DONE]\n\n");
    res.end();
  }
};
