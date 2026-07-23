import "dotenv/config";
import express from "express";
import { router as scoreRouter } from "./score_routes.js";
import { router as leaderboardRouter } from "./leaderboard_routes.js";
import { router as playerRouter } from "./player_routes.js";
import { getConnection } from "./db.js";
import { errorHandling } from "./middleware.js";

const PORT = process.env.PORT || 3000;

const app = express();

await getConnection();

app.use(express.json());

app.use("/score", scoreRouter);
app.use("/leaderboard", leaderboardRouter);
app.use("/player", playerRouter);

app.use((req, res) => {
  res.status(404).json(`Route with ${req.method} method not found!`);
});

//app.use(errorHandling);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
