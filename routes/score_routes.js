import express from "express";
import { scoreService } from "../services/score_service.js";
import { scoreSchema, validateBody } from "../middleware.js";

export const router = express.Router();

router.post("/", validateBody(scoreSchema), async (req, res) => {
  const newScore = req.body;
  const newId = await scoreService.createScore(newScore);
  return res.status(201).json({
    success: true,
    message: `Score created successfully | new id: ${newId}`,
  });
});
