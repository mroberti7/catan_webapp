import Modal from '@/app/_components/modal/modal';
import { createGame, getPlayers } from '@/app/utils/api/api';
import { GamePlayerInfoDTO, PlayerDTO } from '@/lib/generated';
import { useState, useEffect } from 'react';
import Button from '@/app/_components/button/button';
import NewGameSelectPlayer from '@/app/_components/widgets/newGameWidget/newGameSelectPlayer';
import { createGameData, getSingleGameURL } from '@/app/utils/game';
import { useRouter } from 'next/navigation';
import { MAX_GAME_PLAYERS, MAX_GAME_VICTORY_POINTS, MIN_GAME_PLAYERS, MIN_GAME_VICTORY_POINTS } from '@/costants';
import NewGameVictoryPoints from '@/app/_components/widgets/newGameWidget/newGameVictoryPoints';
import { PlayerColor, Scenario } from '@/enum';
import NewGameSelectScenario from '@/app/_components/widgets/newGameWidget/newGameSelectScenario';

type NewGameModalProps = {
  isModalOpen: boolean;
  onClose: (e: Event) => void;
};

const NewGameModal = ({ isModalOpen, onClose }: NewGameModalProps) => {
  const router = useRouter();
  const [allPlayers, setAllPlayers] = useState<PlayerDTO[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<PlayerDTO[]>([]);
  const [playersColors, setPlayersColors] = useState<{ playerId: number; color: PlayerColor }[]>([]);
  const [victoryPoints, setVictoryPoints] = useState(10);
  const [scenario, setScenario] = useState<Scenario>(Scenario.Standard);
  const [error, setError] = useState<string | null>(null);

  const validateGame = () => {
    setError('');
    if (selectedPlayers.length < MIN_GAME_PLAYERS) {
      setError('I giocatori devono essere almeno 2');
      return false;
    }
    if (selectedPlayers.length > MAX_GAME_PLAYERS) {
      setError('I giocatori devono essere al massimo 6');
      return false;
    }
    if (victoryPoints < MIN_GAME_VICTORY_POINTS) {
      setError('Non fare lo scarso, almeno 8!');
      return false;
    }
    if (victoryPoints > MAX_GAME_VICTORY_POINTS) {
      setError('Non esagerare, massimo 16!');
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (error !== null) {
      validateGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlayers, victoryPoints]);

  const handleCreateGame = async () => {
    if (validateGame()) {
      const gameData = createGameData({
        players: selectedPlayers,
        victoryPoints,
        playersColors,
      });
      const gameId = await createGame(gameData);
      router.push(getSingleGameURL(gameId));
    }
  };

  const handleAddPlayer = (player: PlayerDTO, add: boolean) => {
    if (add) {
      setSelectedPlayers([...selectedPlayers, player]);
      setAllPlayers(allPlayers?.filter(p => p.id !== player.id));
    } else {
      setSelectedPlayers(selectedPlayers.filter(p => p.id !== player.id));
      setAllPlayers([...allPlayers, player]);
    }
  };

  useEffect(() => {
    const fetchPlayers = async () => {
      const playersData = await getPlayers();
      if (playersData?.length) {
        setAllPlayers(playersData);
      } else {
        console.error('Error fetching players');
      }
    };
    fetchPlayers();
  }, []);

  useEffect(() => {}, [selectedPlayers]);

  return (
    <Modal isModalOpen={isModalOpen} onClose={onClose}>
      <div className="max-w-dvw flex max-h-dvh min-h-[35rem] min-w-[35rem] flex-col items-center justify-start gap-5 rounded-2xl border-4 border-catan-red p-4">
        <h1 className="text-lg font-bold">New Game</h1>
        <NewGameSelectPlayer
          allPlayers={allPlayers}
          selectedPlayers={selectedPlayers}
          handleAddPlayer={handleAddPlayer}
          playersColors={playersColors}
          setPlayersColors={setPlayersColors}
        />
        <div className="my-3 flex w-full flex-col gap-3">
          <NewGameVictoryPoints victoryPoints={victoryPoints} setVictoryPoints={setVictoryPoints} />
          <NewGameSelectScenario scenario={scenario} setScenario={setScenario} />
        </div>
        <div className="mt-10">
          <Button onClick={handleCreateGame}>
            <span className="text-lg font-bold">Create Game</span>
          </Button>
        </div>
        <div className="mb-2 h-3">{error && <p className="font-semibold text-red-700">{error}</p>}</div>
      </div>
    </Modal>
  );
};

export default NewGameModal;
