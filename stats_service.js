import { scoreRepo } from "./score_repo.js";

async function getStats() {
  const highestScore = await scoreRepo.getDataWithOptions({
    sort: { points: -1 },
    limit: 1,
    fields: { _id: 0, playerName: 1, points: 1, game: 1 },
  });

  const scoreCount = await scoreRepo.getCount();

  const allScore = await scoreRepo.getDataWithOptions();
  if (!allScore || allScore.length === 0) {
    return {
      highestScore: null,
      scoreCount: 0,
      mostPopularGame: null,
      averagePoints: 0,
    };
  }

  const gameCounts = allScore.reduce((acc, current) => {
    const game = current.game;
    acc[game] ? (acc[game] += 1) : (acc[game] = 1);
    return acc;
  }, {});

  const mostPopularGame = Object.entries(gameCounts).reduce(
    (acc, [game, points]) => {
      if (points > acc.bestPoints) {
        return { game, bestPoints: points };
      }
      return acc;
    },
    { game: "", bestPoints: 0 },
  ).game;

  const averagePoints =
    allScore.reduce((acc, current) => acc + current.points, 0) /
    allScore.length;

  return {
    highestScore: highestScore[0],
    scoreCount,
    mostPopularGame,
    averagePoints: Number(averagePoints.toFixed(2)),
  };
}

export const statsService = { getStats };
