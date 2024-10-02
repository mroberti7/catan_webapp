import { PlayerDTO, PlayerScoreDTO } from '@/lib/generated';
import { ROUTES } from '@/routes';

export const getSingleGameURL = (gameId?: number) => {
  if (!gameId) return ROUTES.HOME.pathname;
  return `${ROUTES.GAME.pathname}?id=${gameId}`;
};

export const createGameData = ({ players, victoryPoints }: { players: PlayerDTO[]; victoryPoints: number }): PlayerScoreDTO[] => {
  const result: PlayerScoreDTO[] = [];

  players.map((player, index) => {
    result.push({
      playerId: player.id ?? 0,
      startOrder: index,
      longestRoad: false,
      largestArmy: false,
      score: 0,
      victoryPoints: victoryPoints,
    });
  });
  return result;
};
