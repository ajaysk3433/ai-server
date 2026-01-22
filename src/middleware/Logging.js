import { v4 as uuidv4 } from "uuid";
import pool from "../db/db.js";
export const logging = (req, res, next) => {
  const originalJson = res.json;
  let responseBody;

  const insertQuery = `
    INSERT INTO logs 
    (conversation_id, method, url,  status_code,  device, error, created_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  res.json = function (body) {
    responseBody = body;
    return originalJson.call(this, body);
  };

  res.on("finish", () => {
    const now = new Date();
    const logUuid = uuidv4();

    const value = [
      logUuid,
      req.method,
      req.originalUrl,

      res.statusCode,

      req.headers["user-agent"],
      responseBody?.error || null,
      now,
    ];

    pool.query(insertQuery, value, (error, results) => {
      if (error) {
        console.error(error.message);
      } else {
        console.log(results.insertId);
      }
    });
  });

  next();
};
