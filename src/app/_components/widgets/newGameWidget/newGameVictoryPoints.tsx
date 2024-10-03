import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { Dispatch, SetStateAction } from 'react';

type NewGameVictoryPointsProps = {
  victoryPoints: number;
  setVictoryPoints: Dispatch<SetStateAction<number>>;
};

const NewGameVictoryPoints = ({ victoryPoints, setVictoryPoints }: NewGameVictoryPointsProps) => {
  return (
    <div className="flex w-full items-center justify-center gap-2">
      <span className="mr-6 text-lg font-bold">Victory Points</span>
      <button onClick={() => setVictoryPoints(victoryPoints - 1)}>
        <MinusCircleIcon className="size-8" />
      </button>

      <div className="h-[2rem] w-[6rem] rounded-md border-2 border-black bg-catan-red bg-opacity-45 p-1 text-center">{victoryPoints}</div>

      <button onClick={() => setVictoryPoints(victoryPoints + 1)}>
        <PlusCircleIcon className="size-8" />
      </button>
    </div>
  );
};

export default NewGameVictoryPoints;
