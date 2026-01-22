import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.apiKey,
  //   defaultHeaders: {
  //     "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
  //     "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
  //   },
});

const gini = async (text) => {
  // const completion = await openai.chat.completions.create({
  //   model: "deepseek/deepseek-r1-0528:free",
  //   messages: [
  //     {
  //       role: "user",
  //       content: text,
  //     },
  //   ],
  // });
  // return completion.choices[0].message.content;
  return text;
};

export { gini };

// {
//   ("userID",
//     "schoolId",
//     "user_name",
//     "class",
//     "subject",
//     "feature", // ai tool
//     "mode", //text, voice, image
//     "session_id",
//     "conversation_id");
// }

// Phone Number
// Session datetime
// Device Type
// Login/ refresh token
// Login datetime
// Conversation Id
// Conversation datetime
// Event :- Sent/ Response
// Conversation / tex;
