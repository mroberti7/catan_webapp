'use client';

import { GameDTO } from '@/lib/generated';
import GamePlayers from '@/app/_components/widgets/gameWidget/gamePlayers';
import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import GameActions from '@/app/_components/widgets/gameWidget/gameActions';

type GameWidgetProps = {
  game: GameDTO;
};

const GameWidget = ({ game }: GameWidgetProps) => {
  console.log('game', game);
  const [showPlayers, setShowPlayers] = useState(true);

  return (
    <div className="mt-16 h-full w-full bg-slate-500 bg-opacity-10">
      <GamePlayers gameInfo={game.gameInfo} players={game.gamePlayers} showPlayers={showPlayers} setShowPlayers={setShowPlayers} />
      <div
        id="game-actions"
        className="flex h-auto w-full items-start justify-between"
        // style={{ marginTop: showPlayers ? playerSectionHeight : '' }}
      >
        <GameActions />
      </div>
    </div>
  );
};

export default GameWidget;
