import { getDb } from "./db.js";

function getScores() {
  return getDb().collection("scores");
}

async function createScore(data) {
  const newScore = { ...data, createdAt: new Date() };
  const result = await getScores().insertOne(newScore);
  return result.insertedId;
}

export const scoreRepo = { createScore };
