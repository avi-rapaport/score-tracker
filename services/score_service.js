import { scoreRepo } from "../score_repo.js";

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

async function getPlayerData(playerName) {
  const filter = { playerName };
  const sort = { createdAt: -1 };
  const allScores = await scoreRepo.getDataWithOptions({ filter, sort });

  const bestResult = allScores.reduce((acc, current) => {
    const currentGame = current.game;
    const currentPoints = current.points;

    if (!acc[currentGame] || currentPoints > acc[currentGame]) {
      acc[currentGame] = currentPoints;
    }
    return acc;
  }, {});

  const bestPerGame = Object.entries(bestResult).map(([game, best]) => ({
    game,
    best,
  }));

  return { allScores, bestPerGame };
}

export const scoreService = {
  createScore,
  getTopLeaderboard,
  getPlayerData,
};
