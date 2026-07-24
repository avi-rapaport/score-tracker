import express from "express";
import { statsService } from "../services/stats_service.js";

export const router = express.Router();

router.get("/", async (req, res) => {
  const stats = await statsService.getStats();
  res.json({ success: true, data: stats });
});

router.get("/games", async (req, res) => {
  const games = await statsService.getGamesWithScore();
  res.json({ success: true, data: games });
});
