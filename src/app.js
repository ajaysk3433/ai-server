import express from "express";
import giniRouter from "./gini/giniRouter.js"; // router for AI notes
import { logging } from "./middleware/Logging.js";

const app = express();
app.use(express.json());

app.use("/gini", giniRouter);

app.get("/", (req, res) => {
  res.send("AI Notes Generator API is running ✅");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
