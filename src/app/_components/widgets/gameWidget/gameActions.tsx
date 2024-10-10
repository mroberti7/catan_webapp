import { useState } from 'react';
import Button from '@/app/_components/button/button';
import { TurnDTO } from '@/lib/generated';
import Image from 'next/image';
import { deleteLastTurn } from '@/app/utils/api';

type GameActionsProps = {
  gameId: number;
  playerId: number;
  endTurn: (turn: TurnDTO) => void;
  deletePreviousTurn: (gameId: number) => void;
  clearCurrentTurnData: () => void;
  endGame: (gameId: number) => void;
  diceNumber: null | number;
};

type PlayerActions = {
  roadsBuilt: number;
  coloniesBuilt: number;
  citiesBuilt: number;
  developCardDrawn: number;
  knightCardPlayed: boolean;
  longestRoad: boolean;
  largestArmy: boolean;
};

const GameActions = ({ gameId, playerId, endTurn, deletePreviousTurn, endGame, clearCurrentTurnData, diceNumber }: GameActionsProps) => {
  const initialPlayerActions: PlayerActions = {
    roadsBuilt: 0,
    coloniesBuilt: 0,
    citiesBuilt: 0,
    developCardDrawn: 0,
    knightCardPlayed: false,
    longestRoad: false,
    largestArmy: false,
  };

  const [playerActions, setPlayerActions] = useState<PlayerActions>(initialPlayerActions);

  const endTurnFromActions = () => {
    if (!diceNumber) {
      alert('Devi selezionare il dado');
      return;
    }
    const turn: TurnDTO = {
      gameId,
      playerId,
      roadsBuilt: playerActions.roadsBuilt,
      coloniesBuilt: playerActions.coloniesBuilt,
      citiesBuilt: playerActions.citiesBuilt,
      developCardDrawn: playerActions.developCardDrawn,
      knightCardPlayed: playerActions.knightCardPlayed,
      longestRoad: playerActions.longestRoad,
      largestArmy: playerActions.largestArmy,
    };
    endTurn(turn);
    clearCurrentTurnDataFromActions();
  };

  const deletePreviousTurnFromActions = () => {
    deletePreviousTurn(gameId);
    clearCurrentTurnDataFromActions();
  };

  const endGameFromActions = () => {
    endGame(gameId);
    clearCurrentTurnDataFromActions();
  };
  const clearCurrentTurnDataFromActions = () => {
    setPlayerActions(initialPlayerActions);
    clearCurrentTurnData();
  };

  return (
    <div className="flex h-auto min-h-40 w-full flex-col items-center justify-center gap-5 p-8">
      <div className="grid grid-cols-3 place-items-center justify-items-center gap-2 md:grid-cols-7 md:gap-8">
        <Button
          className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-primary bg-catan-red p-1 pt-2 text-primary hover:bg-opacity-90"
          onClick={() => setPlayerActions(prev => ({ ...prev, roadsBuilt: prev.roadsBuilt + 1 }))}
        >
          <div className="flex size-8 items-center justify-center rounded-full border-2 border-primary p-4">{playerActions.roadsBuilt}</div>
          <div className="relative flex size-20 items-center justify-center">
            <Image src={'/assets/icons/road.png'} alt="road" fill />
          </div>
        </Button>
        <Button
          className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-primary bg-catan-red p-1 pt-2 text-primary hover:bg-opacity-90"
          onClick={() => setPlayerActions(prev => ({ ...prev, coloniesBuilt: prev.coloniesBuilt + 1 }))}
        >
          <div className="flex size-8 items-center justify-center rounded-full border-2 border-primary p-4">
            {playerActions.coloniesBuilt}
          </div>
          <div className="relative flex size-20 items-center justify-center">
            <Image src={'/assets/icons/colony.png'} alt="road" fill />
          </div>
        </Button>
        <Button
          className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-primary bg-catan-red p-1 pt-2 text-primary hover:bg-opacity-90"
          onClick={() => setPlayerActions(prev => ({ ...prev, citiesBuilt: prev.citiesBuilt + 1 }))}
        >
          <div className="flex size-8 items-center justify-center rounded-full border-2 border-primary p-4">
            {playerActions.citiesBuilt}
          </div>
          <div className="relative flex size-20 items-center justify-center">
            <Image src={'/assets/icons/city.png'} alt="road" fill />
          </div>
        </Button>
        <Button
          className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-primary bg-catan-red p-1 pt-2 text-primary hover:bg-opacity-90"
          onClick={() => setPlayerActions(prev => ({ ...prev, developCardDrawn: prev.developCardDrawn + 1 }))}
        >
          <div className="flex size-8 items-center justify-center rounded-full border-2 border-primary p-4">
            {playerActions.developCardDrawn}
          </div>
          <div className="relative flex size-20 items-center justify-center">
            <Image src={'/assets/icons/card.png'} alt="road" fill />
          </div>
        </Button>
        <Button
          className={`flex flex-col items-center justify-center gap-2 rounded-xl ${playerActions.knightCardPlayed ? 'border-catan-red bg-primary text-catan-red' : 'border-primary bg-catan-red text-primary'} border-2 p-1 pt-2 hover:bg-opacity-90`}
          onClick={() => setPlayerActions(prev => ({ ...prev, knightCardPlayed: !playerActions.knightCardPlayed }))}
        >
          <div className="largestArmy flex size-8 items-center justify-center"></div>
          <div className="relative flex size-20 items-center justify-center">
            <Image src={'/assets/icons/knight.png'} alt="road" fill />
          </div>
        </Button>

        <Button
          className={`flex flex-col items-center justify-center gap-2 rounded-xl ${playerActions.longestRoad ? 'border-catan-red bg-primary text-catan-red' : 'border-primary bg-catan-red text-primary'} border-2 p-1 pt-2 hover:bg-opacity-90`}
          onClick={() => setPlayerActions(prev => ({ ...prev, longestRoad: !playerActions.longestRoad }))}
        >
          <div className="flex size-8 items-center justify-center"></div>
          <div className="relative flex size-20 items-center justify-center">
            <Image src={'/assets/icons/longest_road.png'} alt="road" fill className="rounded-md" />
          </div>
        </Button>
        <Button
          className={`flex flex-col items-center justify-center gap-2 rounded-xl ${playerActions.largestArmy ? 'border-catan-red bg-primary text-catan-red' : 'border-primary bg-catan-red text-primary'} border-2 p-1 pt-2 hover:bg-opacity-90`}
          onClick={() => setPlayerActions(prev => ({ ...prev, largestArmy: !playerActions.largestArmy }))}
        >
          <div className="flex size-8 items-center justify-center"></div>
          <div className="relative flex size-20 items-center justify-center">
            <Image src={'/assets/icons/largest_army.png'} alt="road" fill className="rounded-md" />
          </div>
        </Button>
      </div>
      <div className="flex gap-5">
        <Button onClick={endTurnFromActions} className="rounded-xl bg-primary p-3 text-catan-red hover:bg-opacity-80 md:p-4">
          <span className="text-wrap text-sm md:text-lg">Fine turno</span>
        </Button>
        <Button onClick={clearCurrentTurnDataFromActions} className="rounded-xl bg-primary p-3 text-catan-red hover:bg-opacity-80 md:p-4">
          <span className="text-wrap text-sm md:text-lg">Annulla turno corrente</span>
        </Button>
        <Button onClick={deletePreviousTurnFromActions} className="rounded-xl bg-primary p-3 text-catan-red hover:bg-opacity-80 md:p-4">
          <span className="text-wrap text-sm md:text-lg">Elimina turno precedente</span>
        </Button>
        <Button onClick={endGameFromActions} className="rounded-xl bg-primary p-3 text-catan-red hover:bg-opacity-80 md:p-4">
          <span className="text-wrap text-sm md:text-lg">Fine Partita</span>
        </Button>
      </div>
    </div>
  );
};

export default GameActions;
