import { scoreRepo } from "./score_repo.js";

async function createScore(newScore) {
  const scoreToCreate = { ...newScore, createdAt: new Date() };
  const newId = await scoreRepo.create(scoreToCreate);
  return newId;
}

function addRank(score) {
  return score.map((item, index) => ({
    rank: index + 1,
    ...item,
  }));
}

async function getTopLeaderboard(game) {
  const filter = game ? { game } : {};
  const sort = { points: -1 };
  const limit = 10;
  const fields = game
    ? { _id: 0, playerName: 1, points: 1, level: 1 }
    : { _id: 0, playerName: 1, game: 1, points: 1, createdAt: 1 };

  const result = await scoreRepo.getDataWithOptions({
    filter,
    sort,
    limit,
    fields,
  });

  return addRank(result);
}

export const scoreService = {
  createScore,
  getTopLeaderboard,
};
