'use client';

import { GameDTO, TurnDTO } from '@/lib/generated';
import GamePlayers from '@/app/_components/widgets/gameWidget/gamePlayers';
import { useEffect, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import GameActions from '@/app/_components/widgets/gameWidget/gameActions';
import { getGameById, saveTurn } from '@/app/utils/api/api';

type GameWidgetProps = {
  initialGame: GameDTO;
};

const GameWidget = ({ initialGame }: GameWidgetProps) => {
  const [game, setGame] = useState<GameDTO>(initialGame);
  const [showPlayers, setShowPlayers] = useState(true);
  const [currentPlayerIdToPlay, setCurrentPlayerIdToPlay] = useState(game?.gamePlayers?.[0]?.playerId ?? 0);

  const passTurn = async (turn: TurnDTO) => {
    const response = await saveTurn(game.gameInfo.id ?? 0, turn);
    if (response) {
      console.log('Turn saved correctly');
    } else {
      console.error('Error saving turn');
    }
    const gameUpdated = await getGameById(game.gameInfo.id ?? 0);
    if (gameUpdated) {
      setGame(gameUpdated);
    } else {
      console.error('Error retrieving game');
    }
  };

  useEffect(() => {
    const currentPlayerToPlayIndex = (game?.gameInfo?.turnNumber ?? 0 - 1) % game?.gamePlayers.length;
    setCurrentPlayerIdToPlay(game?.gamePlayers[currentPlayerToPlayIndex]?.playerId ?? 0);
  }, [game?.gameInfo?.turnNumber]);

  return (
    <div className="mt-16 h-full w-full bg-slate-500 bg-opacity-10">
      <GamePlayers
        gameInfo={game.gameInfo}
        players={game.gamePlayers}
        showPlayers={showPlayers}
        setShowPlayers={setShowPlayers}
        currentPlayerIdToPlay={currentPlayerIdToPlay}
      />
      <div id="game-actions" className="flex h-auto w-full items-start justify-between">
        {game?.gameInfo?.id && <GameActions gameId={game.gameInfo.id} playerId={currentPlayerIdToPlay} passTurn={passTurn} />}
      </div>
    </div>
  );
};

export default GameWidget;
