import express from "express";
import { scoreService } from "../services/score_service.js";

export const router = express.Router();

router.get("/:name", async (req, res) => {
  const playerName = req.params.name;
  const result = await scoreService.getPlayerData(playerName);
  res.json({ success: true, data: result });
});
