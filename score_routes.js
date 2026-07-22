import express from "express";
import { scoreRepo } from "./repo.js";

export const router = express.Router();

router.post("/", async (req, res) => {
  const newScore = req.body;
  const newId = await scoreRepo.createScore(newScore);
  return res
    .status(201)
    .json({
      success: true,
      message: `Score created successfully | new id: ${newId}`,
    });
});
