import { PlayerColor } from '@/enum';
import { GameSetupDTO, PlayerDTO } from '@/lib/generated';
import { ROUTES } from '@/routes';

export const getSingleGameURL = (gameId?: number) => {
  if (!gameId) return ROUTES.HOME.pathname;
  return `${ROUTES.GAME.pathname}?id=${gameId}`;
};

export const createGameData = ({
  players,
  victoryPoints,
  playersColors,
}: {
  players: PlayerDTO[];
  victoryPoints: number;
  playersColors: { playerId: number; color: PlayerColor }[];
}): GameSetupDTO => {
  return {
    gameInfo: {
      gameName: 'My test Game',
      gameType: 'SEAFARERS',
      numberOfPlayers: players.length,
      requiredVictoryPoints: victoryPoints,
    },
    playersInfo: players.map((player, index) => {
      return {
        gameId: -1,
        playerId: player.id,
        startOrder: index,
        playerColor: playersColors.find(color => color.playerId === player.id)?.color ?? PlayerColor.Petrol,
      };
    }),
  };
};
