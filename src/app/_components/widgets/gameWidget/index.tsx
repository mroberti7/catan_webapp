import { GameDTO, GamePlayerDTO, TurnDTO } from '@/lib/generated';
import GamePlayers from '@/app/_components/widgets/gameWidget/gamePlayers';
import { useEffect, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import GameActions from '@/app/_components/widgets/gameWidget/gameActions';
import { deleteLastTurn, endCurrentGame, errorToast, getGameById, saveTurn, successToast } from '@/app/utils/api';
import GameDice from '@/app/_components/widgets/gameWidget/gameDice';

type GameWidgetProps = {
  initialGame: GameDTO;
};

const GameWidget = ({ initialGame }: GameWidgetProps) => {
  const [game, setGame] = useState<GameDTO>(initialGame);
  const [showPlayers, setShowPlayers] = useState(true);
  const [currentPlayerToPlay, setCurrentPlayerToPlay] = useState(game?.gamePlayers?.[0] ?? 0);
  const [diceNumber, setDiceNumber] = useState<null | number>(null);
  const [refreshDiceStats, setRefreshDiceStats] = useState(false);

  const refreshGame = async () => {
    const gameUpdated = await getGameById(game.gameInfo.id ?? 0);
    if (gameUpdated) {
      setGame(gameUpdated);
      setRefreshDiceStats(true);
      clearCurrentTurnData();
      successToast('Game updated');
    } else {
      errorToast('Error retrieving game');
    }
  };

  const endTurn = async (turn: TurnDTO) => {
    turn.outcome = diceNumber ?? 0;
    const response = await saveTurn(game.gameInfo.id ?? 0, turn);
    if (response) {
      successToast('Turn saved');
      await refreshGame();
    } else {
      errorToast('Error saving turn');
    }
  };

  const deletePreviousTurn = async () => {
    const response = await deleteLastTurn(game.gameInfo.id ?? -1);
    if (response) {
      successToast('Turn deleted');
      await refreshGame();
    } else {
      errorToast('Error deleting turn');
    }
  };

  const clearCurrentTurnData = () => {
    setDiceNumber(null);
  };

  const endGame = async (winnerPlayerId: number, playerData: GamePlayerDTO[]) => {
    const response = await endCurrentGame(game.gameInfo.id ?? -1, playerData);
    if (response) {
      successToast('Game ended');
      await refreshGame();
      setDiceNumber(null);
    } else {
      errorToast('Error ending game');
    }
  };

  useEffect(() => {
    const currentPlayerToPlayIndex = (game?.gameInfo?.turnNumber ?? 0 - 1) % game?.gamePlayers.length;
    setCurrentPlayerToPlay(game?.gamePlayers[currentPlayerToPlayIndex] ?? 0);
  }, [game?.gameInfo?.turnNumber]);

  return (
    <div className="h-full w-full bg-slate-500 bg-opacity-10">
      <GamePlayers
        gameInfo={game.gameInfo}
        players={game.gamePlayers}
        showPlayers={showPlayers}
        setShowPlayers={setShowPlayers}
        currentPlayerToPlay={currentPlayerToPlay}
      />
      <div id="game-actions" className="flex h-auto w-full items-start justify-between">
        {game?.gameInfo?.id && (
          <GameActions
            gameId={game.gameInfo.id}
            player={currentPlayerToPlay}
            allPlayers={game.gamePlayers}
            endTurn={endTurn}
            deletePreviousTurn={deletePreviousTurn}
            endGame={endGame}
            clearCurrentTurnData={clearCurrentTurnData}
            diceNumber={diceNumber}
          />
        )}
      </div>
      <div id="game-dice" className="mb-10">
        <GameDice
          gameId={game.gameInfo.id ?? -1}
          diceNumber={diceNumber}
          setDiceNumber={setDiceNumber}
          players={game.gamePlayers}
          refreshDiceStats={refreshDiceStats}
          setRefreshDiceStats={setRefreshDiceStats}
        />
      </div>
    </div>
  );
};

export default GameWidget;
