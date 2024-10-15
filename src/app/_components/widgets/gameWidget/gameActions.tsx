import { useState } from 'react';
import Button from '@/app/_components/button/button';
import { GamePlayerDTO, TurnDTO } from '@/lib/generated';
import Image from 'next/image';
import { deleteLastTurn } from '@/app/utils/api';
import NumberIcon from '@/app/_components/numberIcon/numberIcon';
import Modal from '@/app/_components/modal/modal';
import { MinusCircleIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

type GameActionsProps = {
  gameId: number;
  player: GamePlayerDTO;
  endTurn: (turn: TurnDTO) => void;
  deletePreviousTurn: (gameId: number) => void;
  clearCurrentTurnData: () => void;
  endGame: (winnerPlayerId: number, victoryPointsDrawn: number) => Promise<void>;
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

const GameActions = ({ gameId, player, endTurn, deletePreviousTurn, endGame, clearCurrentTurnData, diceNumber }: GameActionsProps) => {
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
  const [showDeletePreviousTurnModal, setShowDeletePreviousTurnModal] = useState(false);
  const [showEndGameModal, setShowEndGameModal] = useState(false);
  const [winnerVictoryPointsDrawn, setWinnerVictoryPointsDrawn] = useState(0);

  const endTurnFromActions = () => {
    if (!diceNumber) {
      alert('Devi selezionare il dado');
      return;
    }
    const turn: TurnDTO = {
      gameId,
      playerId: player.playerId,
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
    endGame(player?.playerId ?? 0, winnerVictoryPointsDrawn);
    clearCurrentTurnDataFromActions();
  };
  const clearCurrentTurnDataFromActions = () => {
    setPlayerActions(initialPlayerActions);
    clearCurrentTurnData();
  };

  //TODO: move modals to a separated components

  return (
    <div className="flex h-auto min-h-40 w-full flex-col items-center justify-center gap-5 p-8">
      <Modal
        id="delete-previous-turn-modal"
        isModalOpen={showDeletePreviousTurnModal}
        onClose={() => setShowDeletePreviousTurnModal(false)}
      >
        <div className="flex flex-col items-center justify-center gap-5 p-10">
          <p className="text-lg font-bold">Sei sicuro di voler eliminare il turno precedente?</p>
          <div className="flex gap-5">
            <Button
              onClick={() => {
                deletePreviousTurnFromActions();
                setShowDeletePreviousTurnModal(false);
              }}
            >
              Si
            </Button>
            <Button onClick={() => setShowDeletePreviousTurnModal(false)}>No</Button>
          </div>
        </div>
      </Modal>
      <Modal id="end-game-modal" isModalOpen={showEndGameModal} onClose={() => setShowEndGameModal(false)}>
        <div className="flex flex-col items-center justify-center gap-5 p-10">
          <p className="text-xl font-bold">Concludi partita</p>
          <div className="flex w-full flex-col items-center justify-center gap-6">
            <div className="flex items-center justify-center gap-2 text-xl font-bold text-catan-red">
              Winner: {player.username}
              <TrophyIcon className="size-6" />
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="mr-6">Victory Points Drawn</span>
              <button onClick={() => setWinnerVictoryPointsDrawn(winnerVictoryPointsDrawn - 1)}>
                <MinusCircleIcon className="size-8" />
              </button>
              <div className="h-[2rem] w-[6rem] rounded-md border-2 border-black bg-catan-red bg-opacity-45 p-1 text-center">
                {winnerVictoryPointsDrawn}
              </div>
              <button onClick={() => setWinnerVictoryPointsDrawn(winnerVictoryPointsDrawn + 1)}>
                <PlusCircleIcon className="size-8" />
              </button>
            </div>
          </div>

          <div className="flex gap-5">
            <Button
              onClick={() => {
                endGameFromActions();
                setShowDeletePreviousTurnModal(false);
              }}
            >
              Concludi
            </Button>
            <Button onClick={() => setShowEndGameModal(false)}>Annulla</Button>
          </div>
        </div>
      </Modal>
      <div className="grid grid-cols-3 place-items-center justify-items-center gap-2 md:grid-cols-7 md:gap-8">
        <Button
          className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-primary bg-catan-red p-1 pt-2 text-primary hover:bg-opacity-90"
          onClick={() => setPlayerActions(prev => ({ ...prev, roadsBuilt: prev.roadsBuilt + 1 }))}
        >
          <NumberIcon number={playerActions.roadsBuilt} size="size-12 md:size-12" />
          <div className="relative flex size-20 items-center justify-center">
            <Image src={'/assets/icons/road.png'} alt="road" fill />
          </div>
        </Button>
        <Button
          className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-primary bg-catan-red p-1 pt-2 text-primary hover:bg-opacity-90"
          onClick={() => setPlayerActions(prev => ({ ...prev, coloniesBuilt: prev.coloniesBuilt + 1 }))}
        >
          <NumberIcon number={playerActions.coloniesBuilt} size="size-12 md:size-12" />
          <div className="relative flex size-20 items-center justify-center">
            <Image src={'/assets/icons/colony.png'} alt="road" fill />
          </div>
        </Button>
        <Button
          className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-primary bg-catan-red p-1 pt-2 text-primary hover:bg-opacity-90"
          onClick={() => setPlayerActions(prev => ({ ...prev, citiesBuilt: prev.citiesBuilt + 1 }))}
        >
          <NumberIcon number={playerActions.citiesBuilt} size="size-12 md:size-12" />
          <div className="relative flex size-20 items-center justify-center">
            <Image src={'/assets/icons/city.png'} alt="road" fill />
          </div>
        </Button>
        <Button
          className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-primary bg-catan-red p-1 pt-2 text-primary hover:bg-opacity-90"
          onClick={() => setPlayerActions(prev => ({ ...prev, developCardDrawn: prev.developCardDrawn + 1 }))}
        >
          <NumberIcon number={playerActions.developCardDrawn} size="size-12 md:size-12" />
          <div className="relative flex size-20 items-center justify-center">
            <Image src={'/assets/icons/card.png'} alt="road" fill />
          </div>
        </Button>
        <Button
          className={`flex flex-col items-center justify-center gap-2 rounded-xl ${playerActions.knightCardPlayed ? 'border-catan-red bg-primary text-catan-red' : 'border-primary bg-catan-red text-primary'} border-2 p-1 pt-2 hover:bg-opacity-90`}
          onClick={() => setPlayerActions(prev => ({ ...prev, knightCardPlayed: !playerActions.knightCardPlayed }))}
        >
          <div className="largestArmy flex size-12 items-center justify-center"></div>
          <div className="relative flex size-20 items-center justify-center">
            <Image src={'/assets/icons/knight.png'} alt="road" fill />
          </div>
        </Button>

        <Button
          className={`flex flex-col items-center justify-center gap-2 rounded-xl ${playerActions.longestRoad ? 'border-catan-red bg-primary text-catan-red' : 'border-primary bg-catan-red text-primary'} border-2 p-1 pt-2 hover:bg-opacity-90`}
          onClick={() => setPlayerActions(prev => ({ ...prev, longestRoad: !playerActions.longestRoad }))}
        >
          <div className="flex size-12 items-center justify-center"></div>
          <div className="relative flex size-20 items-center justify-center">
            <Image src={'/assets/icons/longest_road.png'} alt="road" fill className="rounded-md" />
          </div>
        </Button>
        <Button
          className={`flex flex-col items-center justify-center gap-2 rounded-xl ${playerActions.largestArmy ? 'border-catan-red bg-primary text-catan-red' : 'border-primary bg-catan-red text-primary'} border-2 p-1 pt-2 hover:bg-opacity-90`}
          onClick={() => setPlayerActions(prev => ({ ...prev, largestArmy: !playerActions.largestArmy }))}
        >
          <div className="flex size-12 items-center justify-center"></div>
          <div className="relative flex size-20 items-center justify-center">
            <Image src={'/assets/icons/largest_army.png'} alt="road" fill className="rounded-md" />
          </div>
        </Button>
      </div>
      <div className="flex gap-5">
        <button onClick={endTurnFromActions} className="relative flex size-32 items-center justify-center">
          <Image src={'/assets/icons/action-end-turn.png'} alt="road" fill className="rounded-md" />
        </button>
        <button onClick={clearCurrentTurnDataFromActions} className="relative flex size-32 items-center justify-center">
          <Image src={'/assets/icons/action-reset-selection.png'} alt="road" fill className="rounded-md" />
        </button>
        {/* <Button onClick={clearCurrentTurnDataFromActions} className="rounded-xl bg-primary p-3 text-catan-red hover:bg-opacity-80 md:p-4">
          <span className="text-wrap text-sm md:text-lg">Annulla turno corrente</span>
        </Button> */}
        <button
          onClick={() => setShowDeletePreviousTurnModal(!showDeletePreviousTurnModal)}
          className="relative flex size-32 items-center justify-center"
        >
          <Image src={'/assets/icons/action-delete-previous-turn.png'} alt="road" fill className="rounded-md" />
        </button>
        <button onClick={() => setShowEndGameModal(!showEndGameModal)} className="relative flex size-32 items-center justify-center">
          <Image src={'/assets/icons/action-end-game.png'} alt="road" fill className="rounded-md" />
        </button>
      </div>
    </div>
  );
};

export default GameActions;
