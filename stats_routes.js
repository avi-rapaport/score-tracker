import express from "express";
import { statsService } from "./stats_service.js";
import { date, success } from "zod";

export const router = express.Router();

router.get("/", async (req, res) => {
  const stats = await statsService.getStats();
  res.json({ success: true, data: stats });
});
