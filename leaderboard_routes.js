import express from "express";
import { scoreService } from "./score_service.js";
import { scoreSchema } from "./middleware.js";

export const router = express.Router();

router.get("/", async (req, res) => {
  const result = await scoreService.getTopLeaderboard();
  res.json({ sucess: true, data: result });
});

router.get("/:game", async (req, res) => {
  const game = req.params.game;
  const result = await scoreService.getTopLeaderboard(game);
  res.json({ sucess: true, data: result });
});
