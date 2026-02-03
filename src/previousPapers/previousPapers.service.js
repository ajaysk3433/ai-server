import fs from "fs";
import path from "path";

const papersDir = path.join(process.cwd(), "papers");

export const getPaperByYear = (year) => {
  const filePath = path.join(papersDir, `${year}.pdf`);

  if (fs.existsSync(filePath)) {
    return filePath;
  } else {
    return null;
  }
};

export const getAvailableYears = () => {
  const files = fs.readdirSync(path.join(papersDir, "CBSE", "10th", "math"));
  // Extract year from filename like "2022.pdf"
  return files
    .filter((file) => file.endsWith(".pdf"))
    .map((file) => file.replace(".pdf", ""));
};
