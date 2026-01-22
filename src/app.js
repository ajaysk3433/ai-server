import { gini } from "./ai/gini.js";
import express from "express";
import { logging } from "./middleware/Logging.js";
const app = express();

app.use(express.json());

app.get("/gini", logging, async (req, res) => {
  try {
    const { question } = req.body;
    const response = await gini(question);
    res.status(200).json({ answer: response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running at ", PORT);
});
