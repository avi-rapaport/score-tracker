import "dotenv/config";
import express from "express";
import { router as scoreRouter } from "./score_routes.js";
import { getConnection } from "./db.js";

const PORT = process.env.PORT || 3000;

const app = express();

getConnection();
app.use(express.json());

app.use("/score", scoreRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
