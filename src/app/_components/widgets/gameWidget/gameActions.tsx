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
  allPlayers: GamePlayerDTO[];
  endTurn: (turn: TurnDTO) => void;
  deletePreviousTurn: (gameId: number) => void;
  clearCurrentTurnData: () => void;
  endGame: (winnerPlayerId: number, allPlayers: GamePlayerDTO[]) => Promise<void>;
  diceNumber: null | number;
  minimalLayout: boolean;
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

const GameActions = ({
  gameId,
  player,
  allPlayers,
  endTurn,
  deletePreviousTurn,
  endGame,
  clearCurrentTurnData,
  diceNumber,
  minimalLayout,
}: GameActionsProps) => {
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
  const [showModalDiceNotSelected, setShowModalDiceNotSelected] = useState(false);
  const [playersVictoryPointsDrawn, setPlayersVictoryPointsDrawn] = useState<GamePlayerDTO[]>(allPlayers);

  const endTurnFromActions = () => {
    if (!diceNumber) {
      setShowModalDiceNotSelected(true);
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
    endGame(player?.playerId ?? 0, playersVictoryPointsDrawn);
    clearCurrentTurnDataFromActions();
  };
  const clearCurrentTurnDataFromActions = () => {
    setPlayerActions(initialPlayerActions);
    clearCurrentTurnData();
  };

  const closeEndGameModal = () => {
    setShowEndGameModal(false);
    setPlayersVictoryPointsDrawn(allPlayers);
    clearCurrentTurnDataFromActions();
  };

  const updatePlayerVictoryPointsDrawn = (playerId?: number, victoryPointsDrawn?: number) => {
    setPlayersVictoryPointsDrawn(
      playersVictoryPointsDrawn.map(player => (player.playerId === playerId ? { ...player, victoryPointsDrawn } : player)),
    );
  };

  const updatePlayerWinner = (playerId?: number) => {
    setPlayersVictoryPointsDrawn(
      playersVictoryPointsDrawn.map(player =>
        player.playerId === playerId ? { ...player, winner: !player.winner } : { ...player, winner: false },
      ),
    );
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
          <p className="text-lg font-bold">Are you sure to delete the previous turn?</p>
          <div className="flex gap-5">
            <Button
              onClick={() => {
                deletePreviousTurnFromActions();
                setShowDeletePreviousTurnModal(false);
              }}
            >
              Yes
            </Button>
            <Button onClick={() => setShowDeletePreviousTurnModal(false)}>No</Button>
          </div>
        </div>
      </Modal>
      <Modal id="end-game-modal" isModalOpen={showEndGameModal} onClose={closeEndGameModal}>
        <div className="flex flex-col items-center justify-center gap-5 p-10">
          <p className="text-xl font-bold">End Game</p>
          <div className="flex w-full flex-col items-center justify-center gap-6">
            <div className="flex items-end justify-center gap-2 text-xl font-bold text-catan-red">Victory Points Drawn</div>

            <div className="flex flex-col items-center justify-between gap-2">
              {playersVictoryPointsDrawn.map(playerVictoryPointsDrawn => (
                <div key={playerVictoryPointsDrawn.playerId} className="flex min-w-32 items-center justify-center gap-2">
                  <button
                    onClick={() => updatePlayerWinner(playerVictoryPointsDrawn.playerId)}
                    className="h-[3rem] w-[5rem] rounded-md border-2 border-black bg-opacity-45 p-1 text-center"
                    style={{ backgroundColor: playerVictoryPointsDrawn.playerColor }}
                  >
                    {playerVictoryPointsDrawn.username}
                  </button>
                  <button
                    onClick={() =>
                      updatePlayerVictoryPointsDrawn(
                        playerVictoryPointsDrawn.playerId,
                        (playerVictoryPointsDrawn.victoryPointsDrawn ?? 0) - 1,
                      )
                    }
                  >
                    <MinusCircleIcon className="size-8" />
                  </button>
                  <div
                    className={`h-[2rem] w-[6rem] rounded-md border-2 border-black bg-opacity-45 p-1 text-center`}
                    style={{ backgroundColor: playerVictoryPointsDrawn.playerColor }}
                  >
                    {playerVictoryPointsDrawn.victoryPointsDrawn}
                  </div>
                  <button
                    onClick={() =>
                      updatePlayerVictoryPointsDrawn(
                        playerVictoryPointsDrawn.playerId,
                        (playerVictoryPointsDrawn.victoryPointsDrawn ?? 0) + 1,
                      )
                    }
                  >
                    <PlusCircleIcon className="size-8" />
                  </button>
                  <div className="min-w-16">
                    {playerVictoryPointsDrawn.winner ? (
                      <span className="ml-4 text-4xl">👑</span>
                    ) : (
                      <button
                        onClick={() => updatePlayerWinner(playerVictoryPointsDrawn.playerId)}
                        className="min-w-16 rounded-lg border-2 border-gray-400 p-1 text-gray-400"
                      >
                        Set
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-5">
            <Button
              onClick={() => {
                endGameFromActions();
                setShowDeletePreviousTurnModal(false);
              }}
            >
              End Game
            </Button>
            <Button onClick={closeEndGameModal}>Cancel</Button>
          </div>
        </div>
      </Modal>
      <Modal id="dice-not-selected-modal" isModalOpen={showModalDiceNotSelected} onClose={() => setShowModalDiceNotSelected(false)}>
        <div className="flex flex-col items-center justify-center gap-5 p-10">
          <div className="text-2xl font-bold">🐔 The DICE!!!!!!! 🐔 </div>
          <div className="text-4xl font-bold">😩 😔 😵‍💫 😰 🥵 🤯</div>
        </div>
      </Modal>
      <div className="grid grid-cols-3 place-items-center justify-items-center gap-2 md:grid-cols-7 md:gap-8">
        <Button
          className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-primary bg-catan-red p-1 pt-2 text-primary hover:bg-opacity-90"
          onClick={() => setPlayerActions(prev => ({ ...prev, roadsBuilt: prev.roadsBuilt + 1 }))}
        >
          <NumberIcon number={playerActions.roadsBuilt} size="size-12" minimalLayout={minimalLayout} />
          <div className="relative flex size-20 items-center justify-center">
            <Image src={'/assets/icons/road.png'} alt="road" fill />
          </div>
        </Button>
        <Button
          className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-primary bg-catan-red p-1 pt-2 text-primary hover:bg-opacity-90"
          onClick={() => setPlayerActions(prev => ({ ...prev, coloniesBuilt: prev.coloniesBuilt + 1 }))}
        >
          <NumberIcon number={playerActions.coloniesBuilt} size="size-12" minimalLayout={minimalLayout} />
          <div className="relative flex size-20 items-center justify-center">
            <Image src={'/assets/icons/colony.png'} alt="road" fill />
          </div>
        </Button>
        <Button
          className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-primary bg-catan-red p-1 pt-2 text-primary hover:bg-opacity-90"
          onClick={() => setPlayerActions(prev => ({ ...prev, citiesBuilt: prev.citiesBuilt + 1 }))}
        >
          <NumberIcon number={playerActions.citiesBuilt} size="size-12" minimalLayout={minimalLayout} />
          <div className="relative flex size-20 items-center justify-center">
            <Image src={'/assets/icons/city.png'} alt="road" fill />
          </div>
        </Button>
        <Button
          className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-primary bg-catan-red p-1 pt-2 text-primary hover:bg-opacity-90"
          onClick={() => setPlayerActions(prev => ({ ...prev, developCardDrawn: prev.developCardDrawn + 1 }))}
        >
          <NumberIcon number={playerActions.developCardDrawn} size="size-12" minimalLayout={minimalLayout} />
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
          {minimalLayout ? (
            <span className="flex size-[6rem] items-center justify-center rounded-full border-2 border-catan-red bg-primary text-5xl">
              ⏩️
            </span>
          ) : (
            <Image src={'/assets/icons/action-end-turn.png'} alt="road" fill className="rounded-md" />
          )}
        </button>
        <button onClick={clearCurrentTurnDataFromActions} className="relative flex size-32 items-center justify-center">
          {minimalLayout ? (
            <span className="flex size-[6rem] items-center justify-center rounded-full border-2 border-catan-red bg-primary text-5xl">
              🔁
            </span>
          ) : (
            <Image src={'/assets/icons/action-reset-selection.png'} alt="road" fill className="rounded-md" />
          )}
        </button>
        <button
          onClick={() => setShowDeletePreviousTurnModal(!showDeletePreviousTurnModal)}
          className="relative flex size-32 items-center justify-center"
        >
          {minimalLayout ? (
            <span className="flex size-[6rem] items-center justify-center rounded-full border-2 border-catan-red bg-primary text-5xl">
              ⏪️
            </span>
          ) : (
            <Image src={'/assets/icons/action-delete-previous-turn.png'} alt="road" fill className="rounded-md" />
          )}
        </button>
        <button onClick={() => setShowEndGameModal(!showEndGameModal)} className="relative flex size-32 items-center justify-center">
          {minimalLayout ? (
            <span className="flex size-[6rem] items-center justify-center rounded-full border-2 border-catan-red bg-primary text-5xl">
              🏁
            </span>
          ) : (
            <Image src={'/assets/icons/action-end-game.png'} alt="road" fill className="rounded-md" />
          )}
        </button>
      </div>
    </div>
  );
};

export default GameActions;
