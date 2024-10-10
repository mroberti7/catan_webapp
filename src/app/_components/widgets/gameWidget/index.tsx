import { GameDTO, TurnDTO } from '@/lib/generated';
import GamePlayers from '@/app/_components/widgets/gameWidget/gamePlayers';
import { useEffect, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import GameActions from '@/app/_components/widgets/gameWidget/gameActions';
import { deleteLastTurn, getGameById, saveTurn } from '@/app/utils/api';
import GameDice from '@/app/_components/widgets/gameWidget/gameDice';

type GameWidgetProps = {
  initialGame: GameDTO;
};

const GameWidget = ({ initialGame }: GameWidgetProps) => {
  const [game, setGame] = useState<GameDTO>(initialGame);
  const [showPlayers, setShowPlayers] = useState(true);
  const [currentPlayerIdToPlay, setCurrentPlayerIdToPlay] = useState(game?.gamePlayers?.[0]?.playerId ?? 0);
  const [diceNumber, setDiceNumber] = useState<null | number>(null);
  const [refreshDiceStats, setRefreshDiceStats] = useState(false);

  const refreshGame = async () => {
    const gameUpdated = await getGameById(game.gameInfo.id ?? 0);
    if (gameUpdated) {
      setGame(gameUpdated);
      setRefreshDiceStats(true);
    } else {
      console.error('Error retrieving game');
    }
  };

  const endTurn = async (turn: TurnDTO) => {
    turn.outcome = diceNumber ?? 0;
    const response = await saveTurn(game.gameInfo.id ?? 0, turn);
    if (response) {
      console.log('Turn saved correctly');
      await refreshGame();
      setDiceNumber(null);
      console.log('Changed dice number to null');
    } else {
      console.error('Error saving turn');
    }
  };

  const deletePreviousTurn = async () => {
    const response = await deleteLastTurn(game.gameInfo.id ?? -1);
    if (response) {
      console.log('Turn deleted correctly');
      await refreshGame();
      setDiceNumber(null);
    } else {
      console.error('Error deleting turn');
    }
  };

  const clearCurrentTurnData = () => {
    setDiceNumber(null);
  };

  const endGame = async () => {
    alert('end game');
  };

  useEffect(() => {
    const currentPlayerToPlayIndex = (game?.gameInfo?.turnNumber ?? 0 - 1) % game?.gamePlayers.length;
    setCurrentPlayerIdToPlay(game?.gamePlayers[currentPlayerToPlayIndex]?.playerId ?? 0);
  }, [game?.gameInfo?.turnNumber]);

  return (
    <div className="h-full w-full bg-slate-500 bg-opacity-10">
      <GamePlayers
        gameInfo={game.gameInfo}
        players={game.gamePlayers}
        showPlayers={showPlayers}
        setShowPlayers={setShowPlayers}
        currentPlayerIdToPlay={currentPlayerIdToPlay}
      />
      <div id="game-actions" className="flex h-auto w-full items-start justify-between">
        {game?.gameInfo?.id && (
          <GameActions
            gameId={game.gameInfo.id}
            playerId={currentPlayerIdToPlay}
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
