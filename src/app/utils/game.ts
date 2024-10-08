import { PlayerColor, Scenario } from '@/enum';
import { GameSetupDTO, PlayerDTO } from '@/lib/generated';
import { ROUTES } from '@/routes';

export const getSingleGameURL = (gameId?: number) => {
  if (!gameId) return ROUTES.HOME.pathname;
  return `${ROUTES.GAME.pathname}?id=${gameId}`;
};

export const createGameData = ({
  gameName,
  playersIds,
  playersColors,
  victoryPoints,
  scenario,
}: {
  gameName: string;
  playersIds: number[];
  playersColors: { playerId: number; color: PlayerColor }[];
  victoryPoints: number;
  scenario: Scenario;
}): GameSetupDTO => {
  return {
    gameInfo: {
      gameName: gameName,
      gameType: scenario,
      requiredVictoryPoints: victoryPoints,
    },
    playersInfo: playersIds.map((playerId, index) => {
      return {
        playerId: playerId,
        startOrder: index + 1,
        playerColor: playersColors.find(color => color.playerId === playerId)?.color ?? PlayerColor.Petrol,
      };
    }),
  };
};
