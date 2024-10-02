'use client';

import { PlayerScoreDTO } from '@/lib/generated';
import GameDiceStats from '@/app/_components/widgets/gameWidget/gameDiceStats';
import PlayersTurn from '@/app/_components/widgets/gameWidget/playersTurn';

type GameWidgetProps = {
  game: PlayerScoreDTO[]; //TODO: change
};

const data = [
  { name: '2', value: 3 },
  { name: '3', value: 4 },
  { name: '4', value: 5 },
  { name: '5', value: 6 },
  { name: '6', value: 8 },
  { name: '7', value: 10 },
  { name: '8', value: 9 },
  { name: '9', value: 9 },
  { name: '10', value: 8 },
  { name: '11', value: 6 },
  { name: '12', value: 2 },
];

const GameWidget = ({ game }: GameWidgetProps) => {
  console.log('game', game);
  return (
    <div className="h-full w-full bg-slate-400 bg-opacity-45 py-4">
      <div id="game-info" className="flex w-full flex-col items-center justify-center bg-pink-300">
        <h1>Game title</h1>
        <span> Start: </span>
        <span> End: SOLO se esistente</span>
      </div>
      <div id="game-players-actions" className="grid min-h-52 grid-cols-12 gap-4">
        <div className="col-span-3 bg-red-500">
          <PlayersTurn players={[]} />
        </div>
        <div className="col-span-9 bg-red-500">Actions</div>
      </div>
      <div id="game-dice-stats">
        <div className="flex h-full w-full items-center justify-center px-24 py-6">
          <div className="flex h-full w-full items-center justify-center border-4 border-secondary bg-slate-400 bg-opacity-95">
            <GameDiceStats width={630} height={270} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameWidget;
