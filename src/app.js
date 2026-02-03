import express from "express";
import giniRouter from "./gini/giniRouter.js";
import performanceRouter from "./studentPerformance/studentPerformanceRouter.js";
import { logging } from "./middleware/Logging.js";
import previousPapersRouter from "./previousPapers/previousPapersRouter.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/gini", giniRouter);
app.use("/student", performanceRouter);
app.use("/previousPapers", previousPapersRouter);

app.get("/", (req, res) => {
  res.send("AI Notes Generator API is running ✅");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
