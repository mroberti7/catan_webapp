'use client';

import { PlayerScoreDTO } from '@/lib/generated';
import PlayersTurn from '@/app/_components/widgets/gameWidget/playersTurn';
import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

type GameWidgetProps = {
  game: PlayerScoreDTO[]; //TODO: change
};

const GameWidget = ({ game }: GameWidgetProps) => {
  console.log(game);
  const [showPlayers, setShowPlayers] = useState(true);

  const playerSectionHeight = '13rem';

  return (
    <div className="h-full w-full bg-slate-500 bg-opacity-10">
      {showPlayers ? (
        <div id="players" className="fixed mb-2 flex w-full flex-col overflow-hidden bg-slate-600 bg-opacity-70 px-2">
          <div id="game-info" className="flex w-full items-center justify-between px-3">
            <span> Start: </span>
            <h1>Game title</h1>
            <span> End: SOLO se esistente</span>
          </div>
          <PlayersTurn players={[]} />
          <button className="flex w-full items-start justify-center" onClick={() => setShowPlayers(false)}>
            <div className="flex h-7 w-14 items-start justify-center rounded-t-md bg-red-800">
              <ChevronUpIcon className="size-8" />
            </div>
          </button>
        </div>
      ) : (
        <div className="flex w-full">
          <button className="flex w-full items-start justify-center" onClick={() => setShowPlayers(true)}>
            <div className="flex h-7 w-14 items-start justify-center rounded-b-md bg-red-800">
              <ChevronDownIcon className="size-8" />
            </div>
          </button>
        </div>
      )}

      <div
        id="game-actions"
        className="flex h-full w-full items-start justify-between bg-red-500 bg-opacity-50"
        style={{ marginTop: showPlayers ? playerSectionHeight : '' }}
      >
        HELLO
      </div>
    </div>
  );
};

export default GameWidget;
