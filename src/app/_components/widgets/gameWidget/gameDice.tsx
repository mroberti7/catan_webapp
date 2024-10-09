import Loader from '@/app/_components/loader/loader';
import { getGameDiceStats } from '@/app/utils/api';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type GameDiceProps = {
  gameId: number;
  diceNumber: number;
  setDiceNumber: Dispatch<SetStateAction<number>>;
};

const numbers = [2, 3, 4, 5, 6, 8, 9, 10, 11, 12];

const GameDice = ({ gameId, diceNumber, setDiceNumber }: GameDiceProps) => {
  const [diceStats, setDiceStats] = useState<{ [key: string]: { [key: string]: number } } | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  const distribution = diceStats?.[0];

  useEffect(() => {
    const fetchDiceStats = async () => {
      setIsLoadingStats(true);
      const stats = await getGameDiceStats(gameId);
      setDiceStats(stats);
      setIsLoadingStats(false);
    };
    fetchDiceStats();
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-3 px-10">
        <div className="flex min-h-52 w-full flex-wrap items-center justify-center text-wrap bg-slate-400 bg-opacity-50 p-4">
          {isLoadingStats && <Loader />}
          {!isLoadingStats && <div>{JSON.stringify(diceStats, null, 2)}</div>}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-5">
          {numbers.map(number => (
            <button
              key={number}
              onClick={() => setDiceNumber(number)}
              className={`flex size-8 items-center justify-center rounded-full border-2 md:size-14 ${diceNumber === number ? 'border-catan-red bg-primary text-catan-red' : 'border-primary bg-catan-red text-primary'} text-md p-2 font-bold md:text-lg`}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameDice;
