import { useState } from 'react';
import Button from '@/app/_components/button/button';
import { saveTurn } from '@/app/utils/api/api';
import { TurnDTO } from '@/lib/generated';

type GameActionsProps = {
  gameId: number;
  playerId: number;
  passTurn: (turn: TurnDTO) => void;
};

type PlayerActions = {
  roadsBuilt: number;
  coloniesBuilt: number;
  citiesBuilt: number;
  developCardPlayed: number;
  longestRoad: boolean;
  largestArmy: boolean;
};

const GameActions = ({ gameId, playerId, passTurn }: GameActionsProps) => {
  const initialPlayerActions: PlayerActions = {
    roadsBuilt: 0,
    coloniesBuilt: 0,
    citiesBuilt: 0,
    developCardPlayed: 0,
    longestRoad: false,
    largestArmy: false,
  };

  const [playerActions, setPlayerActions] = useState<PlayerActions>(initialPlayerActions);

  const endTurn = () => {
    const turn: TurnDTO = {
      gameId,
      playerId,
      outcome: 12, // TODO: Adjust according to your logic
      roadsBuilt: playerActions.roadsBuilt,
      coloniesBuilt: playerActions.coloniesBuilt,
      citiesBuilt: playerActions.citiesBuilt,
      developCardDrawn: playerActions.developCardPlayed,
      knightCardPlayed: false,
      longestRoad: playerActions.longestRoad,
      largestArmy: playerActions.largestArmy,
    };
    passTurn(turn);
    // Reset player actions after saving the turn
    setPlayerActions(initialPlayerActions);
  };

  return (
    <div className="flex h-auto min-h-40 w-full flex-col items-center justify-center gap-5 p-8">
      <div className="grid grid-cols-3 place-items-end justify-items-center gap-8 md:grid-cols-6">
        <div className="flex flex-col items-center justify-center gap-3">
          <span> Costruite: {playerActions.roadsBuilt}</span>
          <Button onClick={() => setPlayerActions(prev => ({ ...prev, roadsBuilt: prev.roadsBuilt + 1 }))}>
            <span className="text-wrap text-sm md:text-lg">Costruisci Strada</span>
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center gap-3">
          <span> Costruite: {playerActions.coloniesBuilt}</span>
          <Button onClick={() => setPlayerActions(prev => ({ ...prev, coloniesBuilt: prev.coloniesBuilt + 1 }))}>
            <span className="text-wrap text-sm md:text-lg">Costruisci Colonia</span>
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center gap-3">
          <span> Costruite: {playerActions.citiesBuilt}</span>
          <Button onClick={() => setPlayerActions(prev => ({ ...prev, citiesBuilt: prev.citiesBuilt + 1 }))}>
            <span className="text-wrap text-sm md:text-lg">Costruisci Città</span>
          </Button>
        </div>

        <div>
          <Button onClick={() => setPlayerActions(prev => ({ ...prev, developCardPlayed: prev.developCardPlayed + 1 }))}>
            <span className="text-wrap text-sm md:text-lg">Gioca carta sviluppo</span>
          </Button>
        </div>
        <div>
          <Button onClick={() => setPlayerActions(prev => ({ ...prev, longestRoad: true }))}>
            <span className="text-wrap text-sm md:text-lg">Strada più lunga</span>
          </Button>
        </div>
        <div>
          <Button onClick={() => setPlayerActions(prev => ({ ...prev, largestArmy: true }))}>
            <span className="text-wrap text-sm md:text-lg">Esercito più grande</span>
          </Button>
        </div>
      </div>
      <div className="flex gap-5">
        <Button onClick={endTurn} className="rounded-xl bg-primary p-3 text-catan-red hover:bg-opacity-80 md:p-4">
          <span className="text-wrap text-sm md:text-lg">Fine turno</span>
        </Button>
        <Button onClick={() => {}} className="rounded-xl bg-primary p-3 text-catan-red hover:bg-opacity-80 md:p-4">
          <span className="text-wrap text-sm md:text-lg">Annulla turno</span>
        </Button>
        <Button onClick={() => {}} className="rounded-xl bg-primary p-3 text-catan-red hover:bg-opacity-80 md:p-4">
          <span className="text-wrap text-sm md:text-lg">Fine Partita</span>
        </Button>
      </div>
    </div>
  );
};

export default GameActions;
